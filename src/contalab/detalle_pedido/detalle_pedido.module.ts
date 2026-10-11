import { forwardRef, Module } from '@nestjs/common';
import { DetallePedidoService } from './detalle_pedido.service';
import { DetallePedidoController } from './detalle_pedido.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { PedidosModule } from '../pedidos/pedidos.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => PedidosModule),
    forwardRef(() => ProductosModule)
  ],
  providers: [DetallePedidoService],
  controllers: [DetallePedidoController],
  exports: [DetallePedidoService]
})
export class DetallePedidoModule {}
