import { forwardRef, Module } from '@nestjs/common';
import { DetallePagoProveedorService } from './detalle_pago_proveedor.service';
import { DetallePagoProveedorController } from './detalle_pago_proveedor.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { PagosProveedoresModule } from '../pagos_proveedores/pagos_proveedores.module';
import { ComprasModule } from '../compras/compras.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => PagosProveedoresModule),
    forwardRef(() => ComprasModule)
  ],
  providers: [DetallePagoProveedorService],
  controllers: [DetallePagoProveedorController],
  exports: [DetallePagoProveedorService]
})
export class DetallePagoProveedorModule {}
