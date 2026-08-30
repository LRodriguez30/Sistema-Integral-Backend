import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersResponseDTO } from '../../../users/dtos/users-response.dto';
import { AccessTokenPayload, SecAccessTokenPayload } from './interfaces/payload';

/**
 * - Firmado con `JWT_SECRET`
 * ---
 * Servicios:
 * ``` typescript
 * generateAccessToken(dto: UsersResponseDTO): string
 * verifyAccessToken(token: string): SecAccessTokenPayload
 * ```
 */
@Injectable()
export class JwtAccessService {
    private readonly JWT_SECRET: string;


    constructor() {
        // Verificamos que la clave secreta existe para poder firmar
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET not defined...');
        }

        this.JWT_SECRET = process.env.JWT_SECRET;
    }

    // Crea un token de acceso que es válido por 10 minutos
    generateAccessToken(dto: UsersResponseDTO): string {
        const payload: SecAccessTokenPayload = {
            sub: dto.persona_id,
            rol_id: dto.rol_id
        };

        return jwt.sign(payload, this.JWT_SECRET, {
            expiresIn: '10m',
            issuer: "Sistema Integral Backend"
        });
    }

    // Verifica si el token de acceso corresponde a la firma del servidor
    verifyAccessToken(token: string): SecAccessTokenPayload {
        try {
            return jwt.verify(token, this.JWT_SECRET, {
                issuer: "Sistema Integral Backend",
            }) as SecAccessTokenPayload;
        } catch {
            throw new UnauthorizedException({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Access token expired or invalid...'
            });
        }
    }
}