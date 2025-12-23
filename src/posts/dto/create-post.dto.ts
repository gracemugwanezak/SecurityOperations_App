import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsNumber()
    @IsNotEmpty()
    clientId: number; // The parent Client ID
}