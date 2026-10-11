import { forwardRef, Module } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { FacturasController } from './facturas.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { ClientesModule } from '../clientes/clientes.module';
import { PedidosModule } from '../pedidos/pedidos.module';
import { UsersModule } from '../../users/users.module';
import { DetalleFacturaModule } from '../detalle_factura/detalle_factura.module';
import { DetalleCobroModule } from '../detalle_cobro/detalle_cobro.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => ClientesModule),
    forwardRef(() => PedidosModule),
    forwardRef(() => UsersModule),
    forwardRef(() => DetalleFacturaModule),
    forwardRef(() => DetalleCobroModule)
  ],
  providers: [FacturasService],
  controllers: [FacturasController],
  exports: [FacturasService]
})
export class FacturasModule {}
