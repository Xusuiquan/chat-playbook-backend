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
exports.UpdateSentenceDto = exports.CreateSentenceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateSentenceDto {
    topicId;
    sentence;
    description;
    isActive;
}
exports.CreateSentenceDto = CreateSentenceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: '话题ID(ObjectId字符串)' }),
    __metadata("design:type", String)
], CreateSentenceDto.prototype, "topicId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '嗨，刚看到你的笑容，感觉今天的心情都被点亮了。' }),
    __metadata("design:type", String)
], CreateSentenceDto.prototype, "sentence", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '轻松开场，氛围友好自然' }),
    __metadata("design:type", String)
], CreateSentenceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true }),
    __metadata("design:type", Boolean)
], CreateSentenceDto.prototype, "isActive", void 0);
class UpdateSentenceDto {
    topicId;
    sentence;
    description;
    isActive;
}
exports.UpdateSentenceDto = UpdateSentenceDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: '话题ID(ObjectId字符串)' }),
    __metadata("design:type", String)
], UpdateSentenceDto.prototype, "topicId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateSentenceDto.prototype, "sentence", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], UpdateSentenceDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Boolean)
], UpdateSentenceDto.prototype, "isActive", void 0);
//# sourceMappingURL=dto.js.map