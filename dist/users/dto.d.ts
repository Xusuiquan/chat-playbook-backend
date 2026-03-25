export declare class CreateUserDto {
    username: string;
    email: string;
    passwordHash: string;
    roles?: string[];
    isActive?: boolean;
    displayName?: string;
}
export declare class UpdateUserDto {
    username?: string;
    email?: string;
    passwordHash?: string;
    roles?: string[];
    isActive?: boolean;
    displayName?: string;
}
