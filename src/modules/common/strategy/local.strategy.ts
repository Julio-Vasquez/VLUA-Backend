import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, HttpStatus } from '@nestjs/common';

import { AuthService } from './../../auth/auth.service';
import { Response } from './../response/response';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService : AuthService,
    private readonly response : Response
  ) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
    });
  }

  private readonly logger = new Logger(AuthService.name);

  public async validate(username : string, password : string){
    console.log('entro')
    console.log(`Username ${username}`);
    const user = await this.authService.validUser(username, password);
    this.logger.log(user);
    if (!user) {
      return this.response
        .status({statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED'})
        .message('Credenciales invalidas')
        .json()
      ;
    }
    return user;
  }
}