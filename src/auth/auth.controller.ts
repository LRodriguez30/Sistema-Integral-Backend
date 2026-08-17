import { Controller, Post, Body, Res, Req, HttpCode, Get, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { UsersResponseDTO } from '../users/dtos/users-response.dto';
import { RegisterDTO } from './dtos/register.dto';
// import { ProfilesResponseDTO } from '../profiles/dtos/profiles-response.dto';

// RUTA PRINCIPAL DE AUTENTICACIÓN
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // @Get('me')
    // async getMe(@Req() req) {
    //     console.log("Inicio de sesión rápido solicitado...");

    //     const token = req.cookies?.accessToken;

    //     if (!token) {
    //         throw new UnauthorizedException('Not authenticated...');
    //     }

    //     const { user, profile } = await this.authService.validateAccessToken(token);

    //     return {
    //         user: plainToInstance(UsersResponseDTO, user, {
    //             groups: [user.role]
    //         }),
    //         profile: plainToInstance(ProfilesResponseDTO, profile, {
    //             groups: [user.role]
    //         })
    //     };
    // }

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