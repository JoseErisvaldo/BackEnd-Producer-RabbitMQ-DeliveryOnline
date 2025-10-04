import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryProducerService } from './category-producer.service';
import { RabbitMqService } from '../rabbitmq/rabbitmq.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryProducerService, RabbitMqService],
})
export class CategoryModule {}
