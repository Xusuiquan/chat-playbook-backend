import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Collection, Document, ObjectId } from 'mongodb';
import type { CreateTopicDto, UpdateTopicDto } from './dto';

type TopicDoc = Document & {
  _id?: ObjectId;
  categoryId: ObjectId;
  title: string;
  tags?: string[];
  description?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

type TopicView = {
  id: string;
  categoryId: string;
  title: string;
  tags?: string[];
  description?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

@Injectable()
export class TopicsService {
  constructor(private readonly db: DatabaseService) {}
  private async coll(): Promise<Collection<TopicDoc>> {
    return this.db.getCollection<TopicDoc>('topics');
  }
  private toView(doc: TopicDoc): TopicView {
    return {
      id: String(doc._id),
      categoryId: String(doc.categoryId),
      title: doc.title,
      tags: doc.tags,
      description: doc.description,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
  async create(dto: CreateTopicDto): Promise<TopicView> {
    const now = new Date();
    const doc: TopicDoc = {
      categoryId: new ObjectId(dto.categoryId),
      title: dto.title,
      tags: dto.tags,
      description: dto.description,
      isActive: dto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    const coll = await this.coll();
    const res = await coll.insertOne(doc);
    const created = await coll.findOne({ _id: res.insertedId });
    if (!created) throw new Error('create failed');
    return this.toView(created as TopicDoc);
  }
  async findAll(): Promise<TopicView[]> {
    const coll = await this.coll();
    const docs = await coll.find({}).sort({ createdAt: -1 }).toArray();
    return docs.map((d) => this.toView(d as TopicDoc));
  }
  async findOne(id: string): Promise<TopicView | null> {
    const coll = await this.coll();
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc ? this.toView(doc as TopicDoc) : null;
  }
  async update(id: string, dto: UpdateTopicDto): Promise<TopicView | null> {
    const coll = await this.coll();
    const patch: Partial<TopicDoc> = { updatedAt: new Date() };
    if (dto.categoryId) patch.categoryId = new ObjectId(dto.categoryId);
    if (dto.title !== undefined) patch.title = dto.title;
    if (dto.tags !== undefined) patch.tags = dto.tags;
    if (dto.description !== undefined) patch.description = dto.description;
    if (dto.isActive !== undefined) patch.isActive = dto.isActive;
    await coll.updateOne({ _id: new ObjectId(id) }, { $set: patch });
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc ? this.toView(doc as TopicDoc) : null;
  }
  async remove(id: string): Promise<{ deleted: boolean }> {
    const coll = await this.coll();
    const res = await coll.deleteOne({ _id: new ObjectId(id) });
    return { deleted: res.deletedCount === 1 };
  }
}
