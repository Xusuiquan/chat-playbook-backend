import { DatabaseService } from '../database.service';
import type { CreateCategoryDto, UpdateCategoryDto } from './dto';
type CategoryView = {
    id: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: Date;
    updatedAt?: Date;
};
export declare class CategoriesService {
    private readonly db;
    constructor(db: DatabaseService);
    private coll;
    private toView;
    create(dto: CreateCategoryDto): Promise<CategoryView>;
    findAll(): Promise<CategoryView[]>;
    findOne(id: string): Promise<CategoryView | null>;
    update(id: string, dto: UpdateCategoryDto): Promise<CategoryView | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
export {};
