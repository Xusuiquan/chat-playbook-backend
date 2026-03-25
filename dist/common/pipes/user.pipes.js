"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdParamPipe = exports.UpdateUserPipe = exports.CreateUserPipe = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let CreateUserPipe = class CreateUserPipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException({
                message: 'invalid body',
                error: 'BadRequest',
            });
        }
        const v = value;
        const username = typeof v.username === 'string' ? v.username.trim() : '';
        const email = typeof v.email === 'string' ? v.email.trim() : '';
        const passwordHash = typeof v.passwordHash === 'string' ? v.passwordHash.trim() : '';
        if (username.length < 3 || username.length > 64) {
            throw new common_1.BadRequestException({
                message: 'username length 3-64',
                error: 'BadRequest',
            });
        }
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            throw new common_1.BadRequestException({
                message: 'invalid email',
                error: 'BadRequest',
            });
        }
        if (passwordHash.length < 32) {
            throw new common_1.BadRequestException({
                message: 'passwordHash too short',
                error: 'BadRequest',
            });
        }
        const roles = Array.isArray(v.roles)
            ? v.roles.filter((r) => typeof r === 'string')
            : undefined;
        const isActive = typeof v.isActive === 'boolean' ? v.isActive : undefined;
        const displayName = typeof v.displayName === 'string' ? v.displayName.trim() : undefined;
        return { username, email, passwordHash, roles, isActive, displayName };
    }
};
exports.CreateUserPipe = CreateUserPipe;
exports.CreateUserPipe = CreateUserPipe = __decorate([
    (0, common_1.Injectable)()
], CreateUserPipe);
let UpdateUserPipe = class UpdateUserPipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException({
                message: 'invalid body',
                error: 'BadRequest',
            });
        }
        const v = value;
        const patch = {};
        if (v.username !== undefined) {
            if (typeof v.username !== 'string')
                throw new common_1.BadRequestException({
                    message: 'username must be string',
                    error: 'BadRequest',
                });
            const s = v.username.trim();
            if (s.length < 3 || s.length > 64)
                throw new common_1.BadRequestException({
                    message: 'username length 3-64',
                    error: 'BadRequest',
                });
            patch.username = s;
        }
        if (v.email !== undefined) {
            if (typeof v.email !== 'string')
                throw new common_1.BadRequestException({
                    message: 'email must be string',
                    error: 'BadRequest',
                });
            const e = v.email.trim();
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e))
                throw new common_1.BadRequestException({
                    message: 'invalid email',
                    error: 'BadRequest',
                });
            patch.email = e;
        }
        if (v.passwordHash !== undefined) {
            if (typeof v.passwordHash !== 'string')
                throw new common_1.BadRequestException({
                    message: 'passwordHash must be string',
                    error: 'BadRequest',
                });
            const p = v.passwordHash.trim();
            if (p.length < 32)
                throw new common_1.BadRequestException({
                    message: 'passwordHash too short',
                    error: 'BadRequest',
                });
            patch.passwordHash = p;
        }
        if (v.roles !== undefined) {
            if (!Array.isArray(v.roles))
                throw new common_1.BadRequestException({
                    message: 'roles must be array',
                    error: 'BadRequest',
                });
            patch.roles = v.roles.filter((r) => typeof r === 'string');
        }
        if (v.isActive !== undefined) {
            if (typeof v.isActive !== 'boolean')
                throw new common_1.BadRequestException({
                    message: 'isActive must be boolean',
                    error: 'BadRequest',
                });
            patch.isActive = v.isActive;
        }
        if (v.displayName !== undefined) {
            if (typeof v.displayName !== 'string')
                throw new common_1.BadRequestException({
                    message: 'displayName must be string',
                    error: 'BadRequest',
                });
            patch.displayName = v.displayName.trim();
        }
        return patch;
    }
};
exports.UpdateUserPipe = UpdateUserPipe;
exports.UpdateUserPipe = UpdateUserPipe = __decorate([
    (0, common_1.Injectable)()
], UpdateUserPipe);
let IdParamPipe = class IdParamPipe {
    transform(value) {
        if (typeof value !== 'string' || !mongodb_1.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException({
                message: 'invalid id',
                error: 'BadRequest',
            });
        }
        return value;
    }
};
exports.IdParamPipe = IdParamPipe;
exports.IdParamPipe = IdParamPipe = __decorate([
    (0, common_1.Injectable)()
], IdParamPipe);
//# sourceMappingURL=user.pipes.js.map