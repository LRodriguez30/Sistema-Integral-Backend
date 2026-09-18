import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { Naturaleza } from "../enums/naturaleza.enum";
import { TipoCuenta } from "../enums/tipo-cuenta.enum";

export class UpsertCuentaDTO {
    @IsString()
    codigo_cuenta!: string;
    
    @IsString()
    nombre_cuenta!: string;

    @IsEnum(TipoCuenta)
    tipo_cuenta!: TipoCuenta;

    @IsEnum(Naturaleza)
    naturaleza!: Naturaleza;

    @IsOptional()
    @IsNumber()
    cuenta_padre_id!: number | null;

    @IsNumber()
    nivel_cuenta!: number;

    @IsBoolean()
    permite_movimiento!: boolean;

    @IsBoolean()
    estado!: boolean;
}