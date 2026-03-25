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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database.service");
const mongodb_1 = require("mongodb");
let CategoriesService = class CategoriesService {
    db;
    constructor(db) {
        this.db = db;
    }
    async coll() {
        return this.db.getCollection('categories');
    }
    toView(doc) {
        return {
            id: String(doc._id),
            name: doc.name,
            slug: doc.slug,
            description: doc.description,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    }
    async create(dto) {
        const now = new Date();
        const doc = {
            name: dto.name,
            slug: dto.slug,
            description: dto.description,
            createdAt: now,
            updatedAt: now,
        };
        const coll = await this.coll();
        try {
            const res = await coll.insertOne(doc);
            const created = await coll.findOne({ _id: res.insertedId });
            if (!created)
                throw new Error('create failed');
            return this.toView(created);
        }
        catch (e) {
            const code = e.code;
            if (code === 11000) {
                throw new common_1.ConflictException({
                    message: 'slug already exists',
                    error: 'Conflict',
                });
            }
            throw e;
        }
    }
    async findAll() {
        const coll = await this.coll();
        const docs = await coll.find({}).sort({ createdAt: -1 }).toArray();
        return docs.map((d) => this.toView(d));
    }
    async findOne(id) {
        const coll = await this.coll();
        const doc = await coll.findOne({ _id: new mongodb_1.ObjectId(id) });
        return doc ? this.toView(doc) : null;
    }
    async update(id, dto) {
        const coll = await this.coll();
        const patch = { ...dto, updatedAt: new Date() };
        try {
            await coll.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: patch });
        }
        catch (e) {
            const code = e.code;
            if (code === 11000) {
                throw new common_1.ConflictException({
                    message: 'slug already exists',
                    error: 'Conflict',
                });
            }
            throw e;
        }
        const doc = await coll.findOne({ _id: new mongodb_1.ObjectId(id) });
        return doc ? this.toView(doc) : null;
    }
    async remove(id) {
        const coll = await this.coll();
        const res = await coll.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        return { deleted: res.deletedCount === 1 };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map