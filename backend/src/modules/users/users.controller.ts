import { Body, Controller, Post, } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from './dto/register.dto';




@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post('register')
    createUser(
        @Body() payload: RegisterDto,
    ) {
        return this.userService.createUser(payload,)
    }

}