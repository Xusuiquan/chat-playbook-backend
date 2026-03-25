"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSentencePipe = exports.CreateSentencePipe = exports.UpdateTopicPipe = exports.CreateTopicPipe = exports.UpdateCategoryPipe = exports.CreateCategoryPipe = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let CreateCategoryPipe = class CreateCategoryPipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException({
                message: 'invalid body',
                error: 'BadRequest',
            });
        }
        const v = value;
        const name = typeof v.name === 'string' ? v.name.trim() : '';
        const slug = typeof v.slug === 'string' ? v.slug.trim().toLowerCase() : '';
        const description = typeof v.description === 'string' ? v.description.trim() : undefined;
        if (!name) {
            throw new common_1.BadRequestException({
                message: 'name is required',
                error: 'BadRequest',
            });
        }
        if (!slug) {
            throw new common_1.BadRequestException({
                message: 'slug is required',
                error: 'BadRequest',
            });
        }
        return { name, slug, description };
    }
};
exports.CreateCategoryPipe = CreateCategoryPipe;
exports.CreateCategoryPipe = CreateCategoryPipe = __decorate([
    (0, common_1.Injectable)()
], CreateCategoryPipe);
let UpdateCategoryPipe = class UpdateCategoryPipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException({
                message: 'invalid body',
                error: 'BadRequest',
            });
        }
        const v = value;
        const patch = {};
        if (v.name !== undefined) {
            if (typeof v.name !== 'string')
                throw new common_1.BadRequestException({
                    message: 'name must be string',
                    error: 'BadRequest',
                });
            patch.name = v.name.trim();
        }
        if (v.slug !== undefined) {
            if (typeof v.slug !== 'string')
                throw new common_1.BadRequestException({
                    message: 'slug must be string',
                    error: 'BadRequest',
                });
            patch.slug = v.slug.trim().toLowerCase();
        }
        if (v.description !== undefined) {
            if (typeof v.description !== 'string')
                throw new common_1.BadRequestException({
                    message: 'description must be string',
                    error: 'BadRequest',
                });
            patch.description = v.description.trim();
        }
        return patch;
    }
};
exports.UpdateCategoryPipe = UpdateCategoryPipe;
exports.UpdateCategoryPipe = UpdateCategoryPipe = __decorate([
    (0, common_1.Injectable)()
], UpdateCategoryPipe);
let CreateTopicPipe = class CreateTopicPipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException({
                message: 'invalid body',
                error: 'BadRequest',
            });
        }
        const v = value;
        const categoryId = typeof v.categoryId === 'string' ? v.categoryId.trim() : '';
        const title = typeof v.title === 'string' ? v.title.trim() : '';
        const description = typeof v.description === 'string' ? v.description.trim() : undefined;
        const isActive = typeof v.isActive === 'boolean' ? v.isActive : undefined;
        if (!mongodb_1.ObjectId.isValid(categoryId)) {
            throw new common_1.BadRequestException({
                message: 'invalid categoryId',
                error: 'BadRequest',
            });
        }
        if (!title) {
            throw new common_1.BadRequestException({
                message: 'title is required',
                error: 'BadRequest',
            });
        }
        let tags = undefined;
        if (Array.isArray(v.tags)) {
            tags = v.tags.filter((t) => typeof t === 'string');
        }
        return { categoryId, title, tags, description, isActive };
    }
};
exports.CreateTopicPipe = CreateTopicPipe;
exports.CreateTopicPipe = CreateTopicPipe = __decorate([
    (0, common_1.Injectable)()
], CreateTopicPipe);
let UpdateTopicPipe = class UpdateTopicPipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException({
                message: 'invalid body',
                error: 'BadRequest',
            });
        }
        const v = value;
        const patch = {};
        if (v.categoryId !== undefined) {
            if (typeof v.categoryId !== 'string' || !mongodb_1.ObjectId.isValid(v.categoryId))
                throw new common_1.BadRequestException({
                    message: 'invalid categoryId',
                    error: 'BadRequest',
                });
            patch.categoryId = v.categoryId;
        }
        if (v.title !== undefined) {
            if (typeof v.title !== 'string')
                throw new common_1.BadRequestException({
                    message: 'title must be string',
                    error: 'BadRequest',
                });
            patch.title = v.title.trim();
        }
        if (v.tags !== undefined) {
            if (!Array.isArray(v.tags))
                throw new common_1.BadRequestException({
                    message: 'tags must be array',
                    error: 'BadRequest',
                });
            patch.tags = v.tags.filter((t) => typeof t === 'string');
        }
        if (v.description !== undefined) {
            if (typeof v.description !== 'string')
                throw new common_1.BadRequestException({
                    message: 'description must be string',
                    error: 'BadRequest',
                });
            patch.description = v.description.trim();
        }
        if (v.isActive !== undefined) {
            if (typeof v.isActive !== 'boolean')
                throw new common_1.BadRequestException({
                    message: 'isActive must be boolean',
                    error: 'BadRequest',
                });
            patch.isActive = v.isActive;
        }
        return patch;
    }
};
exports.UpdateTopicPipe = UpdateTopicPipe;
exports.UpdateTopicPipe = UpdateTopicPipe = __decorate([
    (0, common_1.Injectable)()
], UpdateTopicPipe);
let CreateSentencePipe = class CreateSentencePipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException({
                message: 'invalid body',
                error: 'BadRequest',
            });
        }
        const v = value;
        const topicId = typeof v.topicId === 'string' ? v.topicId.trim() : '';
        const sentence = typeof v.sentence === 'string' ? v.sentence.trim() : '';
        const description = typeof v.description === 'string' ? v.description.trim() : undefined;
        const isActive = typeof v.isActive === 'boolean' ? v.isActive : undefined;
        if (!mongodb_1.ObjectId.isValid(topicId)) {
            throw new common_1.BadRequestException({
                message: 'invalid topicId',
                error: 'BadRequest',
            });
        }
        if (!sentence) {
            throw new common_1.BadRequestException({
                message: 'sentence is required',
                error: 'BadRequest',
            });
        }
        return { topicId, sentence, description, isActive };
    }
};
exports.CreateSentencePipe = CreateSentencePipe;
exports.CreateSentencePipe = CreateSentencePipe = __decorate([
    (0, common_1.Injectable)()
], CreateSentencePipe);
let UpdateSentencePipe = class UpdateSentencePipe {
    transform(value) {
        if (!value || typeof value !== 'object') {
            throw new common_1.BadRequestException({
                message: 'invalid body',
                error: 'BadRequest',
            });
        }
        const v = value;
        const patch = {};
        if (v.topicId !== undefined) {
            if (typeof v.topicId !== 'string' || !mongodb_1.ObjectId.isValid(v.topicId))
                throw new common_1.BadRequestException({
                    message: 'invalid topicId',
                    error: 'BadRequest',
                });
            patch.topicId = v.topicId;
        }
        if (v.sentence !== undefined) {
            if (typeof v.sentence !== 'string')
                throw new common_1.BadRequestException({
                    message: 'sentence must be string',
                    error: 'BadRequest',
                });
            patch.sentence = v.sentence.trim();
        }
        if (v.description !== undefined) {
            if (typeof v.description !== 'string')
                throw new common_1.BadRequestException({
                    message: 'description must be string',
                    error: 'BadRequest',
                });
            patch.description = v.description.trim();
        }
        if (v.isActive !== undefined) {
            if (typeof v.isActive !== 'boolean')
                throw new common_1.BadRequestException({
                    message: 'isActive must be boolean',
                    error: 'BadRequest',
                });
            patch.isActive = v.isActive;
        }
        return patch;
    }
};
exports.UpdateSentencePipe = UpdateSentencePipe;
exports.UpdateSentencePipe = UpdateSentencePipe = __decorate([
    (0, common_1.Injectable)()
], UpdateSentencePipe);
//# sourceMappingURL=taxonomy.pipes.js.map