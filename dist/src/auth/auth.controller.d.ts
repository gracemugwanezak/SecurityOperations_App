import { AuthService } from './auth.services';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        email: string;
        pass: string;
        name: string;
        role?: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        role: string;
        createdAt: Date;
    }, unknown> & {}>;
    login(body: {
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
    getProfile(req: any): any;
}
