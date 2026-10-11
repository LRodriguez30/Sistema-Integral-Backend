import { forwardRef, Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { CategoriaProductosModule } from '../categoria_productos/categoria_productos.module';
import { DetallePedidoModule } from '../detalle_pedido/detalle_pedido.module';
import { DetalleFacturaModule } from '../detalle_factura/detalle_factura.module';
import { DetalleCompraModule } from '../detalle_compra/detalle_compra.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => CategoriaProductosModule),
    forwardRef(() => DetallePedidoModule),
    forwardRef(() => DetalleFacturaModule),
    forwardRef(() => DetalleCompraModule)
  ],
  providers: [ProductosService],
  controllers: [ProductosController],
  exports: [ProductosService]
})
export class ProductosModule {}
