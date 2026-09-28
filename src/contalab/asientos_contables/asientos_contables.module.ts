import { forwardRef, Module } from '@nestjs/common';
import { AsientosContablesController } from './asientos_contables.controller';
import { AsientosContablesService } from './asientos_contables.service';
import { SupabaseModule } from '../../supabase/supabase.module';
import { UsersModule } from '../../users/users.module';
import { DetallesAsientosContablesModule } from '../detalles_asientos_contables/detalles_asientos_contables.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => DetallesAsientosContablesModule),
    SupabaseModule
  ],
  controllers: [AsientosContablesController],
  providers: [AsientosContablesService],
  exports: [AsientosContablesService]
})
export class AsientosContablesModule {}
