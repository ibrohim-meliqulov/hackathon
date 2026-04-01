import { Module } from '@nestjs/common';
import { CropController } from './crop.controller';
import { CropService } from './crop.service';
import { PrismaService } from 'src/core/database/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CropController],
  providers: [CropService, PrismaService],
})
export class CropModule { }