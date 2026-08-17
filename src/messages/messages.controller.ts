import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private messagesService: MessagesService) { }

    @Post()
    create(@Body() body: any) {
        return this.messagesService.create(body);
    }

    @Get(':chat_id')
    find(@Param('chat_id') chat_id: string) {
        return this.messagesService.findByChat(chat_id);
    }

    @Delete(':id')
    delete(@Param('id') id: string, @Body() body: any) {
        return this.messagesService.delete(id, body.sender_id);
    }
}

