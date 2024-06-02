import { Module } from '@nestjs/common';

import { UserController } from './users.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
