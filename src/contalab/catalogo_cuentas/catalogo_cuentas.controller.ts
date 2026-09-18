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
    @Get('/')
    async ObtenerCatalogoCuentas(
        @Req() req
    ) {
        return plainToInstance(
            CatalogoCuentasResponseDTO,
            this.catalogoCuentasService.getAll()
        );
    }

    // Crear cuenta
    @Post('/')
    async insertarCuenta(
        @Body() dto: UpsertCuentaDTO
    ) {
        return plainToInstance(
            CatalogoCuentasResponseDTO,
            await this.catalogoCuentasService.createCuenta(dto)
        );
    }

    // Actualizar cuenta
    @Put('/:id')
    async actualizarCuenta(
        @Param('id', ParseIntPipe) cuenta_id: number,
        @Body() dto: UpsertCuentaDTO
    ) {
        return plainToInstance(
            CatalogoCuentasResponseDTO,
            await this.catalogoCuentasService.updateCuenta(
                dto,
                cuenta_id
            )
        );
    }

    @Post('/layout')
    async IniciarPlantillaBase(
        @Req() req
    ) {
        return plainToInstance(
            CatalogoCuentasResponseDTO,
            this.catalogoCuentasService.createBaseLayout()
        )
    }

    // Eliminar los registros del catálogo de cuentas
    @Delete('/')
    async EliminarRegistros(
        @Req() req
    ) {
        return this.catalogoCuentasService.deleteRecords();
    }

    // Eliminar cuenta
    @Delete('/:id')
    async EliminarCuenta(
        @Req() req,
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.catalogoCuentasService.deleteCuentaById(id);
    }

    // Eliminar rama
    @Delete(':id/rama')
    deleteCuentaRama(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.catalogoCuentasService.deleteCuentaRama(id);
    }
}