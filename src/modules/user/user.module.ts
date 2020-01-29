import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { AuthMiddleware } from './../common/middleware/auth.middleware';

import { User } from './../../entities/user.entity';
import { JwtKey } from './../common/environment/environment';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ User ]),
    JwtModule.register({ 
      secret: JwtKey
    }),
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