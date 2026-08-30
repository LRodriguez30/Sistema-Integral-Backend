import { IsEnum, IsNumber, IsUUID } from "class-validator";
import { UsersRole } from "../enums/users-role.enum";

export class GrantRole {
    @IsNumber()
    id!: number;

    @IsEnum(UsersRole)
    rol!: UsersRole;
}