import { Controller, Post, Get, Body, HttpStatus } from '@nestjs/common';

import  Response   from './../common/response/response';

import { UserService } from './user.service';
import { UserNameDto } from './dto/username.dto';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService : UserService
  ){}

  @Post('/profile')
  public async myProfile(@Body() un : UserNameDto) {
    const res  = await this.userService.myProfile( un );
    if( res.length > 0 ){
      return Response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('profile OK')
        .json({ data: res })
      ;
    }
    return Response
      .status({ statusCode: HttpStatus.NO_CONTENT, state: 'NO_CONTENT'})
      .message('Credenciales no validas')
      .json({ data: [] })
    ;
  }
}