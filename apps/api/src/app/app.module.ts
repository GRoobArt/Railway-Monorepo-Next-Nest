import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ResendModule } from 'nestjs-resend';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

import { AppController } from './app.controller';
import { PrismaModule } from '@common/prisma/prisma.module';
import { FastifyDomainFilterMiddleware } from '../utils/middleware/domainfilter.middleware';
import { LoggerModule } from '../utils/logger/logger.module';
import { UserModule } from '../api/users/user.module';
import { AppService } from './app.service';
import { UserController } from '@src/api/users/users.controller';

const CACHE_TTL = process.env.DEVELEPORTMENT
  ? 1000 * 60 * 60
  : 1000 * 60 * 60 * 24;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationOptions: {
        allowUnknown: false,
        abortEarly: true,
      },
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          password: process.env.DEVELEPORTMENT
            ? undefined
            : process.env.REDIS_PASSWORD,
          socket: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
          },
          ttl: CACHE_TTL,
        }),
      }),
    }),
    PrismaModule.forRoot(),
    UserModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
