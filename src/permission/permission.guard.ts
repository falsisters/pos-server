import {
  Injectable,
  CanActivate,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException } from '@nestjs/common';

// Create a custom decorator to specify required permissions
export const RequirePermission = (permission: string) =>
  SetMetadata('requiredPermission', permission);

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the required permission from the decorator
    const requiredPermission = this.reflector.get<string>(
      'requiredPermission',
      context.getHandler(),
    );

    if (!requiredPermission) {
      return true; // No permission required
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // This comes from your CashierAuthGuard

    // Check if user has the required permission
    const hasPermission = user.permissions.some(
      (p: { name: string }) => p.name === requiredPermission,
    );

    if (!hasPermission) {
      throw new UnauthorizedException(
        `Missing required permission: ${requiredPermission}`,
      );
    }

    return true;
  }
}
