import { Module } from "@nestjs/common";
import { EstablishmentController } from "./establishment.controllers";
import { EstablishmentProducerService } from "./establishment-producer.service";
import { RabbitMqService } from "../rabbitmq/rabbitmq.service";


@Module({
    controllers: [EstablishmentController],
    providers: [EstablishmentProducerService, RabbitMqService],
})
export class EstablishmentModule {}