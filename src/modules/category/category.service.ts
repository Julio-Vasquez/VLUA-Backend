import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';

import { Category } from './../../entities/category.entity';
import { CategoryDto } from './dto/category.dto';

import { State } from './../../entities/enums/state.enum';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly repository : Repository<Category>
  ){}

  public async createCategory(category : CategoryDto) : Promise<boolean> {
    const exist : Category = await this.repository.findOne({
      where : {
        code : category.code,
        name : category.name 
      }
    });
    if( !exist ) {
      await this.repository.insert({
        code : category.code,
        name : category.name,
        state : State.Active
      });
      return true;
    }
    return false;
  }

  public async findAll(): Promise<Category[]> {
    return await this.repository.find({ 
      where : { state : 'Activo' }
    });
  }

  public async updateCategory(category : CategoryDto, id : string) : Promise<boolean> {
    const exist : Category = await this.repository.findOne({
      where : { id : id }
    });
    if ( exist ) {
      const update : UpdateResult = await this.repository.update(
        { id : id },
        {
          code : category.code,
          name : category.name,
          state : State.Active
        }
      );
      return update.raw.affectedRows > 0 ;
    }
    return false;
  }

  public async deleteCategory(id : string) : Promise<boolean> {
    const exist : Category = await this.repository.findOne({ 
      where : { id : id } 
    });
    if ( exist ) {
      const del : DeleteResult = await this.repository.delete({id : id});
      return del.affected > 0 ;
    }
    return false;
  }
}