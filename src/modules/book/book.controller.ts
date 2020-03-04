import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  UploadedFiles,
  UseInterceptors,
  HttpStatus,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { Book } from './../../entities/book.entity';

import { BookDto } from './dto/book.dto';
import { ISBNDto } from './dto/isbn.dto';
import { UUIDDto } from '../common/dto/uuid.dto';

import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { Files } from './../common/files/files';
import { Response } from './../common/response/response';

import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(
    private readonly response: Response,
    private readonly files: Files,
    private readonly bookService: BookService,
    private readonly config: ConfigService,
  ) {}

  /* Este controlador por el multer debe recibir 2 archivos,elprimero es el pdf del book, el segundo es el cover */

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'urlBook', maxCount: 1 },
      { name: 'urlCover', maxCount: 1 },
    ]),
  )
  @Post('/create')
  @Roles('Administrativo', 'Bibliotecario')
  public async createBook(@Body() book: BookDto, @UploadedFiles() file) {
    const AppHost = this.config.get<string>('app.host'),
      AppPrefix = this.config.get<string>('app.prefix'),
      AppPort = this.config.get<string>('app.port');
    if (file.urlBook !== undefined && file.urlCover !== undefined) {
      //Check if the files arrived.
      const res: boolean = await this.bookService.createBook(book, [
        `${AppHost}:${AppPort}/${AppPrefix}/${file.urlBook[0].path}`,
        `${AppHost}:${AppPort}/${AppPrefix}/${file.urlCover[0].path}`,
      ]);
      if (res) {
        //Check if the record could be created.
        return this.response
          .status({ statusCode: HttpStatus.OK, state: 'OK' })
          .message('Registro exitoso')
          .json({ data: [] });
      }
      return this.response
        .status({ statusCode: HttpStatus.CONFLICT, state: 'CONFLICT' })
        .message('Ya existe el registro')
        .json({ data: [] });
    }
    return this.response
      .status({
        statusCode: HttpStatus.BAD_REQUEST,
        state: 'ERROR BAD_REQUEST',
      })
      .message('No ha llegado ningun Archivo dato al servidor')
      .json({ data: [] });
  }

  @Get('/findall')
  public async allBook(): Promise<any> {
    const res: Book[] = await this.bookService.findAll();
    if (res.length > 0) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Carga Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message('No hay ningun registro de Libros.')
      .json({ data: [] });
  }

  @Get('/findbyname/:name')
  public async findByName(@Param('name') name: string) {
    const res: Book[] = await this.bookService.findByNameBook(name);
    if (res.length > 0) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Carga Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(`No hay ningun registro de Libros con el nombre : ${name}`)
      .json({ data: [] });
  }

  @Get('/findbyauthor/:name')
  public async findByAuthor(@Param('name') name: string) {
    const res: Book[] = await this.bookService.findByAuthor(name);
    if (res.length > 0) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Carga Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(`No hay ningun registro de Libros del autor : ${name}`)
      .json({ data: [] });
  }

  @Get('/findbycategory/:name')
  public async findByCategory(@Param('name') name: string) {
    const res: Book[] = await this.bookService.findByCategory(name);
    if (res.length > 0) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Carga Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(
        `No hay ningun registro de Libros de la categoria (dewey) : ${name}`,
      )
      .json({ data: [] });
  }

  @Get('/findbyeditorial/:name')
  public async findByEditorial(@Param('name') name: string) {
    const res: Book[] = await this.bookService.findByEditorial(name);
    if (res.length > 0) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Carga Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(`No hay ningun registro de Libros de la editorial : ${name}`)
      .json({ data: [] });
  }

  @Get('/findbyisbn/:isbn')
  public async findByISBN(@Param('isbn') isbn: string) {
    console.log('entro la peticion');
    const res: Book[] = await this.bookService.findByISBN(isbn);
    if (res.length > 0) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Carga Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(`No hay ningun registro de Libros con el isbn : ${isbn}`)
      .json({ data: [] });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'urlBook', maxCount: 1 },
      { name: 'urlCover', maxCount: 1 },
    ]),
  )
  @Put('/update')
  @Roles('Administrativo', 'Bibliotecario')
  public async updateBook(
    @Body() book: BookDto,
    @UploadedFiles() file,
    @Body() uuid: UUIDDto,
  ) {
    if (file.urlBook !== undefined && file.urlCover !== undefined) {
      const AppHost = this.config.get<string>('appHost'),
        AppPrefix = this.config.get<string>('app.prefix'),
        AppPort = this.config.get<string>('app.port');
      //Check if the files arrived.
      const res: boolean = await this.bookService.updateBook(uuid.id, book, [
        `${AppHost}:${AppPort}/${AppPrefix}/${file.urlBook[0].path}`,
        `${AppHost}:${AppPort}/${AppPrefix}/${file.urlCover[0].path}`,
      ]);
      if (res) {
        //Check if the record could be created.
        return this.response
          .status({ statusCode: HttpStatus.OK, state: 'OK' })
          .message('Actualizacion exitosa')
          .json({ data: [] });
      }
      return this.response
        .status({ statusCode: HttpStatus.CONFLICT, state: 'CONFLICT' })
        .message('No existe el registro')
        .json({ data: [] });
    }
    this.files.deleteFile([file.urlBook[0].path, file.urlCover[0].path]);
    return this.response
      .status({
        statusCode: HttpStatus.BAD_REQUEST,
        state: 'ERROR BAD_REQUEST',
      })
      .message('No ha llegado ningun Archivo dato al servidor')
      .json({ data: [] });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('/updateisbn')
  @Roles('Administrativo', 'Bibliotecario')
  public async updateIsbn(@Body() newIsbn: ISBNDto, @Body() uuid: UUIDDto) {
    const res = await this.bookService.updateISBN(uuid.id, newIsbn);
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Actualización Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message('No existe ningun libro con ese ID, no se actualizo nada!')
      .json({ data: [] });
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete('/delete')
  @Roles('Administrativo', 'Bibliotecario')
  public async deleteBook(@Body() isbn: ISBNDto) {
    const res = await this.bookService.deleteBook(isbn);
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Eliminacion Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(
        `No existe ningun libro con  el isbn ${isbn.isbn}, no se elimino nada`,
      )
      .json({ data: [] });
  }
}
