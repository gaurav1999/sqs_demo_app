import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';


@Injectable()
export class TestQueueHandler {
  private readonly logger = new Logger(TestQueueHandler.name);

  constructor() {}

  @SqsMessageHandler(process.env.TEST_QUEUE)
  async handleMessage(message: AWS.SQS.Message) {
    if (!!message.Body) {
      try {
        const obj = JSON.parse(message.Body);
        console.log(obj);
        const process = await new Promise((res, rej) => {
          setTimeout(() => {
            res(true);
          }, 3000);
        });
        console.log("Message processed");
        return;
      } catch (error) {
        this.logger.error(error, message);
        throw new InternalServerErrorException(`Error in file processing ${error.message}`);
      }
    }
  }

  @SqsConsumerEventHandler(process.env.TEST_QUEUE, 'error')
  async handleError(error: Error) {
    this.logger.error(error);
  }
}
