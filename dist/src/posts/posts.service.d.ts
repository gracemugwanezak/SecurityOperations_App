import { PrismaService } from '../prisma/prisma.services';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        client: import("@prisma/client/runtime").GetResult<{
            id: number;
            name: string;
            email: string;
            location: string;
            contractStart: Date;
            contractEnd: Date;
            createdAt: Date;
        }, unknown> & {};
        guards: ({
            guard: import("@prisma/client/runtime").GetResult<{
                id: number;
                name: string;
                idNumber: string;
                phoneNumber: string | null;
                homeResidence: string;
                createdAt: Date;
                updatedAt: Date;
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            postId: number;
            guardId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string | null;
        clientId: number;
        createdAt: Date;
    }, unknown> & {})[]>;
    create(dto: CreatePostDto): Promise<{
        client: import("@prisma/client/runtime").GetResult<{
            id: number;
            name: string;
            email: string;
            location: string;
            contractStart: Date;
            contractEnd: Date;
            createdAt: Date;
        }, unknown> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string | null;
        clientId: number;
        createdAt: Date;
    }, unknown> & {}>;
    update(id: number, dto: UpdatePostDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string | null;
        clientId: number;
        createdAt: Date;
    }, unknown> & {}>;
    reassignGuards(postId: number, guardIds: number[]): Promise<{
        client: import("@prisma/client/runtime").GetResult<{
            id: number;
            name: string;
            email: string;
            location: string;
            contractStart: Date;
            contractEnd: Date;
            createdAt: Date;
        }, unknown> & {};
        guards: ({
            guard: import("@prisma/client/runtime").GetResult<{
                id: number;
                name: string;
                idNumber: string;
                phoneNumber: string | null;
                homeResidence: string;
                createdAt: Date;
                updatedAt: Date;
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            postId: number;
            guardId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string | null;
        clientId: number;
        createdAt: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string | null;
        clientId: number;
        createdAt: Date;
    }, unknown> & {}>;
    addGuard(postId: number, guardId: number): Promise<import("@prisma/client/runtime").GetResult<{
        postId: number;
        guardId: number;
    }, unknown> & {}>;
    removeGuard(postId: number, guardId: number): Promise<import("@prisma/client/runtime").GetResult<{
        postId: number;
        guardId: number;
    }, unknown> & {}>;
}
