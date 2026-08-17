import { forwardRef, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { RefreshModule } from './jwt/refresh/refresh.module';
import { JwtAccessModule } from './jwt/access/access.module';
import { RefreshTokensModule } from './refresh_tokens/refresh_tokens.module';
// import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  imports: [
    forwardRef(() => RefreshTokensModule),
    UsersModule,
    JwtAccessModule,
    RefreshModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //   .apply(CheckCookieMiddleware)
  //   .forRoutes('auth/login', 'auth/register')
  // }
}
