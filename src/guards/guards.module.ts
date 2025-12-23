

import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';
import { GuardsController } from './guards.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module'; // Import the Module, not the service

@Module({
    imports: [ AuthModule, PrismaModule], // Add PrismaModule to imports
    controllers: [GuardsController],
    providers: [GuardsService],
})
export class GuardsModule { }


