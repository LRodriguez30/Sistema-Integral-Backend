import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AsientosContablesResponseDTO } from './dtos/asientos_contables-response.dto';
import { AsientosContablesService } from './asientos_contables.service';

@Controller('asientos-contables')
export class AsientosContablesController {
    constructor(
        private readonly asientosContablesService: AsientosContablesService
    ) {}

    // GET ALL
    @Get('')
    async ObtenerAsientosContables(
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.getAll(),
            {
                groups: []
            }
        );
    }

    @Get('/:userId')
    async ObtenerAsientoContablePorUsuarioId(
        @Param('userId', ParseIntPipe) userId: number,
        @Req() req
    ) {
        return plainToInstance(
            AsientosContablesResponseDTO,
            this.asientosContablesService.getByUserId(userId),
            {
                groups: []
            }
        )
    }
}