import { Body, Controller, Post } from "@nestjs/common";
import { CreateEstablishmentDto } from "./dto/create-establishment";
import { EstablishmentProducerService } from "./establishment-producer.service";


@Controller('establishment')
export class EstablishmentController {
    constructor(private readonly establishmentService: EstablishmentProducerService) {}

    @Post()
    async create(@Body() dto: CreateEstablishmentDto) {
        await this.establishmentService.sendEstablishment(dto);
        return { message: 'Estabelecimento enviado para a fila com sucesso!' };
    }
}