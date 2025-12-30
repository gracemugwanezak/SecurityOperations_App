import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsNumber()
    @IsNotEmpty()
    clientId: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    requiredDayGuards?: number; // Optional in DTO, but has DB default

    @IsNumber()
    @Min(0)
    @IsOptional()
    requiredNightGuards?: number;
}