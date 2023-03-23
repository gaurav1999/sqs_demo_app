import { Injectable } from '@nestjs/common';
import { SqsService } from '@ssut/nestjs-sqs';

@Injectable()
export class SqsMessageProducer {
  constructor(private readonly sqsService: SqsService) {}
  async sendMessage(body: any, queuename: string) {
    const message: any = { body, id: body.id };
    await this.sqsService.send(queuename, message);
  }
}
