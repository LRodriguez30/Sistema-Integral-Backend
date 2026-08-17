import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { UsersController } from './users.controller';
import { JwtAccessModule } from '../auth/jwt/access/access.module';
import { AdminGuard } from './admin.guard';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [SupabaseModule, JwtAccessModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, AdminGuard],
  exports: [UsersService]
})
export class UsersModule {}
