import { Module } from '@nestjs/common';
import { CatalogoCuentasController } from './catalogo_cuentas.controller';
import { CatalogoCuentasService } from './catalogo_cuentas.service';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [CatalogoCuentasController],
  providers: [CatalogoCuentasService]
})
export class CatalogoCuentasModule {}
