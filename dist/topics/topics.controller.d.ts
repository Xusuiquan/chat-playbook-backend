import { TopicsService } from './topics.service';
import type { CreateTopicDto, UpdateTopicDto } from './dto';
export declare class TopicsController {
    private readonly topics;
    constructor(topics: TopicsService);
    create(dto: CreateTopicDto): Promise<{
        id: string;
        categoryId: string;
        title: string;
        tags?: string[];
        description?: string;
        isActive?: boolean;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    findAll(): Promise<{
        id: string;
        categoryId: string;
        title: string;
        tags?: string[];
        description?: string;
        isActive?: boolean;
        createdAt: Date;
        updatedAt?: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        categoryId: string;
        title: string;
        tags?: string[];
        description?: string;
        isActive?: boolean;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    update(id: string, dto: UpdateTopicDto): Promise<{
        id: string;
        categoryId: string;
        title: string;
        tags?: string[];
        description?: string;
        isActive?: boolean;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
