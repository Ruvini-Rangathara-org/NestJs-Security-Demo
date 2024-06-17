import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Role from '../constant/role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { MemberService } from '../../member/member.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService,private memberService: MemberService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request= context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // decode token
    const decoded = this.jwtService.decode(token);

    // find member
    const member = await this.memberService.findOne(decoded.id);

    return requiredRoles.some((role) => member.roles?.includes(role));
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}