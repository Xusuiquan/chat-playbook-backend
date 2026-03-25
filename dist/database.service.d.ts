import { Db, Collection, Document } from 'mongodb';
export declare class DatabaseService {
    getMongoUri(): string;
    private client?;
    private db?;
    private getDbName;
    getDb(): Promise<Db>;
    getCollection<T extends Document>(name: string): Promise<Collection<T>>;
}
