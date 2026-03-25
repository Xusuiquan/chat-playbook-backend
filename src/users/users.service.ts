import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Collection, Document, ObjectId } from 'mongodb';
import { CreateUserDto, UpdateUserDto } from './dto';

type UserDoc = Document & {
  _id?: ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt?: Date;
  roles?: string[];
  isActive?: boolean;
  displayName?: string;
};

type UserView = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt?: Date;
  roles?: string[];
  isActive?: boolean;
  displayName?: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}
  private async coll(): Promise<Collection<UserDoc>> {
    return this.db.getCollection<UserDoc>('users');
  }
  private toView(doc: UserDoc): UserView {
    return {
      id: String(doc._id),
      username: doc.username,
      email: doc.email,
      passwordHash: doc.passwordHash,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      roles: doc.roles,
      isActive: doc.isActive,
      displayName: doc.displayName,
    };
  }
  async create(dto: CreateUserDto): Promise<UserView> {
    const now = new Date();
    const doc: UserDoc = {
      username: dto.username,
      email: dto.email,
      passwordHash: dto.passwordHash,
      createdAt: now,
      updatedAt: now,
      roles: dto.roles ?? ['user'],
      isActive: dto.isActive ?? true,
      displayName: dto.displayName,
    };
    const coll = await this.coll();
    const res = await coll.insertOne(doc);
    const created = await coll.findOne({ _id: res.insertedId });
    if (!created) throw new Error('create failed');
    return this.toView(created as UserDoc);
  }
  async findAll(): Promise<UserView[]> {
    const coll = await this.coll();
    const docs = await coll.find({}).sort({ createdAt: -1 }).toArray();
    return docs.map((d) => this.toView(d as UserDoc));
  }
  async findOne(id: string): Promise<UserView | null> {
    const coll = await this.coll();
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc ? this.toView(doc as UserDoc) : null;
  }
  async update(id: string, dto: UpdateUserDto): Promise<UserView | null> {
    const coll = await this.coll();
    const patch = { ...dto, updatedAt: new Date() };
    await coll.updateOne({ _id: new ObjectId(id) }, { $set: patch });
    const doc = await coll.findOne({ _id: new ObjectId(id) });
    return doc ? this.toView(doc as UserDoc) : null;
  }
  async remove(id: string): Promise<{ deleted: boolean }> {
    const coll = await this.coll();
    const res = await coll.deleteOne({ _id: new ObjectId(id) });
    return { deleted: res.deletedCount === 1 };
  }
}
