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
    const user = request.user;
    const rol: any = this.jwt.decode(
      request.headers.authorization.split(' ')[1],
    );
    let result = 0;
    for (let item in rols) {
      result += item === rol.role ? 1 : 0;
    }
    return user && result === 1;
  }
}
