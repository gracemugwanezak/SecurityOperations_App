import { GuardsService } from './guards.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
export declare class GuardsController {
    private guardsService;
    constructor(guardsService: GuardsService);
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
    findOne(id: string): Promise<{
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
    update(id: string, updateGuardDto: UpdateGuardDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        homeResidence: string;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        idNumber: string;
        homeResidence: string;
    }, unknown> & {}>;
}
