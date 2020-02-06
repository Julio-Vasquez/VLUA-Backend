import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  Request,
  Response,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  use(@Request() req, @Response() res, next: Function) {
    console.log(req.headers.authorization.split(' ')[1]);
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = this.jwt.verify(req.headers.authorization.split(' ')[1]);
      if (token && token.exp > Math.round(new Date().getTime() / 1000)) {
        next();
      } else {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ data: 'Token Expirado' });
      }
    }
    return res
      .status(HttpStatus.NOT_ACCEPTABLE)
      .json({ data: 'Token invalido, Headers Authorization requeridos' });
  } //cambiar texto
}
