import { PrismaService } from '../prisma/prisma.services';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: {
        email: string;
        pass: string;
        name?: string;
        role?: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: string;
        createdAt: Date;
    }, unknown> & {}>;
    login(data: {
        email: string;
        pass: string;
    }): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: string;
        };
    }>;
}
