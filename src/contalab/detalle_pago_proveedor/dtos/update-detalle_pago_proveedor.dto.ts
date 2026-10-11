import { IsNumber, IsOptional } from "class-validator";

export class UpdateDetallePagoProveedorDTO {
    @IsOptional()
    @IsNumber()
    monto_aplicado!: number;
}