import { Controller, Body, Post, HttpStatus, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';

import  Response   from './../common/response/response';

import { AuthService } from './auth.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


@Controller('auth')
export class AuthController{
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ){}

  @Post('/login')
  public async login(@Body() login : LoginDto){
    const res = await this.authService.login(login);
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

  @Post('files')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {name : 'img1', maxCount : 1},
        {name : 'img2', maxCount : 1}
      ]
    )
  )
  public async uploadFile(@UploadedFiles() files)
  {
    console.log(files);
  }
}