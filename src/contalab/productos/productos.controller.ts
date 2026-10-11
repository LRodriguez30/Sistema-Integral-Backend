import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { plainToInstance } from 'class-transformer';
import { ProductosResponseDTO } from './dtos/productos-response.dto';
import { CreateProductosDTO } from './dtos/create-productos.dto';
import { UpdateProductosDTO } from './dtos/update-productos.dto';

@Controller('productos')
export class ProductosController {
    constructor(
        private readonly productosService: ProductosService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerProductos(
        @Req() req
    ) {
        return plainToInstance(
            ProductosResponseDTO,
            await this.productosService.getAll(),
            {
                groups: []
            }
        );
    }

    // GET BY PRODUCTO ID
    @Get(':productoId')
    async ObtenerProductoPorId(
        @Param('productoId', ParseIntPipe) productoId: number,
        @Req() req
    ) {
        return plainToInstance(
            ProductosResponseDTO,
            await this.productosService.getById(productoId),
            {
                groups: []
            }
        );
    }

    // GET BY CATEGORIA ID
    @Get('categoria/:categoriaId')
    async ObtenerProductoPorCategoriaId(
        @Param('categoriaId', ParseIntPipe) categoriaId: number,
        @Req() req
    ) {
        return plainToInstance(
            ProductosResponseDTO,
            await this.productosService.getByCategoriaId(categoriaId),
            {
                groups: []
            }
        );
    }

    // CREATE
    @Post('')
    async CrearProducto(
        @Body() dto: CreateProductosDTO,
        @Req() req
    ) {
        return plainToInstance(
            ProductosResponseDTO,
            await this.productosService.create(dto),
            {
                groups: []
            }
        );
    }

    // UPDATE BY PRODUCTO ID
    @Patch(':productoId')
    async ActualizarProductoPorId(
        @Body() dto: UpdateProductosDTO,
        @Param('productoId', ParseIntPipe) productoId: number,
        @Req() req
    ) {
        return plainToInstance(
            ProductosResponseDTO,
            await this.productosService.update(productoId, dto),
            {
                groups: []
            }
        );
    }

    // DELETE BY PRODUCTO ID
    @Delete(':productoId')
    async EliminarProductoPorId(
        @Param('productoId', ParseIntPipe) productoId: number,
        @Req() req
    ) {
        return await this.productosService.deleteById(productoId);
    }
}