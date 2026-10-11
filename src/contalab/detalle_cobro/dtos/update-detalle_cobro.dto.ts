import { IsNumber } from "class-validator";

export class UpdateDetalleCobroDTO {
    @IsNumber()
    monto_aplicado!: number;
}