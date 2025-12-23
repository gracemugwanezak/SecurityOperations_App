import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super({
            log: ['error', 'warn'], // Keeps logs clean while alerting you to issues
        });
    }

    async onModuleInit() {
        try {
            await this.$connect();
            this.logger.log('🚀 Database Engine Synchronized');
        } catch (error) {
            this.logger.error('❌ Database Connection Failed. Ensure Docker is running.');
        }
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('🛑 Database Engine Disconnected');
    }

    /**
     * Optional: Reset database for testing. 
     * Useful if you want to clear assignments during development.
     */
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') return;

        // Order matters because of foreign key constraints
        const models = [
            this.postGuard.deleteMany(),
            this.post.deleteMany(),
            this.guard.deleteMany(),
            this.client.deleteMany(),
        ];

        return Promise.all(models);
    }
}