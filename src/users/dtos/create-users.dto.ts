import { IsEmail, IsEnum, IsString, MinLength } from "class-validator";
import { UsersRole } from "../enums/users-role.enum";

export class CreateUsersDTO {
    @IsString()
    @MinLength(2)
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(8)
    password_hash!: string;

    @IsEnum(UsersRole)
    role!: UsersRole;
}