import { IsString, IsEmail, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail({}, { message: 'email must be a valid email address' })
    email: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    // Added for Contract Tracking
    @IsDateString()
    @IsNotEmpty()
    contractStart: string;

    @IsDateString()
    @IsNotEmpty()
    contractEnd: string;
}