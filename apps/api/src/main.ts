import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@src/app.module';
import { EnvProps } from '@src/config.env';

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

  app.enableCors();

  const configService = app.get(ConfigService<EnvProps>);

  const port = configService.get<string>('PORT', { infer: true });

  const DEVELEPORTMENT = configService.get<string>('DEVELEPORTMENT', {
    infer: true,
  });

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  if (DEVELEPORTMENT === 'true') {
    Logger.log('Development is enabled');
    const options = new DocumentBuilder()
      .setTitle('Generic API')
      .setDescription('A generic API')
      .setVersion('1.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      })
      .build();

    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup(`docs`, app, document);

    Logger.log(`Swagger is enabled http://localhost:${port}/docs`);
  }

  await app.listen(port, '0.0.0.0');

  Logger.log(`Listening on port http://localhost:${port}/v1`);
}
bootstrap();
