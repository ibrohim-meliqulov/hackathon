import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { AnalyzeCropDto } from './dto/analyze-crop.dto';

@Injectable()
export class CropService {
    // Rasmdagi aniq URL (oxirida slash bo'lishi shart emas)
    private readonly apiUrl = 'https://crop.kindwise.com/api/v1/identification';

    // Sizning yangi kalitingiz
    private readonly apiKey = '9JSrwYXi3yumCZ1njsWkEPFO6eLE1VMdlwJR9subAliXtENieM';

    async analyzePlant(dto: AnalyzeCropDto) {
        try {
            const base64Data = dto.imageBase64.includes(',')
                ? dto.imageBase64.split(',')[1]
                : dto.imageBase64;

            const payload = {
                images: [base64Data],
                // Crop.health uchun qo'shimcha parametrlar shart emas
            };

            const response = await axios.post(this.apiUrl, payload, {
                headers: {
                    'Api-Key': this.apiKey,
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data.result;

            // Sog'lomlikni tekshirish
            if (result.is_healthy?.binary) {
                return "🌿 Ekin sog'lom ko'rinadi. Hech qanday jiddiy kasallik aniqlanmadi.";
            }

            // Kasallikni aniqlash
            const disease = result.disease_assessment?.suggestions?.[0];

            if (!disease) {
                return "🧐 Rasmda ekin aniqlandi, lekin kasallikni aniqlash imkoni bo'lmadi. Rasmni yaqinroqdan oling.";
            }

            return `
🟢 **Tahlil natijasi:**
🦠 **Kasallik:** ${disease.name}
📊 **Aniqroqlik:** ${(disease.probability * 100).toFixed(1)}%

💡 **Tavsiya:** Agronom bilan maslahatlashib, tegishli choralar ko'ring.
            `.trim();

        } catch (error) {
            // Agar API kalit xatosi bersa, terminalda ko'ramiz
            const detailedError = error.response?.data || error.message;
            console.error("DEBUG INFO:", detailedError);

            throw new InternalServerErrorException("Tahlil qilishda xatolik. API kalit aktivlashishini kuting.");
        }
    }
}