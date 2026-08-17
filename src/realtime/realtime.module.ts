import { forwardRef, Module } from '@nestjs/common';
import { RealtimeService } from './realtime.service';
import { RealtimeGateway } from './realtime.gateway';
import { SupabaseModule } from '../supabase/supabase.module';
import { AuthModule } from '../auth/auth.module';
import { RefreshTokensModule } from '../auth/refresh_tokens/refresh_tokens.module';
import { PresenceService } from './presence.service';
import { MessagesModule } from '../messages/messages.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    forwardRef(() => RefreshTokensModule),
    SupabaseModule,
    forwardRef(() => AuthModule),
    MessagesModule, AuditModule
  ],
  providers: [RealtimeService, RealtimeGateway, PresenceService],
  exports: [RealtimeService, RealtimeGateway]
})
export class RealtimeModule {}
