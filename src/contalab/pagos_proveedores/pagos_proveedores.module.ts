import { forwardRef, Module } from '@nestjs/common';
import { PagosProveedoresService } from './pagos_proveedores.service';
import { PagosProveedoresController } from './pagos_proveedores.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => ProveedoresModule),
    forwardRef(() => UsersModule)
  ],
  providers: [PagosProveedoresService],
  controllers: [PagosProveedoresController],
  exports: [PagosProveedoresService]
})
export class PagosProveedoresModule {}
