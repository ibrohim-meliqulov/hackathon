import { IsDate, IsPhoneNumber, IsString } from "class-validator";
import { Type } from "class-transformer";


export class RegisterDto {
    @IsPhoneNumber("UZ")
    phone: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    surname: string;

    // @IsDate()
    // @Type(() => Date)
    // birth_date: Date;

    @IsString()
    region: string;
}