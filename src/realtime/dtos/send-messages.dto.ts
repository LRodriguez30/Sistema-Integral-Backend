import {
    IsString,
    IsOptional,
    IsArray,
    IsIn,
    IsNotEmpty,
    IsEnum
} from 'class-validator';
import { RoomTypes } from '../enums/room-types.enum';

export class SendMessagesDTO {
    @IsString()
    @IsNotEmpty()
    @IsEnum(RoomTypes)
    room_type!: RoomTypes;

    @IsString()
    @IsNotEmpty()
    chat_id!: string;

    @IsString()
    @IsNotEmpty()
    id!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;

    @IsOptional()
    @IsNotEmpty()
    @IsIn(['text', 'image', 'file', 'system'])
    type?: 'text' | 'image' | 'file' | 'system';

    @IsOptional()
    @IsArray()
    @IsNotEmpty()
    attachments?: any[];

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    reply_to?: string;
}