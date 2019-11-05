import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserNameDto } from './dto/username.dto';

@Injectable()
export class UserService
{
  constructor(
    @InjectRepository(User)
    private readonly repository : Repository<User>
  ){}
    
  public async myProfile(username : UserNameDto){

  }

  public async validUser(jwt: any): Promise<any> {
    console.log(jwt.idUser)
    let res = await this.repository
        .createQueryBuilder("user")
        .select("user.id", "idUser")
        .addSelect("user.UserName", "userName")
        .where("user.userName = :userName", { userName: jwt.userName })
        .getOne()
    ;
    return (res) ? jwt : false;
  }


}