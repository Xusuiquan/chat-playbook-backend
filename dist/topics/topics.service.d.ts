import { DatabaseService } from '../database.service';
import type { CreateTopicDto, UpdateTopicDto } from './dto';
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
export declare class TopicsService {
    private readonly db;
    constructor(db: DatabaseService);
    private coll;
    private toView;
    create(dto: CreateTopicDto): Promise<TopicView>;
    findAll(): Promise<TopicView[]>;
    findOne(id: string): Promise<TopicView | null>;
    update(id: string, dto: UpdateTopicDto): Promise<TopicView | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
export {};
