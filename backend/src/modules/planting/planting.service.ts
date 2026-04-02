import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePlantingDto } from './dto/planting-dto';
import { PrismaService } from 'src/core/database/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class PlantingService implements OnModuleInit {
    private openai: OpenAI;

    constructor(private prisma: PrismaService) { }

    onModuleInit() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    private async getFullAdvice(
        name: string,
        type: string,
        plantedDate: Date,
        region: string,
        area: number
    ): Promise<{
        harvestDate: Date;
        advice: string;
        expectedYield: string;
        seedAmount: string;
        estimatedProfit: string;
    }> {

        const prompt = `Sen O'zbekistondagi tajribali agronom eksertsan.
Dehqon quyidagi ma'lumotlarni kiritdi:
- Ekin: "${name}"
- Turi/navi: "${type}"
- Ekilgan sana: ${plantedDate.toISOString().split('T')[0]}
- Viloyat: "${region}"
- Yer maydoni: ${area} sotix (1 sotix = 100 m², ${area * 100} m²)

Quyidagi ma'lumotlar asosida hisob qil:

YETILISH MUDDATLARI (kun):
- ko'k piyoz: 45, piyoz: 120, kartoshka: 90, pomidor: 75
- bodring: 55, tarvuz: 90, bug'doy: 120, sabzi: 80
- karam: 100, qalampir: 80, baqlajon: 75, qovoqcha: 50
- qovoq: 100, qovun: 85, sarimsoq: 120, turp: 30
- lavlagi: 90, ismaloq: 40, salat: 45, makkajo'xori: 90
- loviya: 60, no'xat: 70, kungaboqar: 100, paxta: 150
- sholi: 130, uzum: 365, o'rik: 120, shaftoli: 120
- anor: 180, kunjut: 100, beda: 60, tamaki: 90

SOTIXDAN HOSIL (kg):
- kartoshka: 350, pomidor: 500, bodring: 400, piyoz: 250
- ko'k piyoz: 65, sabzi: 250, karam: 350, qalampir: 200
- baqlajon: 275, tarvuz: 650, qovun: 500, makkajo'xori: 200
- bug'doy: 140, paxta: 100, sholi: 200, uzum: 300

URUG' MIQDORI (1 sotixga):
- kartoshka: 25-30 kg urug'lik, pomidor: 20-25 dona ko'chat
- bodring: 5-7 g urug', piyoz: 8-10 g urug'
- ko'k piyoz: 10-15 g urug', sabzi: 2-3 g urug'
- karam: 15-20 dona ko'chat, qalampir: 15-20 dona ko'chat
- baqlajon: 15-20 dona ko'chat, tarvuz: 3-5 g urug'
- qovun: 3-5 g urug', makkajo'xori: 300-400 g urug'
- bug'doy: 1.5-2 kg urug', paxta: 3-4 kg urug'
- sholi: 2-3 kg urug', sarimsoq: 1-1.5 kg urug'

BOZOR NARXLARI (so'm/kg, taxminiy):
- kartoshka: 3000-5000, pomidor: 5000-8000, bodring: 4000-6000
- piyoz: 2000-4000, ko'k piyoz: 3000-5000, sabzi: 3000-5000
- karam: 2000-3000, qalampir: 8000-12000, baqlajon: 4000-7000
- tarvuz: 2000-4000, qovun: 3000-6000, makkajo'xori: 3000-5000
- bug'doy: 2500-3500, paxta: 4000-6000, sholi: 4000-7000
- uzum: 8000-15000, o'rik: 5000-10000, anor: 10000-18000

VILOYAT OB-HAVOSI:
- Toshkent: kontinental, issiq yoz, sovuq qish, o'rtacha yog'in
- Samarqand: kontinental, issiq quruq yoz, yumshoq qish
- Farg'ona: issiq kontinental, juda issiq yoz, unumdor vodiy
- Andijon: issiq kontinental, unumdor, sabzavot uchun yaxshi
- Namangan: issiq kontinental, meva uchun yaxshi
- Buxoro: quruq, juda issiq va qurg'oqchil, sug'orish zarur
- Qashqadaryo: yarim quruq, issiq yoz
- Surxondaryo: eng issiq viloyat, subtropik, erta hosil
- Xorazm: quruq, kontinental, ko'p sug'orish kerak
- Navoiy: cho'l iqlimi, quruq
- Jizzax: yarim quruq, issiq yoz
- Sirdaryo: kontinental, o'rtacha
- Qoraqalpog'iston: quruq, kontinental

Faqat JSON formatida javob ber, boshqa hech narsa yozma:
{
  "daysToHarvest": <son>,
  "harvestDate": "<YYYY-MM-DD>",
  "seedAmount": "<${area} sotix uchun kerakli urug' miqdori, masalan: 125-150 kg urug'lik kartoshka kerak>",
  "expectedYield": "<${area} sotix yerdan taxminan X-Y kg hosil olish mumkin>",
  "estimatedProfit": "<taxminiy daromad: X-Y so'm (bozor narxi: X so'm/kg asosida)>",
  "advice": "<${region} viloyati iqlimini hisobga olib: 1) Sug'orish: qachon va qancha; 2) O'g'itlash: qanday va qachon; 3) Kasallik va zararkunandalardan himoya. Hammasi 4-5 jumlada, aniq va tushunarli>"
}`;

        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 600,
                temperature: 0,
            });

            const text = response.choices[0].message.content || '';
            const clean = text.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(clean);

            return {
                harvestDate: new Date(parsed.harvestDate),
                advice: parsed.advice,
                expectedYield: parsed.expectedYield,
                seedAmount: parsed.seedAmount,
                estimatedProfit: parsed.estimatedProfit,
            };
        } catch (e) {
            const fallback = new Date(plantedDate);
            fallback.setDate(fallback.getDate() + 90);
            return {
                harvestDate: fallback,
                advice: 'Maslahat olishda xatolik yuz berdi.',
                expectedYield: 'Hisoblashda xatolik yuz berdi.',
                seedAmount: 'Hisoblashda xatolik yuz berdi.',
                estimatedProfit: 'Hisoblashda xatolik yuz berdi.',
            };
        }
    }

    async create(dto: CreatePlantingDto, userId: number) {
        const plantedDate = new Date(dto.plantedDate);

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { region: true }
        });

        const region = user?.region || 'Toshkent';

        const { harvestDate, advice, expectedYield, seedAmount, estimatedProfit } =
            await this.getFullAdvice(dto.name, dto.type, plantedDate, region, dto.area);

        return this.prisma.planting.create({
            data: {
                name: dto.name,
                type: dto.type,
                plantedDate,
                area: dto.area,
                harvestDate,
                advice,
                expectedYield,
                seedAmount,
                estimatedProfit,
                userId,
            },
        });
    }

    async findAll(userId: number) {
        return this.prisma.planting.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: number, userId: number) {
        return this.prisma.planting.findFirst({
            where: { id, userId },
        });
    }
}