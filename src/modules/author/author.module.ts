import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';

import { AuthMiddleware } from './../common/middleware/auth.middleware';

import { Author } from './../../entities/author.entity';

import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '',
    }),
    TypeOrmModule.forFeature([Author]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
  exports: [],
})
export class AuthorModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'author/findall', method: RequestMethod.GET },
        { path: 'author/findbyname/:name', method: RequestMethod.GET },
      )
      .forRoutes(AuthorController);
  }
}
