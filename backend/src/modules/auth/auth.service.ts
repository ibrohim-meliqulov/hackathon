import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { TelegramAuthDto } from './dto/telegram-auth.dto';
import { checkPassword } from 'src/core/utils/bcrypt';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async login(payload: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { phone: payload.phone },
        });
        if (!user) throw new UnauthorizedException('Unauthorized');

        const match = await checkPassword(payload.password, user.password);
        if (!match) throw new UnauthorizedException('Password or phone number wrong');

        const accessToken = this.jwtService.sign({ id: user.id, role: user.role });
        return {
            accessToken,
            success: true,
            message: "You logged in successfully"
        };
    }

    async telegramAuth(dto: TelegramAuthDto) {
        let user = await this.prisma.user.findUnique({
            where: { telegramId: dto.telegramId }
        });

        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    telegramId: dto.telegramId,
                    name: dto.firstName,
                    username: dto.username || `user_${dto.telegramId}`,
                    role: UserRole.USER,
                }
            });
        }

        const accessToken = this.jwtService.sign({ id: user.id, role: user.role });
        return {
            accessToken,
            success: true,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
            }
        };
    }
}