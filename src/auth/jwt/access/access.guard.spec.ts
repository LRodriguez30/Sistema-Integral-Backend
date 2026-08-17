import { JwtAccessGuard } from './access.guard';
import { JwtAccessService } from './access.service';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('JwtAccessGuard', () => {
  let guard: JwtAccessGuard;
  let jwtAccessService: JwtAccessService;

  beforeEach(() => {
    jwtAccessService = {
      verifyAccessToken: jest.fn(),
    } as any;

    guard = new JwtAccessGuard(jwtAccessService);
  });

  function mockExecutionContext(
    headers: any = {},
    cookies: any = {}
  ): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers,
          cookies,
        }),
      }),
    } as ExecutionContext;
  }

  it('should throw if no token is provided', () => {
    const context = mockExecutionContext();

    expect(() => guard.canActivate(context)).toThrow(
      UnauthorizedException
    );
  });

  it('should throw if token is invalid', () => {
    (jwtAccessService.verifyAccessToken as jest.Mock).mockReturnValue(null);

    const context = mockExecutionContext({
      authorization: 'Bearer invalid-token',
    });

    expect(() => guard.canActivate(context)).toThrow(
      UnauthorizedException
    );
  });

  it('should allow access if token is valid', () => {
    (jwtAccessService.verifyAccessToken as jest.Mock).mockReturnValue({
      sub: 'uuid-test',
    });

    const context = mockExecutionContext({
      authorization: 'Bearer valid-token',
    });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('should attach payload to request.user', () => {
    const payload = { sub: 'uuid-test' };

    (jwtAccessService.verifyAccessToken as jest.Mock).mockReturnValue(payload);

    const context = mockExecutionContext({
      authorization: 'Bearer valid-token',
    });

    const request = context.switchToHttp().getRequest();

    guard.canActivate(context);

    expect(request.user).toEqual(payload);
  });
});