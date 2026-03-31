import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { hashPassword } from 'src/core/utils/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async createUser(payload: RegisterDto) {

        const hashPass = await hashPassword(payload.password)

        const user = await this.prisma.user.create({
            data: {
                ...payload,
                password: hashPass,
                birth_date: new Date(payload.birth_date),
                role: UserRole.USER
            }
        })

        const accessToken = await this.jwtService.sign({ id: user.id, phone: user.phone, role: user.role })

        return {
            success: true,
            message: "You registered",
            toke: accessToken
        }
    }


}