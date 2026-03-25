import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import type { CreateUserDto, UpdateUserDto } from '../../users/dto';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: unknown): CreateUserDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException({
        message: 'invalid body',
        error: 'BadRequest',
      });
    }
    const v = value as Record<string, unknown>;
    const username = typeof v.username === 'string' ? v.username.trim() : '';
    const email = typeof v.email === 'string' ? v.email.trim() : '';
    const passwordHash =
      typeof v.passwordHash === 'string' ? v.passwordHash.trim() : '';
    if (username.length < 3 || username.length > 64) {
      throw new BadRequestException({
        message: 'username length 3-64',
        error: 'BadRequest',
      });
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new BadRequestException({
        message: 'invalid email',
        error: 'BadRequest',
      });
    }
    if (passwordHash.length < 32) {
      throw new BadRequestException({
        message: 'passwordHash too short',
        error: 'BadRequest',
      });
    }
    const roles = Array.isArray(v.roles)
      ? v.roles.filter((r): r is string => typeof r === 'string')
      : undefined;
    const isActive = typeof v.isActive === 'boolean' ? v.isActive : undefined;
    const displayName =
      typeof v.displayName === 'string' ? v.displayName.trim() : undefined;
    return { username, email, passwordHash, roles, isActive, displayName };
  }
}

@Injectable()
export class UpdateUserPipe implements PipeTransform {
  transform(value: unknown): UpdateUserDto {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException({
        message: 'invalid body',
        error: 'BadRequest',
      });
    }
    const v = value as Record<string, unknown>;
    const patch: UpdateUserDto = {};
    if (v.username !== undefined) {
      if (typeof v.username !== 'string')
        throw new BadRequestException({
          message: 'username must be string',
          error: 'BadRequest',
        });
      const s = v.username.trim();
      if (s.length < 3 || s.length > 64)
        throw new BadRequestException({
          message: 'username length 3-64',
          error: 'BadRequest',
        });
      patch.username = s;
    }
    if (v.email !== undefined) {
      if (typeof v.email !== 'string')
        throw new BadRequestException({
          message: 'email must be string',
          error: 'BadRequest',
        });
      const e = v.email.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e))
        throw new BadRequestException({
          message: 'invalid email',
          error: 'BadRequest',
        });
      patch.email = e;
    }
    if (v.passwordHash !== undefined) {
      if (typeof v.passwordHash !== 'string')
        throw new BadRequestException({
          message: 'passwordHash must be string',
          error: 'BadRequest',
        });
      const p = v.passwordHash.trim();
      if (p.length < 32)
        throw new BadRequestException({
          message: 'passwordHash too short',
          error: 'BadRequest',
        });
      patch.passwordHash = p;
    }
    if (v.roles !== undefined) {
      if (!Array.isArray(v.roles))
        throw new BadRequestException({
          message: 'roles must be array',
          error: 'BadRequest',
        });
      patch.roles = v.roles.filter((r): r is string => typeof r === 'string');
    }
    if (v.isActive !== undefined) {
      if (typeof v.isActive !== 'boolean')
        throw new BadRequestException({
          message: 'isActive must be boolean',
          error: 'BadRequest',
        });
      patch.isActive = v.isActive;
    }
    if (v.displayName !== undefined) {
      if (typeof v.displayName !== 'string')
        throw new BadRequestException({
          message: 'displayName must be string',
          error: 'BadRequest',
        });
      patch.displayName = v.displayName.trim();
    }
    return patch;
  }
}

@Injectable()
export class IdParamPipe implements PipeTransform {
  transform(value: unknown): string {
    if (typeof value !== 'string' || !ObjectId.isValid(value)) {
      throw new BadRequestException({
        message: 'invalid id',
        error: 'BadRequest',
      });
    }
    return value;
  }
}
