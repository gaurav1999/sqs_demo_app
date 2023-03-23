import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';
import { SqsMessageProducer } from './sqs-message-producer.service';


AWS.config.update({
  region: process.env.SQS_REGION, // aws region
  accessKeyId: process.env.AWS_ACCESS_KEY, // aws access key id
  secretAccessKey: process.env.AWS_SECRET_KEY // aws secret access key
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: process.env.TEST_QUEUE,
          queueUrl: process.env.TEST_QUEUE_URL,
          region: process.env.SQS_REGION
        },
      ]
    })
  ],
  controllers: [],
  providers: [SqsMessageProducer],
  exports: [SqsMessageProducer]
})
export class SqsProducerModule {}
