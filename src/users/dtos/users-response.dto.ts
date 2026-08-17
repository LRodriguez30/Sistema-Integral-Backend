import { Exclude, Expose } from "class-transformer";
import { UsersRole } from "../enums/users-role.enum";

@Exclude()
export class UsersResponseDTO {
    @Expose()
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    email!: string;

    @Exclude()
    password_hash!: string;

    @Expose()
    role!: string;

    @Expose({ groups: [
        UsersRole.Dueño,
        UsersRole.Admin
        ]
    })
    created_at!: string;

    @Expose({ groups: [
        UsersRole.Dueño,
        UsersRole.Admin
        ]
    })
    updated_at!: string;

    @Expose({ groups: [
        UsersRole.Dueño,
        UsersRole.Admin,
        UsersRole.Organizador,
        UsersRole.Visitante
        ]
    })
    last_login!: string;

    @Expose({ groups: [
        UsersRole.Dueño,
        UsersRole.Admin
        ]
    })
    token_version!: number;
}