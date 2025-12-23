import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'; // Add this if missing
import { AuthService } from './auth.services';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // Check this filename!
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET || 'DEBUG_SECRET',
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController], // Controllers ONLY here
    providers: [AuthService, JwtStrategy], // Services ONLY here
    exports: [AuthService],
})
export class AuthModule { }