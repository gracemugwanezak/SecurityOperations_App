import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
export declare class ClientsController {
    private clientsService;
    constructor(clientsService: ClientsService);
    findAll(): Promise<({
        posts: (import("@prisma/client/runtime").GetResult<{
            id: number;
            title: string;
            content: string;
            clientId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        location: string;
        createdAt: Date;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<{
        posts: (import("@prisma/client/runtime").GetResult<{
            id: number;
            title: string;
            content: string;
            clientId: number;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        location: string;
        createdAt: Date;
    }, unknown> & {}>;
    create(createClientDto: CreateClientDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        location: string;
        createdAt: Date;
    }, unknown> & {}>;
    update(id: number, updateClientDto: UpdateClientDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        location: string;
        createdAt: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        location: string;
        createdAt: Date;
    }, unknown> & {}>;
}
