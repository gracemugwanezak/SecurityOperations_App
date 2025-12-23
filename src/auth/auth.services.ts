import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Must use * as bcrypt

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: { email: string; pass: string; name?: string; role?: string }) {
        const { email, pass, name, role } = data;

        if (!pass) {
            throw new ConflictException('Password (pass) is required');
        }

        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already in use');
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

    // src/auth/auth.services.ts

    // topsec_backend/src/auth/auth.services.ts

    // topsec_backend/src/auth/auth.services.ts

    async login(data: { email: string; pass: string }) {
        // 1. Find the user in the database
        const user = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 2. Compare the hashed password
        const isMatch = await bcrypt.compare(data.pass, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // 3. Create the JWT payload including the role
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role // This will pull "ADMIN" from your DB
        };

        // 4. RETURN BOTH: This is what fixes the 'data.user' issue
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name || 'Personnel Member',
                role: user.role, // This will be "ADMIN"
            },
        };
    }
}