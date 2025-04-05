import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw new UnauthorizedException('Es requerido estar autenticado');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token inválido o mal formado');

    try {
      const payload: JwtPayload = this.jwtService.verify<JwtPayload>(token);
      req.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Error al reconocer el token');
    }
  }
}
