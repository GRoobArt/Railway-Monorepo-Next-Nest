import { Controller, Get, Headers, Logger } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor() {}
  @Get()
  getHealth(@Headers() headers?): string {
    Logger.log(
      `Health check from host: ${headers?.host ?? 'null'}. Referrer: ${
        headers?.referer ?? 'null'
      }`,
    );
    return 'OK';
  }
}
