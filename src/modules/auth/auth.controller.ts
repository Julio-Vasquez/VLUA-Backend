import { Controller, Get, Body, Post, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';

import  Response   from './../common/response/response';

import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController{
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ){}

  @Post('/login')
  public async login(@Body() login : LoginDto){
    let res = await this.authService.login(login);
      if (res) {
        return Response
          .status({ statusCode: HttpStatus.OK, state: 'OK' })
          .message('login OK')
          .json({
            data: this.jwtService.sign(res)
          })
        ;
      }
      return Response
        .status({ statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED'})
        .message('Credenciales no validas')
        .json({ data: [] })
      ;
  }
}