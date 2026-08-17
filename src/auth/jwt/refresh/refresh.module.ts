import { forwardRef, Module } from '@nestjs/common';
import { RefreshController } from './refresh.controller';
import { RefreshService } from './refresh.service';
import { UsersModule } from '../../../users/users.module';
import { JwtAccessModule } from '../access/access.module';
import { RefreshTokensModule } from '../../refresh_tokens/refresh_tokens.module';
import { AuthModule } from '../../auth.module';
import { RefreshGuard } from './refresh.guard';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    UsersModule, JwtAccessModule, RefreshTokensModule
  ],
  controllers: [RefreshController],
  providers: [RefreshService, RefreshGuard],
  exports: [RefreshService]
})
export class RefreshModule {}
