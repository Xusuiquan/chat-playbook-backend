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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const topics_service_1 = require("./topics.service");
const common_2 = require("@nestjs/common");
const user_pipes_1 = require("../common/pipes/user.pipes");
const taxonomy_pipes_1 = require("../common/pipes/taxonomy.pipes");
let TopicsController = class TopicsController {
    topics;
    constructor(topics) {
        this.topics = topics;
    }
    create(dto) {
        return this.topics.create(dto);
    }
    findAll() {
        return this.topics.findAll();
    }
    async findOne(id) {
        const t = await this.topics.findOne(id);
        if (!t)
            throw new common_2.NotFoundException({
                message: 'topic not found',
                error: 'NotFound',
            });
        return t;
    }
    async update(id, dto) {
        const t = await this.topics.update(id, dto);
        if (!t)
            throw new common_2.NotFoundException({
                message: 'topic not found',
                error: 'NotFound',
            });
        return t;
    }
    async remove(id) {
        const res = await this.topics.remove(id);
        if (!res.deleted)
            throw new common_2.NotFoundException({
                message: 'topic not found',
                error: 'NotFound',
            });
        return res;
    }
};
exports.TopicsController = TopicsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '创建话题' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new taxonomy_pipes_1.CreateTopicPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取话题列表' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TopicsController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '获取话题详情' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new user_pipes_1.IdParamPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopicsController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '更新话题' }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', new user_pipes_1.IdParamPipe())),
    __param(1, (0, common_1.Body)(new taxonomy_pipes_1.UpdateTopicPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", Promise)
], TopicsController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '删除话题' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new user_pipes_1.IdParamPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TopicsController.prototype, "remove", null);
exports.TopicsController = TopicsController = __decorate([
    (0, swagger_1.ApiTags)('topics'),
    (0, common_1.Controller)('topics'),
    __metadata("design:paramtypes", [topics_service_1.TopicsService])
], TopicsController);
//# sourceMappingURL=topics.controller.js.map