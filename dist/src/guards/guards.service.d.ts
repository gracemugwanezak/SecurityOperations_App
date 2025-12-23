import { PrismaService } from '../prisma/prisma.services';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
export declare class GuardsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        posts: ({
            post: import("@prisma/client/runtime").GetResult<{
                id: number;
                title: string;
                content: string;
                clientId: number;
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            postId: number;
            guardId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        homeResidence: string;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<{
        posts: ({
            post: import("@prisma/client/runtime").GetResult<{
                id: number;
                title: string;
                content: string;
                clientId: number;
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            postId: number;
            guardId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        homeResidence: string;
    }, unknown> & {}>;
    create(createGuardDto: CreateGuardDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        homeResidence: string;
    }, unknown> & {}>;
    update(id: number, updateGuardDto: UpdateGuardDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        homeResidence: string;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        homeResidence: string;
    }, unknown> & {}>;
}
