import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { CreateCategoryDto, UpdateCategoryDto } from '../../categories/dto';
import type { CreateTopicDto, UpdateTopicDto } from '../../topics/dto';
import type { CreateSentenceDto, UpdateSentenceDto } from '../../sentences/dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class CreateCategoryPipe implements PipeTransform {
  transform(value: unknown): CreateCategoryDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException({
        message: 'invalid body',
        error: 'BadRequest',
      });
    }
    const v = value as Record<string, unknown>;
    const name = typeof v.name === 'string' ? v.name.trim() : '';
    const slug = typeof v.slug === 'string' ? v.slug.trim().toLowerCase() : '';
    const description =
      typeof v.description === 'string' ? v.description.trim() : undefined;
    if (!name) {
      throw new BadRequestException({
        message: 'name is required',
        error: 'BadRequest',
      });
    }
    if (!slug) {
      throw new BadRequestException({
        message: 'slug is required',
        error: 'BadRequest',
      });
    }
    return { name, slug, description };
  }
}

@Injectable()
export class UpdateCategoryPipe implements PipeTransform {
  transform(value: unknown): UpdateCategoryDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException({
        message: 'invalid body',
        error: 'BadRequest',
      });
    }
    const v = value as Record<string, unknown>;
    const patch: UpdateCategoryDto = {};
    if (v.name !== undefined) {
      if (typeof v.name !== 'string')
        throw new BadRequestException({
          message: 'name must be string',
          error: 'BadRequest',
        });
      patch.name = v.name.trim();
    }
    if (v.slug !== undefined) {
      if (typeof v.slug !== 'string')
        throw new BadRequestException({
          message: 'slug must be string',
          error: 'BadRequest',
        });
      patch.slug = v.slug.trim().toLowerCase();
    }
    if (v.description !== undefined) {
      if (typeof v.description !== 'string')
        throw new BadRequestException({
          message: 'description must be string',
          error: 'BadRequest',
        });
      patch.description = v.description.trim();
    }
    return patch;
  }
}

@Injectable()
export class CreateTopicPipe implements PipeTransform {
  transform(value: unknown): CreateTopicDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException({
        message: 'invalid body',
        error: 'BadRequest',
      });
    }
    const v = value as Record<string, unknown>;
    const categoryId =
      typeof v.categoryId === 'string' ? v.categoryId.trim() : '';
    const title = typeof v.title === 'string' ? v.title.trim() : '';
    const description =
      typeof v.description === 'string' ? v.description.trim() : undefined;
    const isActive =
      typeof v.isActive === 'boolean' ? v.isActive : undefined;
    if (!ObjectId.isValid(categoryId)) {
      throw new BadRequestException({
        message: 'invalid categoryId',
        error: 'BadRequest',
      });
    }
    if (!title) {
      throw new BadRequestException({
        message: 'title is required',
        error: 'BadRequest',
      });
    }
    let tags: string[] | undefined = undefined;
    if (Array.isArray(v.tags)) {
      tags = v.tags.filter((t): t is string => typeof t === 'string');
    }
    return { categoryId, title, tags, description, isActive };
  }
}

@Injectable()
export class UpdateTopicPipe implements PipeTransform {
  transform(value: unknown): UpdateTopicDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException({
        message: 'invalid body',
        error: 'BadRequest',
      });
    }
    const v = value as Record<string, unknown>;
    const patch: UpdateTopicDto = {};
    if (v.categoryId !== undefined) {
      if (typeof v.categoryId !== 'string' || !ObjectId.isValid(v.categoryId))
        throw new BadRequestException({
          message: 'invalid categoryId',
          error: 'BadRequest',
        });
      patch.categoryId = v.categoryId;
    }
    if (v.title !== undefined) {
      if (typeof v.title !== 'string')
        throw new BadRequestException({
          message: 'title must be string',
          error: 'BadRequest',
        });
      patch.title = v.title.trim();
    }
    if (v.tags !== undefined) {
      if (!Array.isArray(v.tags))
        throw new BadRequestException({
          message: 'tags must be array',
          error: 'BadRequest',
        });
      patch.tags = v.tags.filter((t): t is string => typeof t === 'string');
    }
    if (v.description !== undefined) {
      if (typeof v.description !== 'string')
        throw new BadRequestException({
          message: 'description must be string',
          error: 'BadRequest',
        });
      patch.description = v.description.trim();
    }
    if (v.isActive !== undefined) {
      if (typeof v.isActive !== 'boolean')
        throw new BadRequestException({
          message: 'isActive must be boolean',
          error: 'BadRequest',
        });
      patch.isActive = v.isActive;
    }
    return patch;
  }
}

@Injectable()
export class CreateSentencePipe implements PipeTransform {
  transform(value: unknown): CreateSentenceDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException({
        message: 'invalid body',
        error: 'BadRequest',
      });
    }
    const v = value as Record<string, unknown>;
    const topicId = typeof v.topicId === 'string' ? v.topicId.trim() : '';
    const sentence =
      typeof v.sentence === 'string' ? v.sentence.trim() : '';
    const description =
      typeof v.description === 'string' ? v.description.trim() : undefined;
    const isActive =
      typeof v.isActive === 'boolean' ? v.isActive : undefined;
    if (!ObjectId.isValid(topicId)) {
      throw new BadRequestException({
        message: 'invalid topicId',
        error: 'BadRequest',
      });
    }
    if (!sentence) {
      throw new BadRequestException({
        message: 'sentence is required',
        error: 'BadRequest',
      });
    }
    return { topicId, sentence, description, isActive };
  }
}

@Injectable()
export class UpdateSentencePipe implements PipeTransform {
  transform(value: unknown): UpdateSentenceDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException({
        message: 'invalid body',
        error: 'BadRequest',
      });
    }
    const v = value as Record<string, unknown>;
    const patch: UpdateSentenceDto = {};
    if (v.topicId !== undefined) {
      if (typeof v.topicId !== 'string' || !ObjectId.isValid(v.topicId))
        throw new BadRequestException({
          message: 'invalid topicId',
          error: 'BadRequest',
        });
      patch.topicId = v.topicId;
    }
    if (v.sentence !== undefined) {
      if (typeof v.sentence !== 'string')
        throw new BadRequestException({
          message: 'sentence must be string',
          error: 'BadRequest',
        });
      patch.sentence = v.sentence.trim();
    }
    if (v.description !== undefined) {
      if (typeof v.description !== 'string')
        throw new BadRequestException({
          message: 'description must be string',
          error: 'BadRequest',
        });
      patch.description = v.description.trim();
    }
    if (v.isActive !== undefined) {
      if (typeof v.isActive !== 'boolean')
        throw new BadRequestException({
          message: 'isActive must be boolean',
          error: 'BadRequest',
        });
      patch.isActive = v.isActive;
    }
    return patch;
  }
}
