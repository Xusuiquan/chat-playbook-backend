import { UsersService } from './users.service';
import type { CreateUserDto, UpdateUserDto } from './dto';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    create(dto: CreateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt?: Date;
        roles?: string[];
        isActive?: boolean;
        displayName?: string;
    }>;
    findAll(): Promise<{
        id: string;
        username: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt?: Date;
        roles?: string[];
        isActive?: boolean;
        displayName?: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        username: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt?: Date;
        roles?: string[];
        isActive?: boolean;
        displayName?: string;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt?: Date;
        roles?: string[];
        isActive?: boolean;
        displayName?: string;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
