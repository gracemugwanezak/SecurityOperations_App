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
            createdAt: Date;
        }, unknown> & {};
        guards: ({
            guard: import("@prisma/client/runtime").GetResult<{
                id: number;
                name: string;
                idNumber: string;
                homeResidence: string;
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            postId: number;
            guardId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string;
        clientId: number;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<{
        guards: (import("@prisma/client/runtime").GetResult<{
            postId: number;
            guardId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string;
        clientId: number;
    }, unknown> & {}>;
    create(createPostDto: CreatePostDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string;
        clientId: number;
    }, unknown> & {}>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string;
        clientId: number;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        title: string;
        content: string;
        clientId: number;
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
