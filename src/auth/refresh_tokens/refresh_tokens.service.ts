import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenPayload, SecRefreshTokenPayload } from '../jwt/refresh/interfaces/payload';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../supabase/supabase.service';
import { UsersService } from '../../users/users.service';
import { CreateRefreshTokensDTO } from './dtos/create-refresh_tokens.dto';

/**
 * - Conexión a la tabla `refresh_tokens`
 * ---
 * Servicios:
 * ``` typescript
 * async getAll()
 * async getById(refreshTokenId: number)
 * async getByUserId(userId: number)
 * async getIfRevoked(revoked: boolean)
 * async upsert(dto: CreateRefreshTokensDTO)
 * async checkRefreshTokenInDB(payload: SecRefreshTokenPayload)
 * async updateById(
 * id: string,
 *      fields: Partial<{
 *          expires_at: Date;
 *          last_activity_at: Date;
 *          last_extended_at: Date;
 *          revoked: boolean;
 *      }>
 * )
 * async deleteById(refreshTokenId: number)
 * async deleteByUserId(userId: number)
 * ```
 */
@Injectable()
export class RefreshTokensService {
    private readonly supabaseClient: SupabaseClient;

    constructor(
        private readonly supabaseService: SupabaseService,
        private readonly usersService: UsersService
    ) {
        this.supabaseClient = this.supabaseService.getClient();
    }

    async getAll() {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .select('*')

        if (error) {
            throw new InternalServerErrorException('Cannot fetch refresh tokens from DB...')
        }

        return data;
    }

    async getById(refreshTokenId: string) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .select('*')
            .eq('id', refreshTokenId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException('Cannot fetch refresh token from DB...')
        }

        if (!data) {
            throw new NotFoundException(`Refresh token with id '${refreshTokenId}' not found...`)
        }

        return data;
    }

    async getByUserId(userId: string) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException('Cannot fetch refresh token from DB...')
        }

        if (!data) {
            throw new NotFoundException(`Refresh token with user id '${userId}' not found...`)
        }

        return data;
    }

    async getIfRevoked(revoked: boolean) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .select('*')
            .eq('revoked', revoked)
            .maybeSingle()

        if (error) {
            throw new InternalServerErrorException('Cannot fetch refresh token from DB...')
        }

        if (!data) {
            throw new NotFoundException(`Revoked refresh tokens with '${revoked}' field not found...`)
        }

        return data;
    }

    async getManyByRevoked(revoked: boolean) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .select('*')
            .eq('revoked', revoked);

        if (error) {
            throw new Error('DB_REFRESH_QUERY_FAILED');
        }

        return data ?? [];
    }

    async upsert(dto: CreateRefreshTokensDTO) {
        const { data: existingToken } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .select('id')
            .eq('user_id', dto.user_id)
            .maybeSingle();

        if (existingToken) {
            const { data, error } = await this.supabaseClient
                .schema('core')
                .from('refresh_tokens')
                .update({
                    token_hash: dto.token_hash,
                    device_info: dto.device_info,
                    expires_at: dto.expires_at,
                    revoked: dto.revoked,
                    last_activity_at: new Date(),
                    last_extended_at: new Date()
                })
                .eq('id', existingToken.id)
                .select()
                .single();

            if (error) {
                throw new InternalServerErrorException(
                    'Cannot update refresh token...'
                );
            }

            return data;
        }

        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .insert({
                user_id: dto.user_id,
                token_hash: dto.token_hash,
                device_info: dto.device_info,
                expires_at: dto.expires_at,
                revoked: dto.revoked,
                last_activity_at: new Date()
            })
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(
                'Cannot create refresh token...'
            );
        }

        return data;
    }

    async checkRefreshTokenInDB(payload: SecRefreshTokenPayload) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .select('*')
            .eq('user_id', payload.sub)
            .maybeSingle();

        if (error) {
            throw new UnauthorizedException({
                message: 'Error checking refresh token...',
                errorCode: 401010
            });
        }

        if (!data) {
            throw new UnauthorizedException({
                message: 'No refresh token found for user...',
                errorCode: 401012
            });
        }

        if (data.revoked) {
            throw new UnauthorizedException({
                message: 'Refresh token revoked...',
                errorCode: 401011
            });
        }

        return data;
    }

    async updateById(
        id: string,
        fields: Partial<{
            expires_at: Date;
            last_activity_at: Date;
            last_extended_at: Date;
            revoked: boolean;
        }>
    ) {
        const { data, error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .update(fields)
            .eq('id', id)
            .select()
            .maybeSingle();

        if (error) {
            throw new InternalServerErrorException("Cannot update refresh token...");
        }

        if (!data) {
            throw new NotFoundException(`Refresh token with id '${id}' not found...`);
        }

        return data;
    }

    async deleteById(refreshTokenId: number) {
        const { error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .delete()
            .eq('id', refreshTokenId)

        if (error) {
            throw new InternalServerErrorException('Cannot delete refresh token from DB...');
        }

        const message = {
            "message": "Refresh token successfully deleted..."
        }

        return message;
    }

    async deleteByUserId(userId: number) {
        await this.usersService.findById(userId);

        const { error } = await this.supabaseClient
            .schema('core')
            .from('refresh_tokens')
            .delete()
            .eq('user_id', userId)

        if (error) {
            throw new InternalServerErrorException('Cannot delete refresh token from DB...');
        }

        const message = {
            "message": "Refresh tokens successfully deleted..."
        }

        return message;
    }
}