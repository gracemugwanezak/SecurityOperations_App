import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.services';

@Global() // This makes Prisma available everywhere without re-importing in every module
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class PrismaModule { }