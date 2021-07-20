import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions = { cors: true}; //App has access to connect this server
  const app = await NestFactory.create(AppModule, appOptions);
  await app.listen(3001);
}
bootstrap();
