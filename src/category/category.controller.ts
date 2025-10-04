import { Controller, Post, Body } from '@nestjs/common';
import { CategoryProducerService } from './category-producer.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categorys')
export class CategoryController {
  constructor(private readonly categoryProducer: CategoryProducerService) {}

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    await this.categoryProducer.sendCategory(dto);
    return { message: 'Categoria enviada para a fila com sucesso!' };
  }
}
