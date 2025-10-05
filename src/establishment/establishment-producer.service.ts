import { Injectable } from "@nestjs/common";
import { RabbitMqService } from "../rabbitmq/rabbitmq.service";
import { CreateEstablishmentDto } from "./dto/create-establishment";
import { RabbitEventsCreated } from "../rabbitmq/events/category/rabbitmq-created.config";


@Injectable()
export class EstablishmentProducerService { 
    constructor(private readonly rabbitMqService: RabbitMqService) { }
    
    async sendEstablishment(establishment: CreateEstablishmentDto) {
        const event = RabbitEventsCreated.ESTABLISHMENT_CREATED;
        try {
            await this.rabbitMqService.sendMessage(
                establishment,
                event.exchange,
                event.routingKey,
                event.queue,
            );
        } catch (error) {
            console.error('Erro ao enviar mensagem de estabelecimento:', error);
            // Adicionar mensagem à DLQ - Futuro
        }
    }
}