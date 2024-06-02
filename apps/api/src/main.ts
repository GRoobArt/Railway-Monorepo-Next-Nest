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

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  const options = new DocumentBuilder()
    .setTitle('Generic API')
    .setDescription('A generic API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      sJwtBearer,
    )
    .addApiKey(
      {
        type: 'apiKey',
        scheme: 'apiKey',
        bearerFormat: 'apiKey',
        name: sApiKeyBearer,
        description: 'Enter API key',
        in: 'header',
      },
      sApiKeyBearer,
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);

  // Set up Swagger UI
  SwaggerModule.setup(`docs`, app, document);

  logger.log(`Swagger UI available at /docs`);

  await app.listen(port, '0.0.0.0');

  logger.log(`Listening on port ${port}`);
}
bootstrap();
