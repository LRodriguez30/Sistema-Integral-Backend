import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { UsersRole } from './enums/users-role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    // Utilizar identificación para procesar la solicitud
    if (req.user.role !== UsersRole.Admin && req.user.role !== UsersRole.Dueño) {
        throw new UnauthorizedException("Access denied. It's required high level permissions to access this route...");
    }

    return true;
  }
}