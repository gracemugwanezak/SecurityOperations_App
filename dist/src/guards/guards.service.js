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
exports.GuardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("../prisma/prisma.services");
let GuardsService = class GuardsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.guard.findMany({
            include: {
                posts: {
                    include: { post: true }
                }
            }
        });
    }
    async findOne(id) {
        const guard = await this.prisma.guard.findUnique({
            where: { id },
            include: {
                posts: { include: { post: true } }
            }
        });
        if (!guard)
            throw new common_1.NotFoundException(`Guard with ID ${id} not found`);
        return guard;
    }
    async create(createGuardDto) {
        return this.prisma.guard.create({
            data: {
                name: createGuardDto.name,
                idNumber: createGuardDto.idNumber,
                homeResidence: createGuardDto.homeResidence,
            },
        });
    }
    async update(id, updateGuardDto) {
        return this.prisma.guard.update({
            where: { id },
            data: updateGuardDto,
        });
    }
    async remove(id) {
        return this.prisma.guard.delete({ where: { id } });
    }
};
exports.GuardsService = GuardsService;
exports.GuardsService = GuardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService])
], GuardsService);
//# sourceMappingURL=guards.service.js.map