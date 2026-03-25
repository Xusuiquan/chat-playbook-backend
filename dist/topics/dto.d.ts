export declare class CreateTopicDto {
    categoryId: string;
    title: string;
    tags?: string[];
    description?: string;
    isActive?: boolean;
}
export declare class UpdateTopicDto {
    categoryId?: string;
    title?: string;
    tags?: string[];
    description?: string;
    isActive?: boolean;
}
