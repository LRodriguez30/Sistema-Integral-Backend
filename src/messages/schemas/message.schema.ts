import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {

    @Prop({ required: true })
    chat_id!: string;

    @Prop({ required: true })
    sender_id!: string;

    @Prop({ required: true })
    type!: string;

    @Prop({
        type: {
            text: String
        }
    })
    content!: {
        text: string;
    };

    @Prop([
        {
            url: String,
            type: String,
            name: String,
            size: Number
        }
    ])
    attachments!: any[];

    @Prop()
    reply_to!: string;

    @Prop({
        type: {
            sent: Boolean,
            delivered: Boolean,
            read: Boolean
        }
    })
    status!: {
        sent: boolean;
        delivered: boolean;
        read: boolean;
    };

    @Prop()
    created_at!: Date;

    @Prop()
    edited_at!: Date;

    @Prop()
    deleted_at!: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);