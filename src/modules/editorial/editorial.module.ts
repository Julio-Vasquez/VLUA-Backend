import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthMiddleware } from './../common/middleware/auth.middleware';

import { Editorial } from './../../entities/editorial.entity';

import { EditorialController } from './editorial.controller';
import { EditorialService } from './editorial.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([ Editorial ]),
  ],
  controllers : [
    EditorialController
  ],
  providers : [
    EditorialService
  ],
  exports : []
})
export class EditorialModule implements NestModule{
  configure(consumer : MiddlewareConsumer){
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'editorial/findall', method: RequestMethod.GET },
        { path: 'editorial/findbyname/:name', method: RequestMethod.GET}
      )
      .forRoutes(EditorialController)
  }
}