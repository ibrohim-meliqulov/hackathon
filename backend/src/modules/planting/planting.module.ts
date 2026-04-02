import { Module } from '@nestjs/common';
import { PlantingService } from './planting.service';
import { PlantingController } from './planting.controller';
import { PrismaService } from 'src/core/database/prisma.service';
import { PrismaModule } from 'src/core/database/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PlantingController],
  providers: [PlantingService, PrismaService],
})
export class PlantingModule { }