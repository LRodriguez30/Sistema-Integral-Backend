import { forwardRef, Module } from '@nestjs/common';
import { DetalleCompraService } from './detalle_compra.service';
import { DetalleCompraController } from './detalle_compra.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { ComprasModule } from '../compras/compras.module';
import { ProductosModule } from '../productos/productos.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => ComprasModule),
    forwardRef(() => ProductosModule)
  ],
  providers: [DetalleCompraService],
  controllers: [DetalleCompraController],
  exports: [DetalleCompraService]
})
export class DetalleCompraModule {}
