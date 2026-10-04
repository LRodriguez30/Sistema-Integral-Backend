import { forwardRef, Module } from '@nestjs/common';
import { DetalleNominaService } from './detalle_nomina.service';
import { DetalleNominaController } from './detalle_nomina.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { NominaModule } from '../nomina/nomina.module';
import { EmpleadosModule } from '../empleados/empleados.module';

@Module({
  imports: [
    forwardRef(() => NominaModule),
    forwardRef(() => EmpleadosModule),
    SupabaseModule
  ],
  providers: [DetalleNominaService],
  controllers: [DetalleNominaController],
  exports: [DetalleNominaService]
})
export class DetalleNominaModule {}
