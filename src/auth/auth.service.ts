import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dtos/login.dto';
import { JwtAccessService } from './jwt/access/access.service';
import { RefreshService } from './jwt/refresh/refresh.service';
import { RefreshTokensService } from './refresh_tokens/refresh_tokens.service';
import { RegisterDTO } from './dtos/register.dto';
import { CreateRefreshTokensDTO } from './refresh_tokens/dtos/create-refresh_tokens.dto';
import { PersonasService } from '../personas/personas.service';
import { MicrosoftService } from './microsoft.service';
import { CreatePersonasDTO } from '../personas/dtos/create-personas.dto';
// import { ProfilesService } from '../profiles/profiles.service';

/**
 * - Comparar `JWT_SECRET` del backend
 * ---
 * Servicios:
 * ``` typescript
 * async setAuthCookies(res: any, accessToken?: string, refreshToken?: string)
 * async registerUser(dto: RegisterDTO, requestInfo: { ipAddress: string; userAgent: string })
 * async loginUser(dto: LoginDTO, requestInfo: { ipAddress: string; userAgent: string })
 * async validateAccessToken(token: string)
 * async validateRefreshToken(token: string)
 * ```
 */
@Injectable()
export class AuthService {
    private readonly JWT_SECRET: string;

    constructor(
        private readonly microsoftService: MicrosoftService,

        private readonly usersService: UsersService,
        private readonly personasService: PersonasService,
        // private readonly profilesService: ProfilesService,
        private readonly jwtAccessService: JwtAccessService,
        private readonly jwtRefreshService: RefreshService,
        private readonly refreshTokensService: RefreshTokensService
    ) {
        // Verifica que exista una clave secreta antes de firmar
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET not defined...');
        }

        this.JWT_SECRET = process.env.JWT_SECRET;
    }

    async loginWithMicrosoft(
        code: string,
        metadata: {
            ipAddress: string;
            userAgent: string;
        },
    ) {

        // =====================================================
        // 1. Intercambiar authorization code por tokens
        // =====================================================

        const tokens =
            await this.microsoftService.getTokensFromCode(code);


        if (!tokens.accessToken) {
            throw new UnauthorizedException(
                'Microsoft no devolvió un access token...',
            );
        }


        // =====================================================
        // 2. Obtener información del usuario Microsoft
        // =====================================================

        const microsoftUser =
            await this.microsoftService.getMicrosoftUser(
                tokens.accessToken,
            );

        console.log(microsoftUser);

        const email =
            microsoftUser.mail ??
            microsoftUser.userPrincipalName;

        const primerNombre =
            microsoftUser.givenName?.trim().split(/\s+/)[0] ?? '';

        const primerApellido =
            microsoftUser.surname?.trim().split(/\s+/)[0] ?? '';


        if (!email) {
            throw new UnauthorizedException(
                'No se pudo obtener el correo de la cuenta Microsoft...',
            );
        }

        // =====================================================
        // 3. Buscar usuario en nuestra BD
        // =====================================================

        const user =
            await this.usersService.findByEmail(email, true);

        if (!user) {
            return {
                requiresRegistration: true,

                microsoft: {
                    id: microsoftUser.id,
                    email,
                },

                suggestedData: {
                    givenName: microsoftUser.givenName,
                    surname: microsoftUser.surname,
                    mobilePhone: microsoftUser.mobilePhone,
                },
            };
        }

        // =====================================================
        // 4. Si no existe, por ahora rechazamos el login
        // =====================================================

        if (!user) {
            throw new UnauthorizedException(
                'No existe un usuario registrado con esta cuenta Microsoft...',
            );
        }


        // =====================================================
        // 5. Generar access token propio
        // =====================================================

        const accessToken =
            this.jwtAccessService.generateAccessToken(user);


        // =====================================================
        // 6. Generar refresh token propio
        // =====================================================

        const refreshTokenHash =
            this.jwtRefreshService.generateRefreshToken(user);


        // =====================================================
        // 7. Configurar expiración
        // =====================================================

        const now = new Date();

        const expiresAt =
            new Date(
                now.getTime() +
                7 * 24 * 60 * 60 * 1000,
            );


        // =====================================================
        // 8. Guardar refresh token en BD
        // =====================================================

        const newRefreshToken =
            new CreateRefreshTokensDTO();


        newRefreshToken.user_id =
            user.id;

        newRefreshToken.token_hash =
            refreshTokenHash;

        newRefreshToken.device_info = {
            ipAddress:
                metadata.ipAddress,

            userAgent:
                metadata.userAgent,
        };

        newRefreshToken.expires_at =
            expiresAt.toISOString();

        newRefreshToken.revoked =
            false;


        const refreshToken =
            await this.refreshTokensService.upsert(
                newRefreshToken,
            );


        // =====================================================
        // 9. Devolver exactamente lo mismo que loginUser()
        // =====================================================

        return {
            user,
            accessToken,
            refreshToken,
        };
    }


    // Establece las cookies que llegaran al cliente
    setAuthCookies(res: any, accessToken?: string, refreshToken?: string) {
        if (accessToken) {
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                maxAge: 10 * 60 * 1000, // 10 minutos
                sameSite: 'lax'
            })
        }

        if (refreshToken) {
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 8 * 24 * 60 * 60 * 1000, // 7 días
                sameSite: 'lax'
            })
        }
    }

    // Registra al usuario guardando toda la información necesaria
    async registerUser(
        dto: RegisterDTO,
        requestInfo: { ipAddress: string; userAgent: string }
    ) {
        const persona = await this.personasService.create(dto.persona);
        const user = await this.usersService.create(dto.user, persona.persona_id);

        const accessToken = this.jwtAccessService.generateAccessToken(user);
        const refreshTokenHash = this.jwtRefreshService.generateRefreshToken(user);

        const now = new Date();
        const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const newRefreshToken = new CreateRefreshTokensDTO();

        newRefreshToken.user_id = user.usuario_id;
        newRefreshToken.token_hash = refreshTokenHash;
        newRefreshToken.device_info = {
            ...dto.device_info,
            ipAddress: requestInfo.ipAddress,
            userAgent: requestInfo.userAgent,
        };
        newRefreshToken.expires_at = expiresAt.toISOString();
        newRefreshToken.revoked = false;

        const refreshToken = await this.refreshTokensService.upsert(newRefreshToken);

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    // Identifica nuevamente al usuario y actualiza la información guardada
    async loginUser(
        dto: LoginDTO,
        requestInfo: { ipAddress: string; userAgent: string }
    ) {
        const user = await this.usersService.findByEmail(dto.correo_electronico, false);

        const valid = await bcrypt.compare(dto.contraseña, user.contraseña.toString());
        if (!valid) throw new UnauthorizedException('Contraseña incorrecta...');

        const accessToken = this.jwtAccessService.generateAccessToken(user);
        const refreshTokenHash = this.jwtRefreshService.generateRefreshToken(user);

        const now = new Date();
        const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const newRefreshToken = new CreateRefreshTokensDTO();

        newRefreshToken.user_id = user.usuario_id;
        newRefreshToken.token_hash = refreshTokenHash;
        newRefreshToken.device_info = {
            ...dto.device_info,
            ipAddress: requestInfo.ipAddress,
            userAgent: requestInfo.userAgent,
        };
        newRefreshToken.expires_at = expiresAt.toISOString();
        newRefreshToken.revoked = false;

        const refreshToken = await this.refreshTokensService.upsert(newRefreshToken);

        return {
            user,
            accessToken,
            refreshToken
        };
    }

    // Valida que el token de acceso es válido y devuelve al usuario identificado
    async validateAccessToken(token: string) {
        const payload = this.jwtAccessService.verifyAccessToken(token);
        const userInDB = await this.usersService.findById(payload.sub);

        const personaInDB = await this.personasService.findById(userInDB.persona_id);
        // const profileInDB = await this.profilesService.getByUserId(payload.sub);

        return { user: userInDB, persona: personaInDB };
    }

    // Valida que el token de recuperación es válido y devuelve al usuario identificado
    async validateRefreshToken(token: string) {
        const payload = this.jwtRefreshService.verifyRefreshToken(token);
        const refreshTokenInDB = await this.refreshTokensService.checkRefreshTokenInDB(payload);

        const userInDB = await this.usersService.findById(payload.sub);

        if (payload.token_version.toString() !== undefined && refreshTokenInDB.token_version.toString() !== payload.token_version.toString()) {
            throw new UnauthorizedException({
                message: 'Invalid refresh token version...',
                errorCode: 401005
            });
        }

        return userInDB;
    }
}