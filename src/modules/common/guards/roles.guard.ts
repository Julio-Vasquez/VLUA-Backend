import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwt: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const rols = this.reflector.get<string[]>('rols', context.getHandler());
    if (!rols) return true;
    const request = context.switchToHttp().getRequest();
    const rol: any = this.jwt.decode(
      request.headers.authorization.split(' ')[1],
    );
    let result = 0;

    for (let i = 0; i < rols.length; i++) {
      result += rols[i] === rol.role ? 1 : 0;
    }
    console.log(request.user && result === 1);
    return request.user && result === 1;
  }
}
