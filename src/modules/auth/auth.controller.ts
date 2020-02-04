import { Controller, Body, Post, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';

import { Response } from './../common/response/response';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly response: Response,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  public async login(@Body() login: LoginDto) {
    const res = await this.authService.login(login);
    if (res) {
      return this.response
        .status({ statusCode: HttpStatus.OK, state: 'OK' })
        .message('login OK')
        .json({ data: this.jwtService.sign(res) });
    }
    return this.response
      .status({ statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED' })
      .message('Credenciales no validas')
      .json({ data: [] });
  }
}
