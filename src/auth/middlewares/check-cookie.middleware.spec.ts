import { CheckCookieMiddleware } from './check-cookie.middleware';

describe('CheckCookieMiddleware', () => {
  it('should be defined', () => {
    expect(new CheckCookieMiddleware()).toBeDefined();
  });
});
