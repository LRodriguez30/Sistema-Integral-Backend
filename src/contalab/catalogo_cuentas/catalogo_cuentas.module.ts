import { forwardRef, Module } from '@nestjs/common';
import { CatalogoCuentasController } from './catalogo_cuentas.controller';
import { CatalogoCuentasService } from './catalogo_cuentas.service';
import { SupabaseModule } from '../../supabase/supabase.module';
import { DetallesAsientosContablesModule } from '../detalles_asientos_contables/detalles_asientos_contables.module';

@Module({
  imports: [
    forwardRef(() => DetallesAsientosContablesModule),
    SupabaseModule
  ],
  controllers: [CatalogoCuentasController],
  providers: [CatalogoCuentasService],
  exports: [CatalogoCuentasService]
})
export class CatalogoCuentasModule {}
