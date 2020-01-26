import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './../common/middleware/auth.middleware';

import { User } from './../../entities/user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ User ]),
  ],
  controllers : [
    UserController
  ],
  providers : [
    UserService
  ],
  exports : []
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(AuthMiddleware)
    .forRoutes(UserController)
  }
}