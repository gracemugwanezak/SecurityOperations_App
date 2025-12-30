import { PrismaService } from '../prisma/prisma.services';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
export declare class GuardsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        posts: ({
            post: {
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
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            postId: number;
            guardId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        phoneNumber: string | null;
        homeResidence: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<{
        posts: ({
            post: {
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
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            postId: number;
            guardId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        phoneNumber: string | null;
        homeResidence: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    reassign(idParam: number, postId: number): Promise<{
        post: {
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
        }, unknown> & {};
    } & import("@prisma/client/runtime").GetResult<{
        postId: number;
        guardId: number;
    }, unknown> & {}>;
    create(createGuardDto: CreateGuardDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        phoneNumber: string | null;
        homeResidence: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    update(id: number, updateGuardDto: UpdateGuardDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        phoneNumber: string | null;
        homeResidence: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        phoneNumber: string | null;
        homeResidence: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
