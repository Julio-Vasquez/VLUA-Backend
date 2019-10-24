import { Injectable } from '@nestjs/common';
import { Connection, Repository, QueryRunner } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Book } from './../../entities/book.entity';

import { BookDto } from './dto/book.dto';
import { ISBNDto } from './dto/isbn.dto';

import { Files } from '../common/files/files';

@Injectable()
export class BookService 
{
  constructor(
    
    private readonly connection : Connection,
    @InjectRepository(Book)
    private readonly repository : Repository<Book>
  ){}
  private readonly fls : Files;
  //no test
  public async createBook(book : BookDto, coverUrl : string): Promise<boolean>
  {
    const exist : Book = await this.repository.findOne({
      where : {
        isbn : book.isbn
      }
    });
    //prepare files to delete in possible err
    const arrayFilesImg = this.fls.prepareFile([coverUrl]);

    if(!exist)
    {
      const queryRunner: QueryRunner = this.connection.createQueryRunner();
      
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try
      {

        await queryRunner.query(
          "INSERT INTO `book`"
          +"(`id`, `isbn`, `name`, `publication`, `edition`, `tomo`, `urlImg`, `state`, `editorialId`, `authorId`, `categoryId`)"
          +"VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            book.isbn,
            book.name, 
            book.publication, 
            book.edition, 
            book.tomo, 
            coverUrl, 
            'Activo', 
            book.editorial, 
            book.author, 
            book.category
          ]
        );

        await queryRunner.commitTransaction();
        return true;
      }
      catch(err)
      {
        await queryRunner.rollbackTransaction();
        this.fls.deleteFile(arrayFilesImg);
        return false;
      }
      finally
      {
        await queryRunner.release();
      }
    }
    //in this point exists one error and proceed delete files
    this.fls.deleteFile(arrayFilesImg);
    return false;
  }

  public async findAll(): Promise<Book[]>{
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.name', 'nameBook')
      .addSelect('book.publication', 'datePublication')
      .addSelect('book.tomo', 'tomo')
      .addSelect('book.state', 'state')
      .addSelect('book.urlImg', 'img')
      .addSelect('author.name', 'nameOne')
      .addSelect('author.lastname', 'nameTwo')
      .addSelect('editorial.name', 'editorialName')
      .addSelect('editorial.direction', 'editorialDirection')
      .addSelect('category.name', 'categoryName')
      .addSelect('category.code', 'dewey')
      .leftJoin('book.editorial', 'editorial')
      .leftJoin('book.category', 'category')
      .leftJoin('book.author', 'author')
      .where("book.state = 'Activo'")
      .execute()
    ;
  }

  public async findByAuthor(authorName : string) : Promise<Book[]>
  {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.name', 'nameBook')
      .addSelect('book.publication', 'datePublication')
      .addSelect('book.tomo', 'tomo')
      .addSelect('book.state', 'state')
      .addSelect('book.urlImg', 'img')
      .addSelect('author.name', 'nameOne')
      .addSelect('author.lastname', 'nameTwo')
      .addSelect('editorial.name', 'editorialName')
      .addSelect('editorial.direction', 'editorialDirection')
      .addSelect('category.name', 'categoryName')
      .addSelect('category.code', 'dewey')
      .leftJoin('book.editorial', 'editorial')
      .leftJoin('book.category', 'category')
      .leftJoin('book.author', 'author')
      .where("book.state = 'Activo'")
      .andWhere('author.name LIKE :authorName', { authorName : '%' + authorName + '%' })
      .execute()
    ;
  }

  public async findByCategory(category : string) : Promise<Book[]>
  {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.name', 'nameBook')
      .addSelect('book.publication', 'datePublication')
      .addSelect('book.tomo', 'tomo')
      .addSelect('book.state', 'state')
      .addSelect('book.urlImg', 'img')
      .addSelect('author.name', 'nameOne')
      .addSelect('author.lastname', 'nameTwo')
      .addSelect('editorial.name', 'editorialName')
      .addSelect('editorial.direction', 'editorialDirection')
      .addSelect('category.name', 'categoryName')
      .addSelect('category.code', 'dewey')
      .leftJoin('book.editorial', 'editorial')
      .leftJoin('book.category', 'category')
      .leftJoin('book.author', 'author')
      .where("book.state = 'Activo'")
      .andWhere('category.name = :category', { category : category })
      .orderBy('category.name', 'ASC', 'NULLS LAST')
      .execute()
    ;
  }
  
  public async findByEditorial(editorial : string) : Promise<Book[]>
  {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.name', 'nameBook')
      .addSelect('book.publication', 'datePublication')
      .addSelect('book.tomo', 'tomo')
      .addSelect('book.state', 'state')
      .addSelect('book.urlImg', 'img')
      .addSelect('author.name', 'nameOne')
      .addSelect('author.lastname', 'nameTwo')
      .addSelect('editorial.name', 'editorialName')
      .addSelect('editorial.direction', 'editorialDirection')
      .addSelect('category.name', 'categoryName')
      .addSelect('category.code', 'dewey')
      .leftJoin('book.editorial', 'editorial')
      .leftJoin('book.category', 'category')
      .leftJoin('book.author', 'author')
      .where("book.state = 'Activo'")
      .andWhere('editorial.name = :editorial', { editorial : editorial })
      .orderBy('editorial.name', 'ASC', 'NULLS LAST')
      .execute()
    ;
  }
  
  public async findByISBN(ISBN : ISBNDto) : Promise<Book[]>
  {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.name', 'nameBook')
      .addSelect('book.publication', 'datePublication')
      .addSelect('book.tomo', 'tomo')
      .addSelect('book.state', 'state')
      .addSelect('book.urlImg', 'img')
      .addSelect('author.name', 'nameOne')
      .addSelect('author.lastname', 'nameTwo')
      .addSelect('editorial.name', 'editorialName')
      .addSelect('editorial.direction', 'editorialDirection')
      .addSelect('category.name', 'categoryName')
      .addSelect('category.code', 'dewey')
      .leftJoin('book.editorial', 'editorial')
      .leftJoin('book.category', 'category')
      .leftJoin('book.author', 'author')
      .where("book.state = 'Activo'")
      .andWhere('book.isbn = :isbn', { isbn : ISBN.isbn })
      .execute()
    ;
  }

  public async findByNameBook(nameBook : string ) : Promise <Book[]>
  {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.name', 'nameBook')
      .addSelect('book.publication', 'datePublication')
      .addSelect('book.tomo', 'tomo')
      .addSelect('book.state', 'state')
      .addSelect('book.urlImg', 'img')
      .addSelect('author.name', 'nameOne')
      .addSelect('author.lastname', 'nameTwo')
      .addSelect('editorial.name', 'editorialName')
      .addSelect('editorial.direction', 'editorialDirection')
      .addSelect('category.name', 'categoryName')
      .addSelect('category.code', 'dewey')
      .leftJoin('book.editorial', 'editorial')
      .leftJoin('book.category', 'category')
      .leftJoin('book.author', 'author')
      .where("book.state = 'Activo'")
      .andWhere('book.name = :nameBook', { nameBook : nameBook })
      .orderBy('book.name', 'ASC', 'NULLS LAST')
      .execute()
    ;
  }

  public async updateBook(book : BookDto, coverUrl? : string){

  }

  public async deleteBook(ISBN : string){

  }
  
}