import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../auth.service';

/**
 * Guardia para validar la solicitud de un token de acceso
 * - Autenticación: 'Bearer token...'
 * - Seguridad: 'Sin refresh token'
 */
@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    // Obtiene el token de la cabecera
    // Si no hay, revisa cookies
    const token =
      req.headers?.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.replace('Bearer ', '')
        : req.cookies?.refreshToken?.token_hash;

    // Si no se obtuvo el token negar acceso
    if (!token) {
      throw new UnauthorizedException({
        message: 'Refresh token missing...',
        errorCode: 401011
      });
    }

    // Verificar que el token sea válido
    const currentUser = await this.authService.validateRefreshToken(token);

    // Utilizar identificación para procesar la solicitud
    req.user = currentUser;
    return true;
  }
}