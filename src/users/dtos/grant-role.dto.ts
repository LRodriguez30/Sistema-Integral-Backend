import { IsEnum, IsUUID } from "class-validator";
import { UsersRole } from "../enums/users-role.enum";

export class GrantRole {
    @IsUUID()
    id!: string;

    @IsEnum(UsersRole)
    role!: UsersRole;
}