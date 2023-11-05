import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtTokenService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      new UnauthorizedException();
    }
    try {
      const payload = await this.jwtTokenService.verifyAsync(token, {
        secret: this.configService.get<string>('auth.jwtSecret')
      });

      req['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(header: string | undefined): string | null {
    const [type, token] = header?.split(' ') ?? [];
    return type === 'Bearer' && token ? token : null;
  }
}
