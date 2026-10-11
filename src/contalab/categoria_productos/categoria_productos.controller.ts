import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { CategoriaProductosService } from './categoria_productos.service';
import { plainToInstance } from 'class-transformer';
import { CategoriaProductosResponseDTO } from './dtos/categoria_productos-response.dto';
import { CreateCategoriaProductosDTO } from './dtos/create-categoria_productos.dto';
import { UpdateCategoriaProductosDTO } from './dtos/update-categoria_productos.dto';

@Controller('categoria-productos')
export class CategoriaProductosController {
    constructor(
        private readonly categoriaProductosService: CategoriaProductosService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerCategorias(
        @Req() req
    ) {
        return plainToInstance(
            CategoriaProductosResponseDTO,
            await this.categoriaProductosService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY CATEGORIA ID
    @Get(':categoriaId')
    async ObtenerCategoriaPorId(
        @Param('categoriaId', ParseIntPipe) categoriaId: number,
        @Req() req
    ) {
        return plainToInstance(
            CategoriaProductosResponseDTO,
            await this.categoriaProductosService.getById(categoriaId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearCategoria(
        @Body() dto: CreateCategoriaProductosDTO,
        @Req() req
    ) {
        return plainToInstance(
            CategoriaProductosResponseDTO,
            await this.categoriaProductosService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY CATEGORIA ID
    @Patch(':categoriaId')
    async ActualizarCategoriaPorId(
        @Body() dto: UpdateCategoriaProductosDTO,
        @Param('categoriaId', ParseIntPipe) categoriaId: number,
        @Req() req
    ) {
        return plainToInstance(
            CategoriaProductosResponseDTO,
            await this.categoriaProductosService.update(categoriaId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY CATEGORIA ID
    @Delete(':categoriaId')
    async EliminarEmpleadoPorId(
        @Param('categoriaId', ParseIntPipe) categoriaId: number,
        @Req() req
    ) {
        return await this.categoriaProductosService.deleteById(categoriaId);
    }
}