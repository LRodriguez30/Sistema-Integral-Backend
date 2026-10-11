import { forwardRef, Module } from '@nestjs/common';
import { DetalleFacturaService } from './detalle_factura.service';
import { DetalleFacturaController } from './detalle_factura.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { FacturasModule } from '../facturas/facturas.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => FacturasModule),
    forwardRef(() => ProductosModule)
  ],
  providers: [DetalleFacturaService],
  controllers: [DetalleFacturaController],
  exports: [DetalleFacturaService]
})
export class DetalleFacturaModule {}
