import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  addMessage(@Body('text') text: string) {
    return this.messagesService.addMessageJob(text);
  }
}