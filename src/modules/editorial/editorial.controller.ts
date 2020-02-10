import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Editorial } from './../../entities/editorial.entity';

import { EditorialService } from './editorial.service';

import { Response } from './../common/response/response';

import { EditorialDto } from './dto/editorial.dto';
import { UUIDDto } from './../common/dto/uuid.dto';

@Controller('editorial')
export class EditorialController {
  constructor(
    private readonly response: Response,
    private readonly editorialService: EditorialService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  public async createEditorial(@Body() editorial: EditorialDto) {
    const res = await this.editorialService.createEditorial(editorial);
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Editorial Registrada Correctamente!')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message('Ya existe esa editorial, no se registro nada!')
      .json({ data: [] });
  }

  @Get('/findall')
  public async findAll() {
    const res: Editorial[] = await this.editorialService.findAll();
    if (res.length > 0) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Carga Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message('No hay ningun registro de editorial.')
      .json({ data: [] });
  }

  @Get('/findbyname/:name')
  public async findByName(@Param('name') name: string) {
    const res: Editorial[] = await this.editorialService.findByName(name);
    if (res.length > 0) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Carga Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(`NO existe ninguna editorial llamada : ${name}`)
      .json({ data: [] });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/delete')
  public async deleteEditorial(@Body() uuid: UUIDDto) {
    const res = await this.editorialService.deleteEditorial(uuid.id);
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Eliminacion Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(
        'Ese ID no corresponde a ninguna editorial, no se pudo eliminar nada!',
      )
      .json({ data: [] });
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update')
  public async updateEditorial(
    @Body() newEditorial: EditorialDto,
    @Body() uuid: UUIDDto,
  ) {
    const res = await this.editorialService.updateEditorial(
      newEditorial,
      uuid.id,
    );
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Actualización Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message('No existe ninguna editorial con ese ID, no se actualizo nada!')
      .json({ data: [] });
  }
}
