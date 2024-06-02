import { EnvProps } from '@src/config.env';
import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';

@Injectable()
export class FastifyDomainFilterMiddleware implements NestMiddleware {
  private readonly allowedDomains: string[];
  private readonly development: string;

  constructor(private readonly configService: ConfigService<EnvProps>) {
    // Add your allowed domains here
    this.allowedDomains = configService
      .get<string>('FRONTEND_URL', {
        infer: true,
      })
      .split(',');
    this.development = configService.get<string>('DEVELEPORTMENT', {
      infer: true,
    });
  }

  use(req: FastifyRequest, res: any, next: () => void) {
    const origin = req.headers.host;
    const devMode = this.development === 'true';
    if (!devMode && !this.allowedDomains.includes(origin)) {
      throw new ForbiddenException({
        message: `Cannot make requests to this route from the ${origin} domain`,
      });
    }

    next();
  }
}
