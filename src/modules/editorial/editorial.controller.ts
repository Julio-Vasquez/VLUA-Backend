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
  public async createEditorial(@Body() editorial : EditorialDto)
  {
    const res = await this.serviceEditorial.createEditorial(editorial);
    if(res)
    {
      return Response
        .status({ statusCode: HttpStatus.OK, state: 'OK'})
        .message('Editorial Registrada Correctamente!')
        .json(
          { 
            data: res
          }
        )
      ;
    }
    return Response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('Ya existe esa editorial, no se registro nada!')
      .json({ data: [] })
    ;
  }

  @Get('/list')
  public async listEditorials(){
    const res: Editorial[] = await this.serviceEditorial.findAll();
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
      .message('No hay ningun registro de editorial.')
      .json({ data: [] })
    ;
  }

  @Get('/listname/:name')
  public async listEditorialByName(@Param('name') name: string){
    const res : Editorial[] = await this.serviceEditorial.findByName(name);
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
      .message('NO existe ninguna editorial que coincida con ese nombre')
      .json({ data: [] })
    ;
  }


  @Delete('/delete/:id')
  public async deleteEditorial(@Param('id') id : string)
  {
    const res = await this.serviceEditorial.deleteEditorial(id);
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
      .message('Ese ID no corresponde a ninguna editorial, no se pudo eliminar nada!')
      .json({ data: [] })
    ;
  }

  @Put('/update/:id')
  public async updateEditorial(@Body() newEditorial : EditorialDto, @Param('id') id : string)
  {
    const res = await this.serviceEditorial.updateEditorial(newEditorial, id);
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
      .message('No existe ninguna editorial con ese ID, no se actualizo nada!')
      .json({ data: [] })
    ;
  }
}