import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookController } from './book.controller';
import { BookService } from './book.service';

import { Book } from './../../entities/book.entity';
import { Editorial } from './../../entities/editorial.entity';
import { Author } from './../../entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book, Editorial, Author])
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: []
})
export class BookModule {}
