import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CropService } from './crop.service';
import { AnalyzeCropDto } from './dto/analyze-crop.dto';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from '@prisma/client';
import { VoiceService } from './voice.service';
import { AnalyzeVoiceQuestionDto } from './dto/analyze-voice-question.dto';

@Controller('crop')
export class CropController {
    constructor(private cropService: CropService,
        private voiceService: VoiceService
    ) { }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.USER, UserRole.SUPERADMIN)
    @Post('analyze')
    async analyze(@Body() dto: AnalyzeCropDto) {
        const result = await this.cropService.analyzePlant(dto);
        return { success: true, data: result };
    }



    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.USER, UserRole.SUPERADMIN)
    @Post('analyze/voice')
    async analyzeWithVoice(@Body() dto: AnalyzeCropDto) {
        const result = await this.cropService.analyzePlant(dto);
        const textResult = result ?? "Tahlil natijasi topilmadi";
        const audioBase64 = await this.voiceService.textToSpeech(textResult);

        return {
            success: true,
            data: {
                text: textResult,
                audio: audioBase64,
            },
        };
    }



    @UseGuards(AuthGuard, RoleGuard)
    @Roles(UserRole.USER, UserRole.SUPERADMIN)
    @Post('analyze/voice-question')
    async analyzeVoiceQuestion(@Body() dto: AnalyzeVoiceQuestionDto) {


        console.log('DTO keldi:', {
            hasImage: !!dto.imageBase64,
            hasAudio: !!dto.audioBase64,
            audioLength: dto.audioBase64?.length,
            lang: dto.lang,
        });
        // 1. Dehqon ovozini matnga aylantir
        const question = await this.voiceService.speechToTextFromBase64(dto.audioBase64);

        // 2. Rasm + savol birga tahlil
        const textResult = await this.cropService.analyzePlantWithQuestion(
            dto.imageBase64,
            question,
            dto.lang || 'uz',
        );

        const answer = textResult ?? 'Tahlil natijasi topilmadi';

        // 3. Javobni ovozga aylantir
        const audioBase64 = await this.voiceService.textToSpeech(answer);

        return {
            success: true,
            data: {
                userQuestion: question,  // dehqon nima dedi
                text: answer,            // matnli javob
                audio: audioBase64,      // ovozli javob
            },
        };
    }



}