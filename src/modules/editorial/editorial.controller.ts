import { Controller, Get, Body, Param, Post, Put, Delete, HttpStatus } from '@nestjs/common';

import { EditorialService } from './editorial.service';

import  Response   from './../common/response/response';

import { EditorialDto } from './dto/editorial.dto';
import { Editorial } from './../../entities/editorial.entity';


@Controller('editorial')
export class EditorialController
{
  constructor(
    private readonly serviceEditorial : EditorialService
  ){}

  @Post('/create')
  public async createAuthor(@Body() editorial : EditorialDto)
  {
    let res = await this.serviceEditorial.createEditorial(editorial);
    if(res)
    {
      return Response
        .status({ statusCode: HttpStatus.OK, state: 'OK'})
        .message('Editorial Registrado Correctamente!')
        .json(
          { 
            data: res
          }
        )
      ;
    }
    return Response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('Editorial existente no validas')
      .json({ data: [] })
    ;
  }

  @Get('/list')
  public async listAuthors(){
    let res: Editorial[] = await this.serviceEditorial.findAll();
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
      .message('Editorial existente no validas')
      .json({ data: [] })
    ;
  }

  @Get('/listname/:name')
  public async listAuthorsByName(@Param('name') name: string){
    let res : Editorial[] = await this.serviceEditorial.findByName(name);
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


  @Delete('/delete/:id')
  public async deleteAuthor(@Param('id') id : string)
  {
    let res = await this.serviceEditorial.deleteEditorial(id);
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

  @Put('/update/:id')
  public async updateAuthor(@Body() newEditorial : EditorialDto, @Param('id') id : string)
  {
    let res = await this.serviceEditorial.updateEditorial(newEditorial,id);
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
      .message('editorial existente no validas')
      .json({ data: [] })
    ;
  }
}