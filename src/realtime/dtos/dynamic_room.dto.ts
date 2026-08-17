import { IsEnum, IsUUID } from 'class-validator';
import { RoomTypes } from '../enums/room-types.enum';

export class DynamicRoomDTO {
    @IsUUID()
    requestedRoom!: string;

    @IsEnum(RoomTypes)
    type!: RoomTypes;
}