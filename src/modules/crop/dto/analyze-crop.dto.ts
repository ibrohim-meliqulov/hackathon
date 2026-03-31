import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class AnalyzeCropDto {
    @IsNotEmpty()
    @IsString()
    imageBase64: string;

    @IsNotEmpty()
    @IsString()
    plantType: string = 'poliz';

    @IsOptional()
    @IsString()
    @IsIn(['uz', 'ru'])
    lang?: string = 'uz';
}