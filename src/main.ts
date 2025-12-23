import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    
        // 1. Enable Global Validation
        // This ensures your DTOs (CreateGuardDto, etc.) are enforced
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true,               // Strips away fields not defined in the DTO
            forbidNonWhitelisted: true,    // Errors out if extra fields are sent
            transform: true,               // Converts strings to numbers (like @Param('id')) automatically
        }));
    
    // 2. Configure CORS
    // Allows your frontend to communicate with the backend
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    app.enableCors({
        origin: frontendUrl,
        credentials: true,
    });

    // 3. Set Port and Host
    // 0.0.0.0 is crucial for Docker/Cloud accessibility
    const port = parseInt(process.env.PORT, 10) || 3000;

    await app.listen(port, '0.0.0.0');

    console.log(`🚀 Application is running on: http://localhost:${port}`);
    console.log(`🌍 CORS allowed for: ${frontendUrl}`);
}

bootstrap();