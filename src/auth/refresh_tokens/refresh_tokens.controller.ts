import { Controller, Req, Get, Param, ParseBoolPipe, ParseUUIDPipe, Post, Body, Delete, UseGuards, HttpCode, Patch, ParseIntPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RefreshTokensService } from './refresh_tokens.service';
import { RefreshTokensResponseDTO } from './dtos/refresh_tokens-response.dto';
import { CreateRefreshTokensDTO } from './dtos/create-refresh_tokens.dto';
import { JwtAccessGuard } from '../jwt/access/access.guard';
import { UpdateRefreshTokensDTO } from './dtos/update-refresh_tokens.dto';

/**
 * Endpoints para manipular datos de los tokens de recuperación
 * - GET
 * ``` typescript
 *   - getAllRefreshTokens()
 *   - getRefreshTokenById(refreshTokenId: number)
 *   - getRefreshTokenByUserId(userId: number)
 *   - getRefreshTokensIfRevoked(revoked: boolean)
 * ```
 * - POST
 * ``` typescript
 *   - createRefreshToken(dto: CreateRefreshTokensDTO)
 *   - checkRefreshToken()
 * ```
 * - PATCH
 * ``` typescript
 *   - updateRefreshTokenExpirationById(refreshTokenId: number, dto: UpdateRefreshTokensDTO)
 * ```
 * - DELETE
 * ``` typescript
 *   - deleteRefreshTokenById(refreshTokenId: number)
 *   - deleteRefreshTokenByUserId(userId: number)
 * ```
 */

// RUTA PROTEGIDA por AUTH
// Necesita de un token de acceso
@UseGuards(JwtAccessGuard)
@Controller('auth/refresh-tokens')
export class RefreshTokensController {
    constructor(private readonly refreshTokensService: RefreshTokensService) {}

    // ----------
    // GET      *
    // ----------

    // refresh-tokens/
    @Get('')
    async getAllRefreshTokens(@Req() req) {
        console.log('Información de refresh tokens solicitada...');
        const userAccess = req.user.role;

        return plainToInstance(
            RefreshTokensResponseDTO,
            await this.refreshTokensService.getAll(),
            {
                groups: [userAccess]
            }
        )
    }

    // refresh-tokens/:id
    @Get(':id')
    async getRefreshTokenById(
        @Param('id', ParseUUIDPipe) refreshTokenId: string,
        @Req() req
    ) {
        console.log('Información de un refresh token en particular solicitada...');
        const userAccess = req.user.role;

        return plainToInstance(
            RefreshTokensResponseDTO,
            await this.refreshTokensService.getById(refreshTokenId),
            {
                groups: [userAccess]
            }
        )
    }

    // refresh-tokens/user/:userId
    @Get('user/:userId')
    async getRefreshTokenByUserId(
        @Param('userId', ParseUUIDPipe) userId: string,
        @Req() req
    ) {
        console.log('Información de un refresh token en particular solicitada...');
        const userAccess = req.user.role;

        return plainToInstance(
            RefreshTokensResponseDTO,
            await this.refreshTokensService.getByUserId(userId),
            {
                groups: [userAccess]
            }
        )
    }

    // refresh-tokens/revoked/:status
    @Get('revoked/:status')
    async getRefreshTokensIfRevoked(
        @Param('status', ParseBoolPipe) revoked: boolean,
        @Req() req
    ) {
        console.log('Información de refresh tokens solicitada...');
        const userAccess = req.user.role;

        return plainToInstance(
            RefreshTokensResponseDTO,
            await this.refreshTokensService.getIfRevoked(revoked),
            {
                groups: [userAccess]
            }
        )
    }


    // ----------
    // POST     *
    // ----------

    // refresh-tokens/
    @Post('')
    async createRefreshToken(
        @Body() dto: CreateRefreshTokensDTO,
        @Req() req
    ) {
        console.log('Creando refresh token en BD...');
        const userAccess = req.user.role;

        return plainToInstance(
            RefreshTokensResponseDTO,
            await this.refreshTokensService.upsert(dto),
            {
                groups: [userAccess]
            }
        );
    }

    // refresh-tokens/check
    @Post('check')
    @HttpCode(200)
    async checkRefreshToken(
        @Req() req
    ) {
        console.log('Validando refresh token en BD...')
        const userAccess = req.user.role;

        return plainToInstance(
            RefreshTokensResponseDTO,
            await this.refreshTokensService.checkRefreshTokenInDB(req.user),
            {
                groups: [userAccess]
            }
        )
    }

    // ----------
    // PATCH    *
    // ----------
    
    // refresh-tokens/:id
    @Patch(':id')
    async updateRefreshTokenExpirationById(
        @Param('id', ParseUUIDPipe) id: string,
        @Req() req,
        @Body() dto: UpdateRefreshTokensDTO
    ) {
        console.log("Actualizando refresh token con campos:", dto);
        const userAccess = req.user.role;

        return plainToInstance(
            RefreshTokensResponseDTO,
            await this.refreshTokensService.updateById(id, dto),
            {
                groups: [userAccess]
            }
        )
    }


    // ----------
    // DELETE   *
    // ----------

    // refresh-tokens/:id
    @Delete(':id')
    async deleteRefreshTokenById(@Param('id', ParseIntPipe) refreshTokenId: number) {
        console.log('Eliminando refresh token en BD...');
        return await this.refreshTokensService.deleteById(refreshTokenId);
    }

    // refresh-tokens/user/:id
    @Delete('user/:id')
    async deleteRefreshTokensByUserId(@Param('id', ParseIntPipe) userId: number) {
        console.log('Eliminando refresh tokens de un usuario en particular en BD...');
        return await this.refreshTokensService.deleteByUserId(userId);
    }
}
