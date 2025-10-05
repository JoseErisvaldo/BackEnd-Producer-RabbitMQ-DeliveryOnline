// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqModule } from './rabbitmq/rabbitmq.module';
import { CategoryModule } from './category/category.module';
import { EstablishmentModule } from './establishment/establishment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RabbitMqModule,
    CategoryModule,
    EstablishmentModule
  ],
})
export class AppModule {}
