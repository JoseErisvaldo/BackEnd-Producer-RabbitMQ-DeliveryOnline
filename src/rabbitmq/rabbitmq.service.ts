import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as amqp from 'amqplib';
import type { Connection, Channel } from 'amqplib';

@Injectable()
export class RabbitMqService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection | null = null;
  private channel: Channel | null = null;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    try {
      const amqpUrl: string =
        this.configService.get<string>('CLOUDAMQP_URL') ||
        'amqp://guest:guest@localhost:5672';

      console.log('🔗 Conectando ao RabbitMQ em:', amqpUrl);

      const connection = (await amqp.connect(amqpUrl)) as unknown as Connection;
      const channel = (await connection.createChannel()) as unknown as Channel;

      this.connection = connection;
      this.channel = channel;

      console.log('Conectado ao RabbitMQ');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao conectar no RabbitMQ:', err.message);
      } else {
        console.error('Erro desconhecido ao conectar no RabbitMQ:', err);
      }
      throw err;
    }
  }

  async sendMessage(
    message: unknown,
    exchangeName: string,
    routingKey: string,
    queueName?: string,
  ): Promise<void> {
    if (!this.channel) throw new Error('Canal não inicializado');

    try {
      const channel = this.channel as unknown as Channel;
      await channel.assertExchange(exchangeName, 'direct', { durable: true });

      if (queueName) {
        await channel.assertQueue(queueName, { durable: true });
        await channel.bindQueue(queueName, exchangeName, routingKey);
      }

      const buffer: Buffer = Buffer.from(JSON.stringify(message));
      const published: boolean = channel.publish(
        exchangeName,
        routingKey,
        buffer,
        { persistent: true },
      );

      if (!published) {
        console.warn(`Mensagem não publicada na exchange "${exchangeName}"`);
      } else {
        console.log(
          `📤 Mensagem enviada para exchange "${exchangeName}" com routingKey "${routingKey}"`,
        );
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(
          `Erro ao enviar mensagem para exchange "${exchangeName}":`,
          err.message,
        );
      } else {
        console.error(
          `Erro desconhecido ao enviar mensagem para exchange "${exchangeName}":`,
          err,
        );
      }
      throw err;
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      if (this.channel) await (this.channel as unknown as Channel).close();
      if (this.connection)
        await (this.connection as unknown as Connection).close();
      console.log('Conexão RabbitMQ fechada');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Erro ao fechar conexão com RabbitMQ:', err.message);
      } else {
        console.error('Erro desconhecido ao fechar conexão com RabbitMQ:', err);
      }
    }
  }
}
