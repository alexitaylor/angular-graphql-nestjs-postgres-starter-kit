import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { environment } from './environments/environment';

const port = environment.port || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Logger.log(
    `🚀  🚀   🚀   🚀 Apollo Server on http://localhost:${port}/graphql`,
    'Bootstrap',
  );
  await app.listen(port);
}
bootstrap();
