import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EstadosPedido } from "../enums/estados-pedido.enum";
import { EstadosEnvio } from "../enums/estados_envio.enum";

export class CreatePedidosDTO {
    @IsNumber()
    cliente_id!: number;

    @IsOptional()
    @IsNumber()
    usuario_id?: number;

    @Type(() => Date)
    @IsDate()
    fecha_pedido!: Date;

    @IsEnum(EstadosPedido)
    estado_pedido!: EstadosPedido;

    @IsString()
    direccion_entrega!: string;

    @IsEnum(EstadosEnvio)
    estado_envio!: EstadosEnvio;

    @Type(() => Date)
    @IsDate()
    fecha_salida!: Date;

    @Type(() => Date)
    @IsDate()
    fecha_entrega!: Date;

    @IsString()
    observaciones!: string;
}