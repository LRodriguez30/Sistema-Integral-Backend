import { Type } from "class-transformer";
import { PersonasResponseDTO } from "../../personas/dtos/personas-response.dto";
import { UsersResponseDTO } from "../../users/dtos/users-response.dto";

/**
 * Datos que el usuario solicita de si mismo:
 * - Perfil como persona
 * - Información de usuario registrado
 */
export class MeDTO {
  @Type(() => PersonasResponseDTO)
  persona!: PersonasResponseDTO;

  @Type(() => UsersResponseDTO)
  user!: UsersResponseDTO;
}