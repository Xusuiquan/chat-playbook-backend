import { PipeTransform } from '@nestjs/common';
import type { CreateUserDto, UpdateUserDto } from '../../users/dto';
export declare class CreateUserPipe implements PipeTransform {
    transform(value: unknown): CreateUserDto;
}
export declare class UpdateUserPipe implements PipeTransform {
    transform(value: unknown): UpdateUserDto;
}
export declare class IdParamPipe implements PipeTransform {
    transform(value: unknown): string;
}
