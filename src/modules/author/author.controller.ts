import { Controller, Get, Body, Post, HttpStatus } from '@nestjs/common';
import { AuthorService } from './author.service';

import  Response   from './../common/response/response';
import { AuthorDto } from './dto/author.dto';

@Controller('author')
export class AuthorController
{
  constructor(
    private readonly serviceAuthor : AuthorService
  ){}

  @Post('/create')
  public async createBook(@Body() author : AuthorDto)
  {
    console.log(author.dateBirth)
    let res = await this.serviceAuthor.createAuthor(author);

    if(res)
    {
      return Response
        .status({ statusCode: HttpStatus.OK, state: 'OK'})
        .message('Autor Registrado Correctamente!')
        .json(
          { 
            data: [
              {
                success : true
              }
            ]
          }
        )
      ;
    }
    return Response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('author existente no validas')
      .json({ data: [] })
    ;
  }
}