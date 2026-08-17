import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class MessagesService {

    constructor(
        @InjectModel(Message.name)
        private messageModel: Model<MessageDocument>,

        private auditService: AuditService
    ) { }

    async create(data: any) {

        const message = await this.messageModel.create({
            ...data,
            created_at: new Date()
        });

        await this.auditService.log({
            entity: 'messages',
            entity_id: message._id.toString(),
            operation: 'create',
            actor_id: data.sender_id,
            before: null,
            after: message.toObject(),
            context: {
                source: 'websocket',
                reason: 'new message'
            }
        });

        return message;
    }

    async findByChat(chat_id: string) {
        return this.messageModel.find({ chat_id });
    }

    async delete(id: string, sender_id: string) {

        const before = await this.messageModel.findById(id);

        const deleted = await this.messageModel.findByIdAndUpdate(
            id,
            { deleted_at: new Date() },
            { new: true }
        );

        await this.auditService.log({
            entity: 'messages',
            entity_id: id,
            operation: 'delete',
            actor_id: sender_id,
            before,
            after: deleted
        });

        return deleted;
    }
}