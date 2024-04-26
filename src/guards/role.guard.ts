import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, ACESS_KEY } from '../decorators';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requeridRoles = this.reflector.getAllAndOverride<Role[]>(ACESS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requeridRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    const rolesFilted = requeridRoles.filter(
      (role) => role === Number(user.typeRole),
    );

    return rolesFilted.length > 0;
  }
}
