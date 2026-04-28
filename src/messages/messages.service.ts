import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MessagesService {
  constructor(
    @InjectQueue('messages')
    private readonly messagesQueue: Queue,
  ) {}

  async addMessageJob(text: string) {
    await this.messagesQueue.add(
      'send-message',
      { text },
      {
        attempts: 3,
        backoff: {
          type: 'fixed',
          delay: 3000,
        },
      },
    );

    return { message: 'Message job added to queue' };
  }
}