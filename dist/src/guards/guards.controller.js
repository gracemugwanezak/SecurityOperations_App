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
exports.GuardsController = void 0;
const common_1 = require("@nestjs/common");
const guards_service_1 = require("./guards.service");
const create_guard_dto_1 = require("./dto/create-guard.dto");
const update_guard_dto_1 = require("./dto/update-guard.dto");
let GuardsController = class GuardsController {
    constructor(guardsService) {
        this.guardsService = guardsService;
    }
    async reassign(guardId, postId) {
        return this.guardsService.reassign(guardId, postId);
    }
    create(createGuardDto) {
        return this.guardsService.create(createGuardDto);
    }
    findAll() {
        return this.guardsService.findAll();
    }
    findOne(id) {
        return this.guardsService.findOne(id);
    }
    update(id, dto) {
        return this.guardsService.update(id, dto);
    }
    remove(id) {
        return this.guardsService.remove(id);
    }
};
exports.GuardsController = GuardsController;
__decorate([
    (0, common_1.Patch)('reassign-guard/:id/:postId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], GuardsController.prototype, "reassign", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_guard_dto_1.CreateGuardDto]),
    __metadata("design:returntype", void 0)
], GuardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GuardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GuardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_guard_dto_1.UpdateGuardDto]),
    __metadata("design:returntype", void 0)
], GuardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GuardsController.prototype, "remove", null);
exports.GuardsController = GuardsController = __decorate([
    (0, common_1.Controller)('guards'),
    __metadata("design:paramtypes", [guards_service_1.GuardsService])
], GuardsController);
//# sourceMappingURL=guards.controller.js.map