import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersResponseDTO } from '../../../users/dtos/users-response.dto';
import { AccessTokenPayload } from './interfaces/payload';

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
        const payload: AccessTokenPayload = {
            sub: dto.id,
            role: dto.role
        };

        return jwt.sign(payload, this.JWT_SECRET, {
            expiresIn: '10m',
            issuer: "UNI Colab Backend"
        });
    }

    // Verifica si el token de acceso corresponde a la firma del servidor
    verifyAccessToken(token: string): AccessTokenPayload {
        try {
            return jwt.verify(token, this.JWT_SECRET, {
                issuer: "UNI Colab Backend",
            }) as AccessTokenPayload;
        } catch {
            throw new UnauthorizedException({
                statusCode: 401,
                error: 'Unauthorized',
                message: 'Access token expired or invalid...'
            });
        }
    }
}