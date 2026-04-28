import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('messages')
export class MessagesProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    if (job.name === 'send-message') {
      console.log(`Processing message: ${job.data.text}`);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(`Job ${job?.id} failed`);
  }
}