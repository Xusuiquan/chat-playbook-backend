import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Collection, Document, ObjectId } from 'mongodb';
import type { CreateSentenceDto, UpdateSentenceDto } from './dto';

type SentenceDoc = Document & {
  _id?: ObjectId;
  topicId: ObjectId;
  sentence: string;
  description?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

type SentenceView = {
  id: string;
  topicId: string;
  sentence: string;
  description?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

@Injectable()
export class SentencesService {
  constructor(private readonly db: DatabaseService) {}
  private async coll(): Promise<Collection<SentenceDoc>> {
    return this.db.getCollection<SentenceDoc>('sentences');
  }
  private toView(doc: SentenceDoc): SentenceView {
    return {
      id: String(doc._id),
      topicId: String(doc.topicId),
      sentence: doc.sentence,
      description: doc.description,
      isActive: doc.isActive,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
  async create(dto: CreateSentenceDto): Promise<SentenceView> {
    const now = new Date();
    const doc: SentenceDoc = {
      topicId: new ObjectId(dto.topicId),
      sentence: dto.sentence,
      description: dto.description,
      isActive: dto.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    const coll = await this.coll();
    const res = await coll.insertOne(doc);
    const created = await coll.findOne({ _id: res.insertedId });
    if (!created) throw new Error('create failed');
    return this.toView(created as SentenceDoc);
  }
  async findAll(): Promise<SentenceView[]> {
    const coll = await this.coll();
    const docs = await coll.find({}).sort({ createdAt: -1 }).toArray();
    return docs.map((d) => this.toView(d as SentenceDoc));
  }
  async findOne(id: string): Promise<SentenceView | null> {
    const coll = await this.coll();
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc ? this.toView(doc as SentenceDoc) : null;
  }
  async update(
    id: string,
    dto: UpdateSentenceDto,
  ): Promise<SentenceView | null> {
    const coll = await this.coll();
    const patch: Partial<SentenceDoc> = { updatedAt: new Date() };
    if (dto.topicId) patch.topicId = new ObjectId(dto.topicId);
    if (dto.sentence !== undefined) patch.sentence = dto.sentence;
    if (dto.description !== undefined) patch.description = dto.description;
    if (dto.isActive !== undefined) patch.isActive = dto.isActive;
    await coll.updateOne({ _id: new ObjectId(id) }, { $set: patch });
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc ? this.toView(doc as SentenceDoc) : null;
  }
  async remove(id: string): Promise<{ deleted: boolean }> {
    const coll = await this.coll();
    const res = await coll.deleteOne({ _id: new ObjectId(id) });
    return { deleted: res.deletedCount === 1 };
  }
}
