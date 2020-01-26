import { Injectable, NestMiddleware, HttpStatus, Req  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../../auth/auth.service';
import { Response } from './../response/response';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwt : JwtService,
    private readonly res : Response
  ){}

   use(@Req() req, next : Function) {
    if (req.headers && req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = this.jwt.verify(req.headers.authorization.split(' ')[1]);
      if (token &&  token.end > Math.round(new Date().getTime() / 1000)) { 
        next();
      }else {
        return this.res
          .status({ statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED'})
          .message('token expirado')
          .json({ data: 'invalid token' })
        ;
      }
    }
    return this.res
      .status({ statusCode: HttpStatus.UNAUTHORIZED, state: 'UNAUTHORIZED'})
      .message('token no suministrado')
      .json({ data: [] })
    ;
  }
}