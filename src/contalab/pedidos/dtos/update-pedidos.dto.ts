import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { EstadosPedido } from "../enums/estados-pedido.enum";
import { EstadosEnvio } from "../enums/estados_envio.enum";

export class UpdatePedidosDTO {
    @IsOptional()
    @IsNumber()
    usuario_id?: number;

    @IsOptional()
    @IsEnum(EstadosPedido)
    estado_pedido!: EstadosPedido;

    @IsOptional()
    @IsString()
    direccion_entrega!: string;

    @IsOptional()
    @IsEnum(EstadosEnvio)
    estado_envio!: EstadosEnvio;

    @IsOptional()
    @IsString()
    observaciones!: string;
}