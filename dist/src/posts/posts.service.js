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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("../prisma/prisma.services");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.post.findMany({
            include: {
                client: true,
                guards: { include: { guard: true } }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
    async create(dto) {
        return this.prisma.post.create({
            data: {
                title: dto.title,
                content: dto.content,
                clientId: Number(dto.clientId),
            },
            include: { client: true }
        });
    }
    async update(id, dto) {
        try {
            return await this.prisma.post.update({
                where: { id },
                data: dto,
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`Post #${id} not found`);
        }
    }
    async reassignGuards(postId, guardIds) {
        return this.prisma.$transaction(async (tx) => {
            await tx.postGuard.deleteMany({ where: { postId } });
            if (guardIds.length > 0) {
                await tx.postGuard.createMany({
                    data: guardIds.map(id => ({ postId, guardId: id }))
                });
            }
            return tx.post.findUnique({
                where: { id: postId },
                include: { client: true, guards: { include: { guard: true } } }
            });
        });
    }
    async remove(id) {
        return this.prisma.post.delete({ where: { id } });
    }
    async addGuard(postId, guardId) {
        return this.prisma.$transaction(async (tx) => {
            await tx.postGuard.deleteMany({ where: { guardId } });
            return tx.postGuard.create({
                data: { postId, guardId }
            });
        });
    }
    async removeGuard(postId, guardId) {
        return this.prisma.postGuard.delete({
            where: { postId_guardId: { postId, guardId } }
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map