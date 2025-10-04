import { Injectable } from '@nestjs/common';
import { RabbitMqService } from '../rabbitmq/rabbitmq.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RabbitEventsCreated } from '../rabbitmq/events/category/rabbitmq-created.config';

@Injectable()
export class CategoryProducerService {
  constructor(private readonly rabbitMqService: RabbitMqService) {}

  async sendCategory(category: CreateCategoryDto) {
    const event = RabbitEventsCreated.CATEGORY_CREATED;

    try {
      await this.rabbitMqService.sendMessage(
        category,
        event.exchange,
        event.routingKey,
        event.queue,
      );
    } catch (error) {
      console.error('Erro ao enviar mensagem de categoria:', error);
      // Adicionar mensagem à DLQ - Futuro
    }
  }
}
