import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { sApiKeyBearer, sJwtBearer } from '@utils/header';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const logger = new Logger('NestBootstrap');

  app.enableCors();

  const configService = app.get(ConfigService);

  const developer = configService.get<string>('DEVELEPORTMENT', 'true');

  let port = configService.get<string>('PORT_API', '4000');

  if (!developer) {
    port = configService.get<string>('PORT', { infer: true });
  }

  await app.listen(port, '0.0.0.0');

  logger.log(`Listening on port ${port}`);
}
bootstrap();
