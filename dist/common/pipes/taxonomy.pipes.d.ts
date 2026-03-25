import { PipeTransform } from '@nestjs/common';
import type { CreateCategoryDto, UpdateCategoryDto } from '../../categories/dto';
import type { CreateTopicDto, UpdateTopicDto } from '../../topics/dto';
import type { CreateSentenceDto, UpdateSentenceDto } from '../../sentences/dto';
export declare class CreateCategoryPipe implements PipeTransform {
    transform(value: unknown): CreateCategoryDto;
}
export declare class UpdateCategoryPipe implements PipeTransform {
    transform(value: unknown): UpdateCategoryDto;
}
export declare class CreateTopicPipe implements PipeTransform {
    transform(value: unknown): CreateTopicDto;
}
export declare class UpdateTopicPipe implements PipeTransform {
    transform(value: unknown): UpdateTopicDto;
}
export declare class CreateSentencePipe implements PipeTransform {
    transform(value: unknown): CreateSentenceDto;
}
export declare class UpdateSentencePipe implements PipeTransform {
    transform(value: unknown): UpdateSentenceDto;
}
