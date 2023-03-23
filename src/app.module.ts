import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsConsumerModule } from './sqs-consumer/sqs-consumer.module';
import { SqsProducerModule } from './sqs-producer/sqs-producer.module';

@Module({
  imports: [
    SqsProducerModule,
    SqsConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
