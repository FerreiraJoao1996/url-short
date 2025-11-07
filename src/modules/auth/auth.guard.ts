import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
import { AuthedRequest } from './dto/auth-request';
import { Reflector } from '@nestjs/core';
dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthedRequest>();

    const isOptional = this.reflector.get<boolean>('isOptional', context.getHandler());

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      if (isOptional) {
        request.user = undefined;
        return true;
      }
      throw new UnauthorizedException('Token ausente');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      request.user = { id: payload.id, email: payload.email };
      return true;
    } catch {
      if (isOptional) {
        request.user = undefined;
        return true;
      }

      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
