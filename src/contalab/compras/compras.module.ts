import { forwardRef, Module } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { ComprasController } from './compras.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { UsersModule } from '../../users/users.module';
import { DetalleCompraModule } from '../detalle_compra/detalle_compra.module';
import { DetallePagoProveedorModule } from '../detalle_pago_proveedor/detalle_pago_proveedor.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => ProveedoresModule),
    forwardRef(() => UsersModule),
    forwardRef(() => DetalleCompraModule),
    forwardRef(() => DetallePagoProveedorModule)
  ],
  providers: [ComprasService],
  controllers: [ComprasController],
  exports: [ComprasService]
})
export class ComprasModule {}
