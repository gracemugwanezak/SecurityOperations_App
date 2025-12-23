import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { Client, Prisma } from '@prisma/client';

interface CreateClientDto {
    name: string;
    email: string;
    location: string;
    contractStart: string | Date;
    contractEnd: string | Date;
}

interface UpdateClientDto extends Partial<CreateClientDto> { }

@Injectable()
export class ClientsService {
    constructor(private prisma: PrismaService) { }

    private formatToISO(dateInput: string | Date): string {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            throw new BadRequestException(`Invalid date format received: ${dateInput}`);
        }
        return date.toISOString();
    }

    async create(data: CreateClientDto): Promise<Client> {
        const contractStart = this.formatToISO(data.contractStart);
        const contractEnd = this.formatToISO(data.contractEnd);

        return this.prisma.client.create({
            data: {
                name: data.name,
                email: data.email,
                location: data.location,
                contractStart,
                contractEnd,
            },
        });
    }

    async findAll() {
        const clients = await this.prisma.client.findMany({
            include: {
                posts: { include: { guards: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return clients.map((client) => ({
            ...client,
            postCount: client.posts.length,
            guardCount: client.posts.reduce((acc, post) => acc + (post.guards?.length || 0), 0),
        }));
    }

    async findOne(id: number) {
        const client = await this.prisma.client.findUnique({
            where: { id },
            include: {
                posts: { include: { guards: true } },
            },
        });

        if (!client) throw new NotFoundException(`Client with ID ${id} not found`);

        return {
            ...client,
            postCount: client.posts.length,
            guardCount: client.posts.reduce((acc, post) => acc + (post.guards?.length || 0), 0),
        };
    }

    async update(id: number, data: UpdateClientDto): Promise<Client> {
        const updateData: Prisma.ClientUpdateInput = {
            name: data.name,
            email: data.email,
            location: data.location
        };

        if (data.contractStart) updateData.contractStart = this.formatToISO(data.contractStart);
        if (data.contractEnd) updateData.contractEnd = this.formatToISO(data.contractEnd);

        try {
            return await this.prisma.client.update({
                where: { id },
                data: updateData,
            });
        } catch (error) {
            throw new NotFoundException(`Client with ID ${id} not found`);
        }
    }

    /**
     * Deletes a client. 
     * The database's 'onDelete: Cascade' setting will automatically 
     * remove all related Posts and PostGuard entries.
     */
    async remove(id: number): Promise<Client> {
        try {
            return await this.prisma.client.delete({
                where: { id },
            });
        } catch (error) {
            // Check if error is because record doesn't exist
            throw new NotFoundException(`Client with ID ${id} not found or could not be deleted`);
        }
    }
}