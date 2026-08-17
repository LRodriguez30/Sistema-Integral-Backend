import { Module } from '@nestjs/common';
import { JwtAccessGuard } from './access.guard';
import { JwtAccessService } from './access.service';

@Module({
  providers: [JwtAccessService, JwtAccessGuard],
  exports: [JwtAccessService, JwtAccessGuard]
})
export class JwtAccessModule {}
