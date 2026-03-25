"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTopicDto = exports.CreateTopicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateTopicDto {
    categoryId;
    title;
    tags;
    description;
    isActive;
}
exports.CreateTopicDto = CreateTopicDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '分类ID(ObjectId字符串)' }),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '第一次聊天开场', minLength: 1, maxLength: 128 }),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String], example: ['开场', '幽默', '轻松'] }),
    __metadata("design:type", Array)
], CreateTopicDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '自然不尴尬的破冰方式' }),
    __metadata("design:type", String)
], CreateTopicDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    __metadata("design:type", Boolean)
], CreateTopicDto.prototype, "isActive", void 0);
class UpdateTopicDto {
    categoryId;
    title;
    tags;
    description;
    isActive;
}
exports.UpdateTopicDto = UpdateTopicDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '分类ID(ObjectId字符串)' }),
    __metadata("design:type", String)
], UpdateTopicDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ minLength: 1, maxLength: 128 }),
    __metadata("design:type", String)
], UpdateTopicDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [String] }),
    __metadata("design:type", Array)
], UpdateTopicDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateTopicDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], UpdateTopicDto.prototype, "isActive", void 0);
//# sourceMappingURL=dto.js.map