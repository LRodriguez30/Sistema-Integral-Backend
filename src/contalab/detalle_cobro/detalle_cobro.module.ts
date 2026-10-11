import { forwardRef, Module } from '@nestjs/common';
import { DetalleCobroService } from './detalle_cobro.service';
import { DetalleCobroController } from './detalle_cobro.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { CobrosModule } from '../cobros/cobros.module';
import { FacturasModule } from '../facturas/facturas.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => CobrosModule),
    forwardRef(() => FacturasModule)
  ],
  providers: [DetalleCobroService],
  controllers: [DetalleCobroController],
  exports: [DetalleCobroService]
})
export class DetalleCobroModule {}
