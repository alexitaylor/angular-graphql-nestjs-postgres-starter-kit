import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { environment } from '../../environments/environment';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request) {
      if (!request.headers.authorization) {
        return false;
      }
      request.me = await this.validateToken(request.headers.authorization);
      return this.validateRole(request.me, context);
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();
      if (!ctx.headers.authorization) {
        return false;
      }
      ctx.me = await this.validateToken(ctx.headers.authorization);
      return this.validateRole(ctx.me, context);
    }
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];

    try {
      const decoded: any = await jwt.verify(token, environment.secret);

      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }

  async validateRole(user, context) {
    const roles = this.reflector
      .get<string[]>('roles', context.getHandler())
      .map(role => role.toUpperCase());
    if (!roles) {
      return true;
    }

    const hasRole = () => !!roles.find(item => item === user.roleName);
    return user && user.roleName && hasRole();

    // use this if user has multiple roles
    // const hasRole = () => user.roles.some((role) => roles.includes(role));
    // return user && user.roles && hasRole();
  }
}
