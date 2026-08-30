import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAccessService } from './access.service';

/**
 * Guardia de acceso para los Endpoints del backend
 * - Autenticación: 'Bearer token...'
 * - Seguridad: 'Sin access token 401'
 * - Token: 'Payload'
 *   - emisor: Sistema Integral Backend
 */
@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(private readonly jwtAccessService: JwtAccessService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    // Obtiene el token de la cabecera
    // Si no hay, revisa cookies
    const token =
      req.headers?.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.replace('Bearer ', '')
        : req.cookies?.accessToken;

    // Si no se obtuvo el token negar acceso
    if (!token) {
      throw new UnauthorizedException({
        message: 'Access token missing...',
        error: 'Unauthorized',
        statusCode: 401
      });
    }

    // Verificar que el token sea válido
    const payload = this.jwtAccessService.verifyAccessToken(token);

    // Utilizar identificación para procesar la solicitud
    req.user = payload;
    return true;
  }
}