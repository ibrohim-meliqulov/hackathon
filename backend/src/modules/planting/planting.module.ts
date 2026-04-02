import { Module } from '@nestjs/common';
import { PlantingService } from './planting.service';
import { PlantingController } from './planting.controller';
import { PrismaService } from 'src/core/database/prisma.service';
import { PrismaModule } from 'src/core/database/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, AuthModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    })
  ],
  controllers: [PlantingController],
  providers: [PlantingService, PrismaService],
})
export class PlantingModule { }