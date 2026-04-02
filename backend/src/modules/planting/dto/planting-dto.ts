import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreatePlantingDto {
    @IsString()
    name: string;

    @IsString()
    type: string;

    @IsDateString()
    plantedDate: string;

    @IsNumber()
    area: number;
}