// deploy-guard.dto.ts
import { IsEnum, IsOptional, IsDateString } from 'class-validator';

export enum ShiftType {
    DAY = 'DAY',
    NIGHT = 'NIGHT'
}

export class DeployGuardDto {
    @IsEnum(ShiftType, { message: 'Shift must be either DAY or NIGHT' })
    shift: ShiftType;

    @IsOptional()
    @IsDateString()
    startDate?: string;
}