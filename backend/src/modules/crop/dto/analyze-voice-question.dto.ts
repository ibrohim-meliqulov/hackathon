import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class AnalyzeVoiceQuestionDto {
    @IsNotEmpty()
    @IsString()
    imageBase64: string;

    @IsNotEmpty()
    @IsString()
    audioBase64: string;

    @IsOptional()
    @IsString()
    plantType?: string = 'poliz';

    @IsOptional()
    @IsIn(['uz', 'ru'])
    lang?: string = 'uz';
}