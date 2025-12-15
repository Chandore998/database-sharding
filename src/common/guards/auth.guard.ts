import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { SystemConstants } from "../constant/system-constants";
import { TenantService } from "src/modules/shard/tenant.service";
import { TenantStatus } from "src/central-entities/tenant.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements  CanActivate{
    private readonly jwtSecret: string;
    constructor(
        private jwtService: JwtService,
        private readonly tenantService: TenantService,
        private configService: ConfigService
    ) {
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not configured');
        }
        this.jwtSecret = jwtSecret;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest(); 
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        let payload : any

        try{

            payload = await this.jwtService.verifyAsync(
                token,
                {
                  secret: this.jwtSecret
                }
            );

            request['user'] = payload;

        }
        catch(error){
            throw new UnauthorizedException();
        }

        const userId = payload.uid
        const tenentId = payload.tid

        if(!userId || !tenentId){
            throw new UnauthorizedException('Invalid token payload');
        }

        const tenant = await this.tenantService.findByTenantId(tenentId)
        if(!tenant){
            throw new UnauthorizedException('Tenant does not exist');
        }

        if (tenant?.status !== TenantStatus.ACTIVE) {
            throw new UnauthorizedException('Tenant is not active');
        }

        request['user'] = {
            userId : payload.uid,
            tenantId : payload.tid,
        };

        return true
    }

}