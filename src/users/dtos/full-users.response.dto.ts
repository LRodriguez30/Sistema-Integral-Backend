import { Exclude, Expose } from "class-transformer";
import { UsersRole } from "../enums/users-role.enum";
import { CreatePersonasDTO } from "../../personas/dtos/create-personas.dto";
import { CreateUsersDTO } from "./create-users.dto";

@Exclude()
export class FullUserResponseDTO {
    @Expose()
    persona!: CreatePersonasDTO;

    @Expose()
    usuario!: CreateUsersDTO;
}