import { Controller, Post, Body, Res, Req, HttpCode, Get, UnauthorizedException, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { UsersResponseDTO } from '../users/dtos/users-response.dto';
import { RegisterDTO } from './dtos/register.dto';
import { MicrosoftService } from './microsoft.service';
import type { Response } from 'express';
import { MeDTO } from './dtos/me.dto';
// import { ProfilesResponseDTO } from '../profiles/dtos/profiles-response.dto';

/**
 * Endpoints para manipular datos de los tokens de recuperación
 * - GET
 * ``` typescript
 *   - getMe()
 * ```
 * - POST
 * ``` typescript
 *   - register(dto: RegisterDTO)
 *   - login(dto: LoginDTO)
 *   - logout()
 * ```
 */

// RUTA PRINCIPAL DE AUTENTICACIÓN
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly microsoftService: MicrosoftService
    ) { }


    @Get('microsoft')
    async microsoftLogin(
        @Res() response: Response,
    ) {
        const url =
            await this.microsoftService.getAuthorizationUrl();

        return response.redirect(url);
    }

    @Get('microsoft/callback')
    async microsoftCallback(
        @Query() query: Record<string, string>,
        @Req() req,
        @Res({ passthrough: true }) res: Response,
    ) {

        console.log('Microsoft callback query:', query);

        const code = query.code;

        console.log('Authorization code:', code);

        if (!code) {
            throw new UnauthorizedException(
                'Microsoft no devolvió un authorization code...',
            );
        }

        const result = await this.authService.loginWithMicrosoft(
            code,
            {
                ipAddress: req.ip,
                userAgent: req.headers['user-agent'],
            },
        );

        if (result.requiresRegistration) {
            return result;
        }

        this.authService.setAuthCookies(
            res,
            result.accessToken,
            result.refreshToken,
        );

        return plainToInstance(
            UsersResponseDTO,
            result.user,
        );
    }

    @Get('me')
    async getMe(@Req() req) {
        console.log('Verificando sesión actual...');

        const accessToken = req.cookies?.accessToken;

        if (!accessToken) {
            throw new UnauthorizedException(
                'No hay una sesión autenticada...'
            );
        }

        const { user, persona } = await this.authService.validateAccessToken(
            accessToken
        );

        const me = {
            persona: persona,
            user: user
        } as MeDTO

        return plainToInstance(
            MeDTO,
            me
        );
    }

    @Post('register')
    async register(
        @Req() req,
        @Res({ passthrough: true }) res,
        @Body() dto: RegisterDTO
    ) {
        console.log('Se está registrando un nuevo usuario...');

        const { user, accessToken, refreshToken } = await this.authService.registerUser(
            dto,
            {
                ipAddress: req.ip,
                userAgent: req.headers['user-agent'],
            }
        );

        this.authService.setAuthCookies(res, accessToken, refreshToken);

        return plainToInstance(
            UsersResponseDTO,
            user
        );
    }

    @Post('login')
    @HttpCode(200)
    async login(
        @Req() req,
        @Res({ passthrough: true }) res,
        @Body() dto: LoginDTO
    ) {
        console.log('Se está iniciando sesión con el usuario actual...');

        const { user, accessToken, refreshToken } = await this.authService.loginUser(
            dto,
            {
                ipAddress: req.ip,
                userAgent: req.headers['user-agent'],
            }
        );

        this.authService.setAuthCookies(res, accessToken, refreshToken);

        return plainToInstance(
            UsersResponseDTO,
            user
        );
    }

    @Post('logout')
    logout(@Res() res) {
        console.log("Cerrando sesión del usuario actual...");

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return res.send({ ok: true });
    }
}