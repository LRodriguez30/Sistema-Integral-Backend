import { forwardRef, Module } from '@nestjs/common';
import { RefreshTokensService } from './refresh_tokens.service';
import { RefreshTokensController } from './refresh_tokens.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { UsersModule } from '../../users/users.module';
import { JwtAccessModule } from '../jwt/access/access.module';
import { RealtimeModule } from '../../realtime/realtime.module';
import { RefreshTokensCronService } from './refresh_tokens_cron.service';

/**
 * - Módulos Importados:
 *   - RealtimeModule
 *   - SupabaseModule
 *   - UsersModule
 *   - JwtAccessModule
 * ---
 * - Controladores:
 *   - RefreshTokensController
 * ---
 * - Proveedores:
 *   - RefreshTokensService
 * ---
 * - Expuestos:
 *   - RefreshTokensService
 */
@Module({
  imports: [
    forwardRef(() => RealtimeModule),
    SupabaseModule, UsersModule, JwtAccessModule
  ],
  providers: [RefreshTokensService, RefreshTokensCronService],
  controllers: [RefreshTokensController],
  exports: [RefreshTokensService]
})
export class RefreshTokensModule {}
