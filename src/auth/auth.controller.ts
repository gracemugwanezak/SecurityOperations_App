import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.services';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async register(@Body() body: { email: string; pass: string; name: string; role?: string }) {
        return this.authService.register(body);
    }

    // topsec_backend/src/auth/auth.controller.ts

    @Post('login')
    async login(@Body() body: { email: string; pass: string }) {
        // Ensure you ARE NOT just returning 'access_token' here
        return this.authService.login(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@Request() req) {
        return req.user;
    }
}