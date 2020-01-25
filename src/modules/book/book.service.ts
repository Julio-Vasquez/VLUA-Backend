import { Injectable } from '@nestjs/common';
import { Repository, Connection, QueryRunner, DeleteResult, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Book } from './../../entities/book.entity';
import { State } from './../../entities/enums/state.enum';

import { BookDto } from './dto/book.dto';
import { ISBNDto } from './dto/isbn.dto';

import { Files } from '../common/files/files';

@Injectable()
export class BookService {

  constructor(
    private readonly connection: Connection,
    @InjectRepository( Book )
    private readonly repository : Repository<Book>
  ){}

  private readonly fls : Files = new Files();
  
  public async createBook(book : BookDto, url : string[] ) : Promise<boolean>{
    const exist : Book = await this.repository.findOne({
      where : { isbn : book.isbn }
    });
    ////[0]urlBook, [1]urlCover
    const arrayFilesImg = this.fls.prepareFile(url);
    if( !exist ){
      const queryRunner: QueryRunner =  this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        await this.repository.insert({
          isbn : book.isbn,
          name : book.name,
          publication : book.publication,
          edition : book.edition,
          tomo : book.tomo,
          urlBook : url[0],
          urlCover : url[1],
          state : State.Active,
          editorial : () => `'${book.editorial}'`,
          author: () => `'${book.author}'`,
          category : () => `'${book.category}'`
        });
        await queryRunner.commitTransaction();
        return true;
      }catch( err ) {
        await queryRunner.rollbackTransaction();
        this.fls.deleteFile(arrayFilesImg);
        return false;
      } finally {
        await queryRunner.release();
      }
    }
    //in this point exists one error and proceed delete files
    this.fls.deleteFile(arrayFilesImg);
    return false;
  }

  public async findAll(): Promise<Book[]> {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.id', 'ID')
      .addSelect('book.name', 'nameBook')
      .addSelect("CONCAT(book.publication,'')", 'datePublication')
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

  public async findByAuthor(authorName : string) : Promise<Book[]> {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.id', 'ID')
      .addSelect('book.name', 'nameBook')
      .addSelect("CONCAT(book.publication,'')", 'datePublication')
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

  public async findByCategory(code : string) : Promise<Book[]> {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.id', 'ID')
      .addSelect('book.name', 'nameBook')
      .addSelect("CONCAT(book.publication,'')", 'datePublication')
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
      .andWhere('category.code = :code', { code : code })
      .orderBy('category.name', 'ASC')
      .execute()
    ;
  }
  
  public async findByEditorial(editorial : string) : Promise<Book[]> {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.id', 'ID')
      .addSelect('book.name', 'nameBook')
      .addSelect("CONCAT(book.publication, '')", "datePublication")
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
      .innerJoin('book.editorial', 'editorial')
      .innerJoin('book.category', 'category')
      .innerJoin('book.author', 'author')
      .where('editorial.name LIKE :editorial', { editorial : '%'+ editorial + '%' })
      .andWhere("book.state = 'Activo'")
      .orderBy('editorial.name', 'ASC')
      .execute()
    ;
  }
  
  public async findByISBN(ISBN : ISBNDto) : Promise<Book[]> {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.id', 'ID')
      .addSelect('book.name', 'nameBook')
      .addSelect("CONCAT(book.publication,'')", 'datePublication')
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

  public async findByNameBook(nameBook : string ) : Promise <Book[]> {
    return await this.repository
      .createQueryBuilder('book')
      .select('book.isbn', 'ISBN')
      .addSelect('book.id', 'ID')
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
      .andWhere('book.name LIKE :nameBook', { nameBook : '%' + nameBook + '%' })
      .orderBy('book.name', 'ASC')
      .execute()
    ;
  }

  public async updateBook(book : BookDto,  url : string[] ) : Promise<boolean> {
    const { editorial, author, category } : any = book;
    const res : UpdateResult = await this.repository.update(
      { isbn : book.isbn },
      {
        isbn : book.isbn,
        name : book.name,
        publication : book.publication,
        edition : book.edition,
        tomo : book.tomo, 
        urlBook : url[0],
        urlCover : url[1],
        state : State.Active,
        editorial : editorial,
        author: author,
        category : category
      }
    );
    return res.raw.affectedRows > 0;
  }

  public async updateISBN(id : string, newISBN: ISBNDto) : Promise<boolean> {
    const res : UpdateResult =  await this.repository.update(
      { id : id },
      { isbn : newISBN.isbn }
    );
    return res.raw.affectedRows > 0;
  }

  public async deleteBook(ISBN : ISBNDto) : Promise<boolean> {
    const exists : Book[] = await this.repository.find({
      select : ["urlBook", "urlCover"],
      where : { isbn : ISBN.isbn }
    });

    if( exists && exists.length === 1){
      this.fls.prepareFile([exists[0].urlBook, exists[0].urlCover]);
      const res : DeleteResult = await this.repository.delete({isbn : ISBN.isbn});
      return res.affected > 0;
    }
    return false;
  }
}