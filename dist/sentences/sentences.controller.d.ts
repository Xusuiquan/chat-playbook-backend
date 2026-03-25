import { SentencesService } from './sentences.service';
import type { CreateSentenceDto, UpdateSentenceDto } from './dto';
export declare class SentencesController {
    private readonly sentences;
    constructor(sentences: SentencesService);
    create(dto: CreateSentenceDto): Promise<{
        id: string;
        topicId: string;
        sentence: string;
        description?: string;
        isActive?: boolean;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    findAll(): Promise<{
        id: string;
        topicId: string;
        sentence: string;
        description?: string;
        isActive?: boolean;
        createdAt: Date;
        updatedAt?: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        topicId: string;
        sentence: string;
        description?: string;
        isActive?: boolean;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    update(id: string, dto: UpdateSentenceDto): Promise<{
        id: string;
        topicId: string;
        sentence: string;
        description?: string;
        isActive?: boolean;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
