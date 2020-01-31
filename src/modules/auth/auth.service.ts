import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';

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
    const tempPassword : string = await hash(`${login.password}`, 10);
    const realpassword : string = await hash('phurion123', 10);

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
      .andWhere('user.state = :state', { state : 'Activo' })
      .execute()
    ;
    if( res ) {
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

  public async validUser( userName : string, password : string ) {
    return this.userService.validUser(userName, password); 
  }

  public async validUserToken( token ) {
    const payload : any = this.jwtService.decode(token);
    if( !payload )
      return false;
    return await await this.userService.validateUserToken(payload.userName);  
  }
}