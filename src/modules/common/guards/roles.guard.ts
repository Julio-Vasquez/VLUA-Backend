import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rols = this.reflector.get<string[]>('rols', context.getHandler());
    
    if (!rols) return true
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    console.log("Guard Rol", user);
    
    const hasRole = () => user.rols.some((rol) => !!rols.find((item) => item === rol));
    return user && user.rols && hasRole();
  }
}