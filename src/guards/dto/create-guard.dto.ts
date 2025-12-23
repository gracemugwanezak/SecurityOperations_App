// create-guard.dto.ts
import { IsString, IsNumberString, Length, IsNotEmpty } from 'class-validator';

export class CreateGuardDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumberString()
    @Length(16, 16, { message: 'ID Number must be exactly 16 digits' })
    idNumber: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string; // ✅ This matches your form's "phoneNumber" key

    @IsString()
    @IsNotEmpty()
    homeResidence: string;
}