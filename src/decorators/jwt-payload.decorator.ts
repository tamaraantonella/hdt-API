import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req: unknown = ctx.switchToHttp().getRequest();
    if (typeof req !== 'object' || !('user' in req)) {
      throw new UnauthorizedException();
    }
    return req.user;
  }
);
