import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { PostsModule } from './posts/posts.module';
import { GuardsModule } from './guards/guards.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        AuthModule,
        ClientsModule,
        PostsModule,
        GuardsModule,
    ],
    controllers: [], // HealthController was here earlier, ensure it is valid
    providers: [],
})
export class AppModule { }