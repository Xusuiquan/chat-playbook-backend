import {
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Collection, Document, ObjectId } from 'mongodb';
import type { CreateCategoryDto, UpdateCategoryDto } from './dto';

type CategoryDoc = Document & {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
};

type CategoryView = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
};

@Injectable()
export class CategoriesService {
  constructor(private readonly db: DatabaseService) {}
  private async coll(): Promise<Collection<CategoryDoc>> {
    return this.db.getCollection<CategoryDoc>('categories');
  }
  private toView(doc: CategoryDoc): CategoryView {
    return {
      id: String(doc._id),
      name: doc.name,
      slug: doc.slug,
      description: doc.description,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
  async create(dto: CreateCategoryDto): Promise<CategoryView> {
    const now = new Date();
    const doc: CategoryDoc = {
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      createdAt: now,
      updatedAt: now,
    };
    const coll = await this.coll();
    try {
      const res = await coll.insertOne(doc);
      const created = await coll.findOne({ _id: res.insertedId });
      if (!created) throw new Error('create failed');
      return this.toView(created as CategoryDoc);
    } catch (e) {
      const code = (e as { code?: number }).code;
      if (code === 11000) {
        throw new ConflictException({
          message: 'slug already exists',
          error: 'Conflict',
        });
      }
      throw e;
    }
  }
  async findAll(): Promise<CategoryView[]> {
    const coll = await this.coll();
    const docs = await coll.find({}).sort({ createdAt: -1 }).toArray();
    return docs.map((d) => this.toView(d as CategoryDoc));
  }
  async findOne(id: string): Promise<CategoryView | null> {
    const coll = await this.coll();
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc ? this.toView(doc as CategoryDoc) : null;
  }
  async update(
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryView | null> {
    const coll = await this.coll();
    const patch = { ...dto, updatedAt: new Date() };
    try {
      await coll.updateOne({ _id: new ObjectId(id) }, { $set: patch });
    } catch (e) {
      const code = (e as { code?: number }).code;
      if (code === 11000) {
        throw new ConflictException({
          message: 'slug already exists',
          error: 'Conflict',
        });
      }
      throw e;
    }
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc ? this.toView(doc as CategoryDoc) : null;
  }
  async remove(id: string): Promise<{ deleted: boolean }> {
    const coll = await this.coll();
    const res = await coll.deleteOne({ _id: new ObjectId(id) });
    return { deleted: res.deletedCount === 1 };
  }
}
