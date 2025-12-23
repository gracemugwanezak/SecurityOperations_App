import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // 1. Get required roles from the @Roles() decorator
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const request = context.switchToHttp().getRequest();
        const user = request.user; // Attached by JwtAuthGuard

        // 2. SAFETY CHECK: If no user is found, deny access
        if (!user) return false;

        // 3. ADMIN OVERRIDE: Admin can access everything
        if (user.role === Role.ADMIN) {
            return true;
        }

        // 4. PUBLIC ROUTE: If no roles are defined on the route, let them in
        if (!requiredRoles) {
            return true;
        }

        // 5. ROLE CHECK: Check if the user's role matches one of the allowed roles
        return requiredRoles.includes(user.role);
    }
}