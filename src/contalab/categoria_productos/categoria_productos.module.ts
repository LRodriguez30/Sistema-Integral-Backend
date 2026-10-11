import { Module } from '@nestjs/common';
import { CategoriaProductosService } from './categoria_productos.service';
import { CategoriaProductosController } from './categoria_productos.controller';
import { SupabaseModule } from '../../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [CategoriaProductosService],
  controllers: [CategoriaProductosController],
  exports: [CategoriaProductosService]
})
export class CategoriaProductosModule {}
