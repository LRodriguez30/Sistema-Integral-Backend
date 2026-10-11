import { forwardRef, Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { ClientesModule } from '../clientes/clientes.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => ClientesModule),
    forwardRef(() => UsersModule)
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
  exports: [PedidosService]
})
export class PedidosModule {}
