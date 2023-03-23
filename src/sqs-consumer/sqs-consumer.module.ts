import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { TestQueueHandler } from './test-queue-handler';

AWS.config.update({
  region: process.env.SQS_REGION, // aws region
  accessKeyId: process.env.AWS_ACCESS_KEY, // aws access key id
  secretAccessKey: process.env.AWS_SECRET_KEY // aws secret access key
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [
        {
          name: process.env.TEST_QUEUE,
          queueUrl: process.env.TEST_QUEUE_URL,
          region: process.env.SQS_REGION
        },
      ],
    })
  ],
  controllers: [],
  providers: [TestQueueHandler],
  exports: [TestQueueHandler]
})
export class SqsConsumerModule {}
