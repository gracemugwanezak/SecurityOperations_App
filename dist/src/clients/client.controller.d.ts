import { ClientsService } from './clients.service';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    findAll(): Promise<{
        postCount: number;
        guardCount: number;
        posts: ({
            guards: (import("@prisma/client/runtime").GetResult<{
                postId: number;
                guardId: number;
            }, unknown> & {})[];
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            title: string;
            content: string | null;
            clientId: number;
            createdAt: Date;
        }, unknown> & {})[];
        email: string;
        name: string;
        id: number;
        createdAt: Date;
        location: string;
        contractStart: Date;
        contractEnd: Date;
    }[]>;
    findOne(id: number): Promise<{
        postCount: number;
        guardCount: number;
        posts: ({
            guards: (import("@prisma/client/runtime").GetResult<{
                postId: number;
                guardId: number;
            }, unknown> & {})[];
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            title: string;
            content: string | null;
            clientId: number;
            createdAt: Date;
        }, unknown> & {})[];
        email: string;
        name: string;
        id: number;
        createdAt: Date;
        location: string;
        contractStart: Date;
        contractEnd: Date;
    }>;
    create(createClientDto: any): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        location: string;
        contractStart: Date;
        contractEnd: Date;
        createdAt: Date;
    }, unknown> & {}>;
    update(id: number, updateClientDto: any): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        location: string;
        contractStart: Date;
        contractEnd: Date;
        createdAt: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        location: string;
        contractStart: Date;
        contractEnd: Date;
        createdAt: Date;
    }, unknown> & {}>;
}
