import { Module } from '@nestjs/common';
import { AsientosContablesController } from './asientos_contables.controller';
import { AsientosContablesService } from './asientos_contables.service';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [AsientosContablesController],
  providers: [AsientosContablesService]
})
export class AsientosContablesModule {}
