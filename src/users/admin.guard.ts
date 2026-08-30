import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UsersRole } from './enums/users-role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    // Utilizar identificación para procesar la solicitud
    if (req.user.role !== UsersRole.SUPERADMINISTRADOR &&
        req.user.role !== UsersRole.ADMINISTRADORGERENCIAL &&
        req.user.role !== UsersRole.ADMINISTRADORCONTABLE &&
        req.user.role !== UsersRole.ADMINISTRADOROPERATIVO) {
        throw new UnauthorizedException("Acceso denegado. Se requieren permisos superiores para acceder esta ruta...");
    }

    return true;
  }
}