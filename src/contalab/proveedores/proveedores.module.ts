import { forwardRef, Module } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { ProveedoresController } from './proveedores.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { PagosProveedoresModule } from '../pagos_proveedores/pagos_proveedores.module';
import { ComprasModule } from '../compras/compras.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => PagosProveedoresModule),
    forwardRef(() => ComprasModule)
  ],
  providers: [ProveedoresService],
  controllers: [ProveedoresController],
  exports: [ProveedoresService]
})
export class ProveedoresModule {}
