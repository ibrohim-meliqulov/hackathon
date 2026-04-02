import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TelegramAuthDto } from './dto/telegram-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() payload: LoginDto) {
        return this.authService.login(payload);
    }

    @Post('telegram')
    telegramAuth(@Body() dto: TelegramAuthDto) {
        return this.authService.telegramAuth(dto);
    }
}