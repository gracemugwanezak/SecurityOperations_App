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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_services_1 = require("../prisma/prisma.services");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(data) {
        const { email, pass, name, role } = data;
        if (!pass) {
            throw new common_1.ConflictException('Password (pass) is required');
        }
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(pass, 10);
        return this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || 'Personnel Member',
                role: role || 'USER',
            },
        });
    }
    async login(data) {
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(data.pass, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name || 'Personnel Member',
                role: user.role,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_services_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.services.js.map