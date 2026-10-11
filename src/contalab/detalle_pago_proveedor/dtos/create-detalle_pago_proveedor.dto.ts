import { IsNumber } from "class-validator";

export class CreateDetallePagoProveedorDTO {
    @IsNumber()
    pago_id!: number;

    @IsNumber()
    compra_id!: number;

    @IsNumber()
    monto_aplicado!: number;
}