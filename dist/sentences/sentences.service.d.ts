import { DatabaseService } from '../database.service';
import type { CreateSentenceDto, UpdateSentenceDto } from './dto';
type SentenceView = {
    id: string;
    topicId: string;
    sentence: string;
    description?: string;
    isActive?: boolean;
    createdAt: Date;
    updatedAt?: Date;
};
export declare class SentencesService {
    private readonly db;
    constructor(db: DatabaseService);
    private coll;
    private toView;
    create(dto: CreateSentenceDto): Promise<SentenceView>;
    findAll(): Promise<SentenceView[]>;
    findOne(id: string): Promise<SentenceView | null>;
    update(id: string, dto: UpdateSentenceDto): Promise<SentenceView | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
export {};
