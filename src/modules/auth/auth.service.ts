import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from './../../entities/user.entity';

import { UserService } from '../user/user.service';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ){}

  public async login(login : LoginDto){
    const res = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.username', 'userName')
      .addSelect('user.state', 'state')
      .addSelect('role.role', 'rol')
      .addSelect('people.nameOne', 'name')
      .addSelect('people.lastNameOne', 'lastName')
      .innerJoin('user.role', 'role')
      .leftJoin('user.people', 'people')
      .where('user.userName = :userName', { userName : login.userName})
      .andWhere('user.password = PASSWORD(:password)', { password : login.password})
      .andWhere('user.state = :state', { state : 'Activo' })
      .execute()
    ;
    if( res && res.length > 0 ) {
      return {
        name : res[0].name,
        lastName : res[0].lastName,
        userName : res[0].userName,
        role : res[0].rol,
        state : res[0].state,
        start: (new Date().getTime() /1000),
        end:  Math.round(new Date().getTime() /1000) + 21600
      };
    }
    return false;
  }

  public async validUser( token ) {
    const payload : any = this.jwtService.decode(token);
    if( payload )
      return await this.userService.validUser(payload.userName);
    return false;
  }
}