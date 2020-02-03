import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';

import { AuthMiddleware } from './../common/middleware/auth.middleware';

import { Editorial } from './../../entities/editorial.entity';

import { EditorialController } from './editorial.controller';
import { EditorialService } from './editorial.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Editorial]),
    JwtModule.register({
      secret: '',
    }),
  ],
  controllers: [EditorialController],
  providers: [EditorialService],
  exports: [],
})
export class EditorialModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'editorial/findall', method: RequestMethod.GET },
        { path: 'editorial/findbyname/:name', method: RequestMethod.GET },
      )
      .forRoutes(EditorialController);
  }
}
