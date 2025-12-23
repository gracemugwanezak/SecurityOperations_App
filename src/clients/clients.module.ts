import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './client.controller';
import { PrismaService } from '../prisma/prisma.services'; // Ensure this path is correct

@Module({
    controllers: [ClientsController],
    providers: [ClientsService, PrismaService],
    exports: [ClientsService],
})
export class ClientsModule { }