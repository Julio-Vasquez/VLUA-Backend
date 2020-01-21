import { Controller, Get, Body, Post, Param, UploadedFiles, UseInterceptors, HttpStatus } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { BookService } from './book.service';
import { BookDto } from './dto/book.dto';

import { AppHost } from './../common/environment/environment';
import { Files } from './../common/files/files';

import Response from './../common/response/response';

@Controller('book')
export class BookController {
  constructor(private readonly book: BookService){}

  private readonly fl = new Files();

  @Get('/allbook')
  public async allBook() : Promise<any>
  {
    const res = await this.book.findAll();
    if(res.length > 0 ){
      return "hay archivos";
    }
    return "no hay archivos";
  }

  /* Este controlador por el multer debe recibir 2 archivos,elprimero es el pdf del book, el segundo es el cover */

  @UseInterceptors(FileFieldsInterceptor(
    [
      {
        name: 'urlBook', maxCount: 1
      },
      {
        name: 'urlCover', maxCount: 1
      }
    ]
  ))
  @Post('/create')
  public async createBook(@Body() book : BookDto, @UploadedFiles() file)
  {
    if( file ){
      const res : boolean = await this.book.createBook(
        book,
        [
          (AppHost + '/' + file.urlBook[0].path),
          (AppHost + '/' + file.urlCover[0].path)
        ]
      );

      if(res){
        return Response
          .status({ statusCode: HttpStatus.OK, state: 'OK'})
          .message('Registro exitoso')
          .json()
        ;
      }
      
      return Response
        .status({ statusCode: HttpStatus.CONFLICT, state: 'CONFLICT' })
        .message('Ya existe el registro')
        .json()
      ;
    }

    this.fl.deleteFile(
      [
        (AppHost + '/' + file.urlBook[0].path),
        (AppHost + '/' + file.urlCover[0].path)
      ]
    );

    return Response
      .status({ statusCode: HttpStatus.BAD_REQUEST, state: 'ERROR BAD_REQUEST' })
      .message('No ha llegado ningun dato al servidor')
      .json()
    ;
  }
  
}
