import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpStatus } from '@nestjs/common';

import { AuthService } from './../../auth/auth.service';
import { Response } from './../response/response';
import { JwtKey } from './../environment/environment';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService : AuthService,
    private readonly response : Response
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtKey,
    });
  }

  async validate(payload: any, done: Function) {
    const user = await this.authService.validUserToken(payload);
    if (!user) {
      //return done(new UnauthorizedException(), false);
      return done(this.response
        .status({statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED'})
        .message('Token Invalido')
        .json(), 
      false);
    }
    done(null, user);
  }
}