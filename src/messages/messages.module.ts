import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesProcessor } from './messages.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'messages',
    }),
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesProcessor],
})
export class MessagesModule {}