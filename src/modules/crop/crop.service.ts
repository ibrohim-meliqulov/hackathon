import { Injectable, OnModuleInit, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import { AnalyzeCropDto } from './dto/analyze-crop.dto';

@Injectable()
export class CropService implements OnModuleInit {
    private openai: OpenAI;

    onModuleInit() {
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            console.error("❌ XATO: .env faylida OPENAI_API_KEY topilmadi!");
            return;
        }

        this.openai = new OpenAI({
            apiKey: apiKey,
        });

        console.log("✅ OpenAI muvaffaqiyatli ulandi.");
    }

    async analyzePlant(dto: AnalyzeCropDto) {
        try {
            if (!this.openai) {
                throw new InternalServerErrorException("AI xizmati vaqtincha mavjud emas.");
            }

            const base64Data = dto.imageBase64.includes(',')
                ? dto.imageBase64.split(',')[1]
                : dto.imageBase64;

            const language = dto.lang || 'uz';

            const prompt = language === 'ru'
                ? `Вы профессиональный агроном-фитопатолог. 
                   Внимательно изучите форму листьев и пятна на фото. 
                   Определите вид растения и болезнь. 
                   Дайте краткий ответ в следующем формате:
                   🌿 **Растение:** [Название]
                   🦠 **Диагноз:** [Название болезни]
                   📊 **Уверенность:** [0-100%]
                   💡 **Причина:** [Краткое описание]
                   💊 **Рекомендация:** [Конкретные фунгициды, доступные в СНГ]
                   Ответ дайте строго на РУССКОМ языке.`
                : `Siz professional agronom-fitopatologsiz. 
                   Rasmga diqqat bilan qarab, barg shakli va dog'lardan o'simlik turini hamda kasalligini aniqlang. 
                   Qisqa va aniq javob bering:
                   🌿 **O'simlik:** [Nomi]
                   🦠 **Kasallik:** [Nomi]
                   📊 **Ishonch darajasi:** [0-100%]
                   💡 **Sababi:** [Qisqa izoh]
                   💊 **Tavsiya:** [O'zbekistonda mavjud dori nomlari (fungitsidlar)]
                   Javob faqat O'ZBEK tilida bo'lsin.`;

            const response = await this.openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: [
                            { type: "text", text: prompt },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:image/jpeg;base64,${base64Data}`,
                                    detail: "high"
                                },
                            },
                        ],
                    },
                ],
                max_tokens: 600,
            });

            return response.choices[0].message.content;

        } catch (error: any) {
            console.error("OpenAI API xatosi:", error.message);

            return dto.lang === 'ru'
                ? "⚠️ Ошибка при анализе. Пожалуйста, попробуйте позже."
                : "⚠️ Tahlil qilishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.";
        }
    }
}