import { Injectable } from '@nestjs/common';
import { Db, MongoClient, Collection, Document } from 'mongodb';

@Injectable()
export class DatabaseService {
  getMongoUri(): string {
    return (
      process.env.MONGODB_URI ||
      'mongodb://localhost:27017/chat-playbook-backend'
    );
  }
  private client?: MongoClient;
  private db?: Db;
  private getDbName(uri: string): string {
    const normalized = uri.replace('mongodb+srv://', 'mongodb://');
    const u = new URL(normalized);
    const path = u.pathname || '';
    const name = path.startsWith('/') ? path.slice(1) : path;
    return name || 'chat-playbook-backend';
  }
  async getDb(): Promise<Db> {
    if (this.db) return this.db;
    const uri = this.getMongoUri();
    const dbName = this.getDbName(uri);
    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db(dbName);
    return this.db;
  }
  async getCollection<T extends Document>(
    name: string,
  ): Promise<Collection<T>> {
    const db = await this.getDb();
    return db.collection<T>(name);
  }
}
