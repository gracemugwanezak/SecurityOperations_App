import { PrismaService } from '../prisma/prisma.services';
import { Client } from '@prisma/client';
interface CreateClientDto {
    name: string;
    email: string;
    location: string;
    contractStart: string | Date;
    contractEnd: string | Date;
}
interface UpdateClientDto extends Partial<CreateClientDto> {
}
export declare class ClientsService {
    private prisma;
    constructor(prisma: PrismaService);
    private formatToISO;
    create(data: CreateClientDto): Promise<Client>;
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
    update(id: number, data: UpdateClientDto): Promise<Client>;
    remove(id: number): Promise<Client>;
}
export {};
