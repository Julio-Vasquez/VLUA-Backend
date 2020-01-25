import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, Like } from 'typeorm';

import { Editorial } from './../../entities/editorial.entity';

import { EditorialDto } from './dto/editorial.dto';
import { State } from './../../entities/enums/state.enum';

@Injectable()
export class EditorialService {

  constructor(
    @InjectRepository(Editorial)
    private readonly repository : Repository<Editorial>
  ){}

  public async createEditorial(editorial : EditorialDto) : Promise<boolean> {
    const res : Editorial = await this.repository.findOne({
      name : editorial.name
    });
    if( !res ) {
      await this.repository.insert({
        name : editorial.name,
        direction: editorial.direction,
        state: State.Active
      });
      return true;
    }
    return false;
  }

  public async findAll(): Promise<Editorial[]> {
    return await this.repository.find({
      where : { state : 'Activo' }
    });
  }

  public async updateEditorial(editorial : EditorialDto, id : string): Promise<boolean> {
    const exist : Editorial =  await this.repository.findOne({
      where : { id : id }
    });
    if( exist) {
      const res : UpdateResult = await this.repository.update(
        { id : id },
        {
          name: editorial.name,
          direction: editorial.direction
        }
      );
      return  res.raw.affectedRows > 0 ;
    }
    return false;
  }

  public async deleteEditorial(id : string): Promise<boolean> {
    const exist: Editorial =  await this.repository.findOne({
        where : { id : id }
    });
    if( exist ){
      const res : DeleteResult = await this.repository.delete({ 
        id : id 
      });
      return res.affected > 0 ;
    }
    return false;
  }

  public async findByName(name : string): Promise<Editorial[]> {
    return await this.repository.find({
      where : { 
        state : 'Activo', 
        name : Like(`%${name}%`)
      }
    });
  }
}