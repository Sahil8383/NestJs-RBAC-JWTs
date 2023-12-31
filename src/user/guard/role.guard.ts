import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../entites/role.entites";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const role = this.reflector.getAllAndOverride<Role>('role', [
            context.getHandler(),
            context.getClass()
        ]);

        if (!role) {
            return true;
        }
        
        const token = context.switchToHttp().getRequest().headers.authorization.split(' ')[1];
        const decodedToken = new JwtService({}).decode(token); 

        return role === decodedToken['sub']['role'];
    }
}