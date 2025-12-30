// create-guard.dto.ts
import { IsString, IsNumberString, Length, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGuardDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumberString()
    // Adjusted to be exactly 16 if that is your national requirement
    @Length(16, 16, { message: 'ID Number must be exactly 16 digits' })
    idNumber: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    homeResidence: string;

    // Optional: If you want to allow setting a profile image or status during creation
    @IsOptional()
    @IsString()
    status?: string;
}