import { forwardRef, Module } from '@nestjs/common';
import { CobrosService } from './cobros.service';
import { CobrosController } from './cobros.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { ClientesModule } from '../clientes/clientes.module';
import { UsersModule } from '../../users/users.module';
import { DetalleCobroModule } from '../detalle_cobro/detalle_cobro.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => ClientesModule),
    forwardRef(() => UsersModule),
    forwardRef(() => DetalleCobroModule)
  ],
  providers: [CobrosService],
  controllers: [CobrosController],
  exports: [CobrosService]
})
export class CobrosModule {}
