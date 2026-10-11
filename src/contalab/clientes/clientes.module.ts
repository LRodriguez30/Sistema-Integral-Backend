import { forwardRef, Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { PedidosModule } from '../pedidos/pedidos.module';
import { FacturasModule } from '../facturas/facturas.module';
import { CobrosModule } from '../cobros/cobros.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => PedidosModule),
    forwardRef(() => FacturasModule),
    forwardRef(() => CobrosModule)
  ],
  providers: [ClientesService],
  controllers: [ClientesController],
  exports: [ClientesService]
})
export class ClientesModule {}
