import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CheckCookieMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.hasAccessToken  = Boolean(req.cookies?.accessToken);
    req.hasRefreshToken = Boolean(req.cookies?.refreshToken);
    next();
  }
}