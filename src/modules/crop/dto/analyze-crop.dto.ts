import { IsNotEmpty, IsString } from 'class-validator';

export class AnalyzeCropDto {
    @IsNotEmpty()
    @IsString()
    imageBase64: string;

    @IsNotEmpty()
    @IsString()
    plantType: string = 'poliz';
}