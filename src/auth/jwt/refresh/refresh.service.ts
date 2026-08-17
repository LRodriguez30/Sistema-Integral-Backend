import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersResponseDTO } from '../../../users/dtos/users-response.dto';
import { RefreshTokenPayload } from './interfaces/payload';

@Injectable()
export class RefreshService {
    private readonly REFRESH_SECRET: string;
      
    constructor() {
        // Verificar que exista una clave secreta antes de firmar
        if (!process.env.REFRESH_SECRET) {
            throw new Error('REFRESH_SECRET not defined...')
        }

        this.REFRESH_SECRET = process.env.REFRESH_SECRET;
    }

    // Crear un token de recuperación que es válido por 7 días
    generateRefreshToken(dto: UsersResponseDTO) {
        const payload: RefreshTokenPayload = {
            sub: dto.id,
            tokenVersion: dto.token_version
        };

        return jwt.sign(payload, this.REFRESH_SECRET, {
            expiresIn: '7d',
            issuer: "UNI Colab Backend"
        });
    }
        
    // Verifica si el token de recuperación corresponde a la firma del servidor
    verifyRefreshToken(token: string): RefreshTokenPayload {
        try {
            return jwt.verify(token, this.REFRESH_SECRET, {
                issuer: "UNI Colab Backend"
            }) as RefreshTokenPayload;
        } catch {
            throw new UnauthorizedException({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Refresh token expired or invalid...'
            });
        }
    }
}