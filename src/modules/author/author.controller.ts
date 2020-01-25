import { Controller, Get, Body, Post, HttpStatus, Param, Delete, Put } from '@nestjs/common';

import { Author } from './../../entities/author.entity';

import { Response }   from './../common/response/response';

import { AuthorService } from './author.service';

import { AuthorDto } from './dto/author.dto';

@Controller('author')
export class AuthorController {

  constructor(
    private readonly response : Response,
    private readonly serviceAuthor : AuthorService
  ){}

  @Post('/create')
  public async createAuthor(@Body() author : AuthorDto) {
    const res = await this.serviceAuthor.createAuthor( author );
    if( res ) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK'})
        .message('Autor Registrado Correctamente!')
        .json({ data: res })
      ;
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('Ya existe un autor, credenciales no validas.')
      .json({ data: [] })
    ;
  }

  @Get('/findall')
  public async findAll() {
    let res: Author[] = await this.serviceAuthor.findAll();
    if( res.length > 0 ){
      return this.response
        .status({ statusCode : HttpStatus.OK, state : 'OK'})
        .message('Carga Correctamente')
        .json({ data : res })
      ;
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message('No hay ningun registro de autores.')
      .json({ data: [] })
    ;
  }

  @Get('/findbyname/:name')
  public async findByName(@Param('name') name: string) {
    const res : Author[] = await this.serviceAuthor.findByName( name );
    if( res.length > 0 ) {
      return this.response
        .status({ statusCode : HttpStatus.OK, state : 'OK'})
        .message('Carga Correctamente')
        .json({ data : res })
      ;
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message(`No existe ningun autor con ese nombre o apellido : ${name}`)
      .json({ data: [] })
    ;
  }

  @Delete('/delete/:id')
  public async deleteAuthor(@Param('id') id : string) {
    const res = await this.serviceAuthor.deleteAuthor( id );
    if( res ){
      return this.response
        .status({ statusCode : HttpStatus.OK, state : 'OK'})
        .message('Eliminacion Correctamente')
        .json({ data : res })
      ;
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('Ese ID no corresponde a ningun author, no se pudo eliminar nada!')
      .json({ data: [] })
    ;
  }

  @Put('/update/:id')
  public async updateAuthor(@Body() newAuthor : AuthorDto, @Param('id') id : string) {
    const res = await this.serviceAuthor.updateAuthor(newAuthor,id);
    if( res ){
      return this.response
        .status({ statusCode : HttpStatus.OK, state : 'OK'})
        .message('Actualización Correctamente')
        .json({ data : res })
      ;
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('author existente no validas')
      .json({ data: [] })
    ;
  }
}