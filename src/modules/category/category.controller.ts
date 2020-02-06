import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CategoryService } from './category.service';

import { Category } from './../../entities/category.entity';

import { CategoryDto } from './dto/category.dto';
import { UUIDDto } from './../common/dto/uuid.dto';

import { Response } from './../common/response/response';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly response: Response,
    private readonly categoryService: CategoryService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  public async createCategory(@Body() category: CategoryDto) {
    const res: boolean = await this.categoryService.createCategory(category);
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Categoria Registrada Correctamente!')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message('Ya existe esa Categoria, no se registro nada!')
      .json({ data: [] });
  }

  @Get('/findall')
  public async findAll() {
    const res: Category[] = await this.categoryService.findAll();
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

  @Put('/update')
  public async updateCategory(
    @Body() category: CategoryDto,
    @Body() uuid: UUIDDto,
  ) {
    const res = await this.categoryService.updateCategory(category, uuid.id);
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Actualización Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message('No existe ninguna Categoria con ese ID, no se actualizo nada!')
      .json({ data: [] });
  }

  @Delete('/delete')
  public async deleteCategory(@Body() uuid: UUIDDto) {
    const res = await this.categoryService.deleteCategory(uuid.id);
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('Eliminacion Correctamente')
        .json({ data: res });
    }
    return this.response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT' })
      .message(
        'Ese ID no corresponde a ninguna categoria, no se pudo eliminar nada!',
      )
      .json({ data: [] });
  }
}
