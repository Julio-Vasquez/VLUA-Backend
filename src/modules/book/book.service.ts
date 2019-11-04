import { Injectable } from '@nestjs/common';
import {  Repository, QueryRunner, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Book } from './../../entities/book.entity';
import { State } from './../../entities/enums/state.enum';

import { BookDto } from './dto/book.dto';
import { ISBNDto } from './dto/isbn.dto';

import { Files } from '../common/files/files';

@Injectable()
export class BookService 
{
  constructor(
    
    @InjectRepository(Book)
    private readonly repository : Repository<Book>
  ){}

  private readonly fls : Files;
  
  public async createBook(book : BookDto, url : string[] ) : Promise<boolean>
  {
    const exist : Book = await this.repository.findOne({
      where : {
        isbn : book.isbn
      }
    });
    //prepare files to delete in possible err //[0]urlBook, [1]urlCover
    const arrayFilesImg = this.fls.prepareFile(url);
    if(!exist)
    {
      const queryRunner: QueryRunner =  this.repository.queryRunner;
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
            url[0], 
            url[1],
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
      .addSelect('book.urlBook', 'book')
      .addSelect('book.urlCover', 'cover')
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
      .addSelect('book.urlBook', 'book')
      .addSelect('book.urlCover', 'cover')
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
      .addSelect('book.urlBook', 'book')
      .addSelect('book.urlCover', 'cover')
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
      .addSelect('book.urlBook', 'book')
      .addSelect('book.urlCover', 'cover')
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
      .addSelect('book.urlBook', 'book')
      .addSelect('book.urlCover', 'cover')
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
      .addSelect('book.urlBook', 'book')
      .addSelect('book.urlCover', 'cover')
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

  public async updateDataBook(book : BookDto,  url : string[] ) : Promise<boolean>
  {
   const res = await this.repository.update(
      {
        isbn : book.isbn,
        name : book.name,
        publication : book.publication,
        edition : book.edition,
        tomo : book.tomo, 
        urlBook : url[0],
        urlCover : url[1],
        state : State.Active
      },
      {
        isbn : book.isbn
      });
    return res.affected > 0;
  }

  public async updateReferencesBook(editorial : string, author : string, category : string, isbn : string): Promise<boolean>
  {
    const queryRunner: QueryRunner =  this.repository.queryRunner;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try
    {
      await queryRunner.query(
        `UPDATE 
          book
        SET
          book.editorial = ?,
          book.author = ?,
          book.category = ?
        WHERE
          book.isbn = ${isbn}
        ;
        `,
        [
          editorial,
          author,
          category
        ]
      );
      await queryRunner.commitTransaction();
      return true;
    }
    catch(err)
    {
      await queryRunner.rollbackTransaction();
      console.log(err);
      return false;
    }
    finally
    {
      await queryRunner.release();
    }
  }

  public async updateBook(book : BookDto,  url : string[]) : Promise<boolean>
  {
    return(
        this.updateDataBook(book, url) 
        && 
        this.updateReferencesBook(book.editorial, book.author, book.category, book.isbn)
      )
      ?
      true
      :
      false
      ;
  }

  public async updateISBN(id : string, newISBN: string) : Promise<boolean>
  {
    const res =  await this.repository.update(
      {
        isbn : newISBN
      },
      {
        id : id
      }
    );
    return res.affected > 0;
  }

  public async deleteBook(ISBN : string) : Promise<boolean>{
    const exists : Book[] = await this.repository.find(
      {
        select : ["urlBook", "urlCover"],
        where : { isbn : ISBN }
      }
    );

    if(exists.length === 1 && exists && this.fls.prepareFile([exists[0].urlBook, exists[0].urlCover]) ){
      const res : DeleteResult = await this.repository.delete({isbn : ISBN});
      return res.affected > 0;
    }
    return false;
  }
}