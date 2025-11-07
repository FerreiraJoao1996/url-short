import { NestFactory } from '@nestjs/core';
import { UrlModule } from './modules/url/url.module';

async function bootstrap() {
    await NestFactory.createApplicationContext(UrlModule);
    console.log('Worker BullMQ iniciado e escutando jobs...');
}
bootstrap();
