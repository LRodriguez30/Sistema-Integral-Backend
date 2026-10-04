import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { CatalogoCuentasService } from './catalogo_cuentas.service';
import { plainToInstance } from 'class-transformer';
import { CatalogoCuentasResponseDTO } from './dtos/catalogo_cuentas-response.dto';
import { UpsertCuentaDTO } from './dtos/upsert-cuenta.dto';

@Controller('catalogo-cuentas')
export class CatalogoCuentasController {

    constructor(
        private readonly catalogoCuentasService: CatalogoCuentasService
    ) {}

    // Obtener todo el catálogo de cuentas
    @Get('')
    async ObtenerCatalogoCuentas(
        @Req() req
    ) {
        return plainToInstance(
            CatalogoCuentasResponseDTO,
            await this.catalogoCuentasService.getAll(),
            {
                groups: []
            }
        );
    }

    // Crear cuenta
    @Post('')
    async insertarCuenta(
        @Body() dto: UpsertCuentaDTO
    ) {
        return plainToInstance(
            CatalogoCuentasResponseDTO,
            await this.catalogoCuentasService.createCuenta(dto),
            {
                groups: []
            }
        );
    }

    // Actualizar cuenta
    @Put(':id')
    async actualizarCuenta(
        @Param('id', ParseIntPipe) cuenta_id: number,
        @Body() dto: UpsertCuentaDTO
    ) {
        return plainToInstance(
            CatalogoCuentasResponseDTO,
            await this.catalogoCuentasService.updateCuenta(
                dto,
                cuenta_id
            ),
            {
                groups: []
            }
        );
    }

    @Post('layout')
    async IniciarPlantillaBase(
        @Req() req
    ) {
        return plainToInstance(
            CatalogoCuentasResponseDTO,
            this.catalogoCuentasService.createBaseLayout(),
            {
                groups: []
            }
        )
    }

    // Eliminar los registros del catálogo de cuentas
    @Delete('')
    async EliminarRegistros(
        @Req() req
    ) {
        return await this.catalogoCuentasService.deleteRecords();
    }

    // Eliminar cuenta
    @Delete(':id')
    async EliminarCuenta(
        @Req() req,
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.catalogoCuentasService.deleteCuentaById(id);
    }

    // Eliminar rama
    @Delete('rama/:id')
    async deleteCuentaRama(
        @Param('id', ParseIntPipe) id: number
    ) {
        return await this.catalogoCuentasService.deleteCuentaRama(id);
    }
}