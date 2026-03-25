import { DatabaseService } from '../database.service';
import { CreateUserDto, UpdateUserDto } from './dto';
type UserView = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt?: Date;
    roles?: string[];
    isActive?: boolean;
    displayName?: string;
};
export declare class UsersService {
    private readonly db;
    constructor(db: DatabaseService);
    private coll;
    private toView;
    create(dto: CreateUserDto): Promise<UserView>;
    findAll(): Promise<UserView[]>;
    findOne(id: string): Promise<UserView | null>;
    update(id: string, dto: UpdateUserDto): Promise<UserView | null>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
export {};
