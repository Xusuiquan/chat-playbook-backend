import { CategoriesService } from './categories.service';
import type { CreateCategoryDto, UpdateCategoryDto } from './dto';
export declare class CategoriesController {
    private readonly categories;
    constructor(categories: CategoriesService);
    create(dto: CreateCategoryDto): Promise<{
        id: string;
        name: string;
        slug: string;
        description?: string;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        description?: string;
        createdAt: Date;
        updatedAt?: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        description?: string;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        name: string;
        slug: string;
        description?: string;
        createdAt: Date;
        updatedAt?: Date;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
