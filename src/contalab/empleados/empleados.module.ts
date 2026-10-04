import { forwardRef, Module } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { EmpleadosController } from './empleados.controller';
import { SupabaseModule } from '../../supabase/supabase.module';
import { PersonasModule } from '../../personas/personas.module';
import { DetalleNominaModule } from '../detalle_nomina/detalle_nomina.module';

@Module({
  imports: [
    SupabaseModule,
    forwardRef(() => PersonasModule),
    forwardRef(() => DetalleNominaModule)
  ],
  providers: [EmpleadosService],
  controllers: [EmpleadosController],
  exports: [EmpleadosService]
})
export class EmpleadosModule {}
