import { IsDate, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    phone: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsDate()
    birth_date: Date;

    @IsString()
    region: string;
}