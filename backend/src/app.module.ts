import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CropModule } from './modules/crop/crop.module';
import { UsersModule } from './modules/users/users.module';
import { PlantingModule } from './modules/planting/planting.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, CropModule, UsersModule, PlantingModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
