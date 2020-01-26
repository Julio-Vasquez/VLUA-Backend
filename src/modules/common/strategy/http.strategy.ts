import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus } from '@nestjs/common';
import { AuthService } from './../../auth/auth.service';
import { Response } from './../response/response';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly response : Response,
    private readonly authService: AuthService) {
    super();
  }

  async validate(token: string) {
    const user = await this.authService.validUser(token);
    if (!user) {
      return this.response
        .status({statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED'})
        .message('Token invalido')
        .json()
      ;
    }
    return user;
  }
}