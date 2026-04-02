// src/modules/crop/voice.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VoiceService {
    private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // 🎤 Ovoz → Matn (Whisper)
    async speechToText(audioBuffer: Buffer): Promise<string> {
        const tempPath = path.join('/tmp', `voice_${Date.now()}.webm`);

        try {
            fs.writeFileSync(tempPath, audioBuffer);

            const result = await this.openai.audio.transcriptions.create({
                file: fs.createReadStream(tempPath),
                model: 'whisper-1',
                // language: 'uz',
            });

            return result.text;
        } catch (e) {
            throw new InternalServerErrorException('Ovozni matnga aylantirishda xatolik');
        } finally {
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
    }

    // 🔊 Matn → Ovoz (TTS)
    async textToSpeech(text: string): Promise<string> {
        try {
            const mp3 = await this.openai.audio.speech.create({
                model: 'tts-1',
                voice: 'alloy',
                input: text,
            });

            const buffer = Buffer.from(await mp3.arrayBuffer());
            return buffer.toString('base64');
        } catch (e) {
            throw new InternalServerErrorException('Matnni ovozga aylantirishda xatolik');
        }
    }



    async speechToTextFromBase64(audioBase64: string): Promise<string> {
        console.log('STT boshlandi, audio uzunligi:', audioBase64.length);
        const tempPath = path.join('/tmp', `voice_${Date.now()}.webm`);

        try {
            const buffer = Buffer.from(audioBase64, 'base64');
            console.log('Buffer yaratildi:', buffer.length);
            fs.writeFileSync(tempPath, buffer);
            console.log('Fayl yozildi:', tempPath);

            const result = await this.openai.audio.transcriptions.create({
                file: fs.createReadStream(tempPath),
                model: 'whisper-1',
                // language: 'uz',
            });

            console.log('STT natija:', result.text);
            return result.text;
        } catch (e) {
            console.error('STT xatolik:', e); // ← aniq xatolik
            throw new InternalServerErrorException('Ovozni matnga aylantirishda xatolik');
        } finally {
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
    }
}