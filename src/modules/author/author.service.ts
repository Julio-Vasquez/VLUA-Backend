import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult, Like } from 'typeorm';

import { Author } from './../../entities/author.entity';
import { AuthorDto } from './dto/author.dto';
import { State } from './../../entities/enums/state.enum';

@Injectable()
export class AuthorService
{
  constructor(
    @InjectRepository(Author)
    private readonly repository : Repository<Author>
  ){}

  public async createAuthor(author : AuthorDto) : Promise<boolean>
  {
    const res : Author = await this.repository.findOne(
      {
        name : author.name,
        lastName: author.lastName
      }
    );
   console.log(res);
    if(!res)
    {
      await this.repository.insert(
        {
          name : author.name,
          lastName: author.lastName,
          dateBirth: author.dateBirth,
          state: State.Active
        }
      );
      return true;
    }
    return false;
  }

  public async findAll(): Promise<Author[]>
  {
    return await this.repository.find(
      {
        where : { state : 'Activo'}
      }
    );
  }

  public async updateAuthor(author : AuthorDto, id : string): Promise<boolean>
  {
    const exist: Author[] =  await this.repository.find(
      {
        where : {
          id : id
        }
      }
    );
    if(exist.length === 1){
      const res : UpdateResult = await this.repository.update(
        {
          id : id
        },
        {
          name: author.name,
          lastName: author.lastName,
          dateBirth: author.dateBirth
        }
      );
      return res.affected > 0 ;
    }
    return false;
  }

  public async deleteAuthor(id : string): Promise<boolean>
  {
    const exist: Author[] =  await this.repository.find(
      {
        where : {
          id : id
        }
      }
    );
    if(exist.length === 1)
    {
      const res : DeleteResult = await this.repository.delete(
        {  
          id : id
        }
      );
      return res.affected > 0 ;
    }
    return false;
  }

  public async findByName(name : string): Promise<Author[]>
  {
    return await this.repository.find(
      { 
        where : { 
          state : 'Activo', 
          name : Like(`%${name}%`)
        } 
      }
    );
  }
}