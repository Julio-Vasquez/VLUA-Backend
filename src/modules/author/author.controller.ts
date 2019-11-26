import { Controller, Get, Body, Post, HttpStatus, Param, Delete, Put } from '@nestjs/common';
import { AuthorService } from './author.service';

import  Response   from './../common/response/response';
import { AuthorDto } from './dto/author.dto';
import { Author } from './../../entities/author.entity';

@Controller('author')
export class AuthorController
{
  constructor(
    private readonly serviceAuthor : AuthorService
  ){}

  @Post('/create')
  public async createAuthor(@Body() author : AuthorDto)
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
            data: res
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

  @Get('/list')
  public async listAuthors(){
    let res: Author[] = await this.serviceAuthor.findAll();
    if(res.length > 0 )
    {
      return Response
        .status({ statusCode : HttpStatus.OK, state : 'OK'})
        .message('Carga Correctamente')
        .json({
          data : res
        })
      ;
    }
    return Response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('author existente no validas')
      .json({ data: [] })
    ;
  }

  @Get('/listname/:name')
  public async listAuthorsByName(@Param('name') name: string){
    let res : Author[] = await this.serviceAuthor.findByName(name);
    console.log(name);
    if(res.length > 0 )
    {
      return Response
        .status({ statusCode : HttpStatus.OK, state : 'OK'})
        .message('Carga Correctamente')
        .json({
          data : res
        })
      ;
    }
    return Response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('author existente no validas')
      .json({ data: [] })
    ;
  }


  @Delete('/deleteauthor/:id')
  public async deleteAuthor(@Param('id') id : string)
  {
    let res = await this.serviceAuthor.deleteAuthor(id);
    if( res )
    {
      return Response
        .status({ statusCode : HttpStatus.OK, state : 'OK'})
        .message('Eliminacion Correctamente')
        .json({
          data : res
        })
      ;
    }
    return Response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('author existente no validas')
      .json({ data: [] })
    ;
  }

  //cambiar el where a nombre y apellido
  @Put('/updateauthor/')
  public async updateAuthor(@Body() newAuthor : AuthorDto)
  {
    let id : string = "asdasdasd";
    let res = await this.serviceAuthor.updateAuthor(newAuthor,id);
    if( res)
    {
      return Response
        .status({ statusCode : HttpStatus.OK, state : 'OK'})
        .message('Actualización Correctamente')
        .json({
          data : res
        })
      ;
    }
    return Response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('author existente no validas')
      .json({ data: [] })
    ;
  }
}