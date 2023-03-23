import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SqsMessageProducer } from './sqs-producer/sqs-message-producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sqsProducer: SqsMessageProducer,
    ) {}

  @Get()
  async getHello() {
    await this.sqsProducer.sendMessage({ id: 'hello', body: { test: 'world' } },
      process.env.TEST_QUEUE);
    console.log("Message produced ----")
    return this.appService.getHello();
  }
}
