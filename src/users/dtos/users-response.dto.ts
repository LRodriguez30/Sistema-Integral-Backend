import { Exclude, Expose } from "class-transformer";
import { UsersRole } from "../enums/users-role.enum";

@Exclude()
export class UsersResponseDTO {
    @Expose()
    usuario_id!: number;

    @Expose()
    persona_id!: number;

    @Expose()
    nombre_usuario!: string;

    @Expose()
    correo_electronico!: string;

    @Exclude()
    contraseña!: string;

    @Expose()
    rol_id!: number;

    @Expose()
    estado!: boolean;
}