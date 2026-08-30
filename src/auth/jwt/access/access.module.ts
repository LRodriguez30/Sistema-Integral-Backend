import { Module } from '@nestjs/common';
import { JwtAccessGuard } from './access.guard';
import { JwtAccessService } from './access.service';

/**
 * - Proveedores:
 *   - JwtAccessService
 *   - JwtAccessGuard
 * ---
 * - Expuestos:
 *   - JwtAccessService
 *   - JwtAccessGuard
 */
@Module({
  providers: [JwtAccessService, JwtAccessGuard],
  exports: [JwtAccessService, JwtAccessGuard]
})
export class JwtAccessModule {}
