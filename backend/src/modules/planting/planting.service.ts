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

    private async getHarvestDate(name: string, type: string, plantedDate: Date): Promise<Date> {
        const prompt = `You are an agronomist expert.
Crop: "${name}", type: "${type}", planted: ${plantedDate.toISOString().split('T')[0]}.

Growing days reference:
- green onion (ko'k piyoz): 45 days
- bulb onion (piyoz): 120 days
- potato (kartoshka): 90 days
- tomato (pomidor): 75 days
- cucumber (bodring): 55 days
- watermelon (tarvuz): 90 days
- wheat (bug'doy): 120 days
- carrot (sabzi): 80 days
- cabbage (karam): 100 days
- pepper (qalampir): 80 days
- eggplant (baqlajon): 75 days
- zucchini (qovoqcha): 50 days
- pumpkin (qovoq): 100 days
- melon (qovun): 85 days
- garlic (sarimsoq): 120 days
- radish (turp): 30 days
- beetroot (lavlagi): 90 days
- spinach (ismaloq): 40 days
- lettuce (salat): 45 days
- corn (makkajo'xori): 90 days
- bean (loviya): 60 days
- pea (no'xat): 70 days
- sunflower (kungaboqar): 100 days
- cotton (paxta): 150 days
- rice (sholi): 130 days
- grape (uzum): 365 days
- apple (olma): 548 days
- apricot (o'rik): 120 days
- peach (shaftoli): 120 days
- fig (anjir): 150 days
- pomegranate (anor): 180 days
- sesame (kunjut): 100 days
- sorghum (jo'xori): 110 days
- alfalfa (beda): 60 days
- tobacco (tamaki): 90 days

Calculate harvestDate by adding correct days to planted date.
Reply ONLY with JSON: {"daysToHarvest": <number>, "harvestDate": "<YYYY-MM-DD>"}`;

        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 100,
                temperature: 0,
            });

            const text = response.choices[0].message.content || '';
            const clean = text.replace(/```json|```/g, '').trim();
            const parsed = JSON.parse(clean);
            return new Date(parsed.harvestDate);
        } catch (e) {
            const fallback = new Date(plantedDate);
            fallback.setDate(fallback.getDate() + 90);
            return fallback;
        }
    }

    async create(dto: CreatePlantingDto, userId: number) {
        const plantedDate = new Date(dto.plantedDate);
        const harvestDate = await this.getHarvestDate(dto.name, dto.type, plantedDate);

        return this.prisma.planting.create({
            data: {
                name: dto.name,
                type: dto.type,
                plantedDate,
                area: dto.area,
                harvestDate,
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