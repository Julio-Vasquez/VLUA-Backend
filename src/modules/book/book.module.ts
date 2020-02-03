import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './../common/middleware/auth.middleware';

import { BookController } from './book.controller';
import { BookService } from './book.service';

import { Book } from './../../entities/book.entity';
import { Editorial } from './../../entities/editorial.entity';
import { Author } from './../../entities/author.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Editorial, Author]),
    MulterModule.registerAsync({
      useFactory: async file => file.configMulter(),
      inject: ['FileUploadService'],
    }),
    
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'book/findall', method: RequestMethod.GET },
        { path: 'book/findbyname/:name', method: RequestMethod.GET },
        { path: 'book/findbyauthor/:name', method: RequestMethod.GET },
        { path: 'book/findbycategory/:name', method: RequestMethod.GET },
        { path: 'book/findbyeditorial/:name', method: RequestMethod.GET },
        { path: 'book/findbyisbn', method: RequestMethod.GET }
      )
      .forRoutes(BookController);
  }
}
