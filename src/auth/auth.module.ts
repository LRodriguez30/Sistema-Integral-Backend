
import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RefreshModule } from './jwt/refresh/refresh.module';
import { JwtAccessModule } from './jwt/access/access.module';
import { RefreshTokensModule } from './refresh_tokens/refresh_tokens.module';
import { PersonasModule } from '../personas/personas.module';
import { RolesModule } from '../roles/roles.module';
import { MicrosoftService } from './microsoft.service';
// import { ProfilesModule } from '../profiles/profiles.module';

/**
 * - Módulos Importados:
 *   - RefreshTokensModule
 *   - UsersModule
 *   - PersonasModule
 *   - JwtAccessModule
 *   - RefreshModule
 * ---
 * - Controladores:
 *   - AuthController
 * ---
 * - Proveedores:
 *   - AuthService
 *   - MicrosoftService
 * ---
 * - Expuestos:
 *   - AuthService
 *   - MicrosoftService
 */
@Module({
  imports: [
    forwardRef(() => RefreshTokensModule),
    UsersModule,
    PersonasModule,
    JwtAccessModule,
    RefreshModule
  ],
  providers: [AuthService, MicrosoftService],
  controllers: [AuthController],
  exports: [AuthService, MicrosoftService]
})
export class AuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //   .apply(CheckCookieMiddleware)
  //   .forRoutes('auth/login', 'auth/register')
  // }
}
