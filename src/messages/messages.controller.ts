import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private messagesService: MessagesService) { }

    @Post()
    async create(@Body() body: any) {
        return await this.messagesService.create(body);
    }

    @Get(':chat_id')
    async find(@Param('chat_id') chat_id: string) {
        return await this.messagesService.findByChat(chat_id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Body() body: any) {
        return await this.messagesService.delete(id, body.sender_id);
    }
}

