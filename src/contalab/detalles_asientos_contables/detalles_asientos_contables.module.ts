import { forwardRef, Module } from '@nestjs/common';
import { DetallesAsientosContablesService } from './detalles_asientos_contables.service';
import { DetallesAsientosContablesController } from './detalles_asientos_contables.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { CatalogoCuentasModule } from '../catalogo_cuentas/catalogo_cuentas.module';
import { AsientosContablesModule } from '../asientos_contables/asientos_contables.module';

@Module({
  imports: [
    forwardRef(() => CatalogoCuentasModule),
    forwardRef(() => AsientosContablesModule),
    forwardRef(() => CatalogoCuentasModule),
    SupabaseModule
  ],
  providers: [DetallesAsientosContablesService],
  controllers: [DetallesAsientosContablesController],
  exports: [DetallesAsientosContablesService]
})
export class DetallesAsientosContablesModule {}
