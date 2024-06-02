import { Module, MiddlewareConsumer } from '@nestjs/common';
import { FastifyDomainFilterMiddleware } from '@utils/middleware/domains.middleware';
import { UsersModule } from '@api/users/users.module';

@Module({
  imports: [UsersModule],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FastifyDomainFilterMiddleware).forRoutes('*');
  }
}
