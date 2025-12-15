import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Tenant, TenantStatus } from '../../central-entities/tenant.entity';
import { CENTRAL_DATASOURCE } from './shard-provider';
import { ShardRouterService } from './shard-router.service';
import { HelperService } from 'src/common/helpers/helper.service';

@Injectable()
export class TenantService {
    constructor(
        @Inject(CENTRAL_DATASOURCE) private readonly centralDataSource: DataSource,
        private readonly shardRouterService: ShardRouterService,
        private readonly helperService : HelperService
    ) {}

    // central repository 
    private repo(): Repository<Tenant> {
        return this.centralDataSource.getRepository(Tenant);
    }

    async findByIdentifier(identifier: string): Promise<Tenant | null> {
        return this.repo().findOne({ where: { identifier } });
    }

    async findByTenantId(tenantId: string): Promise<Tenant | null> {
        return this.repo().findOne({ where: { id: tenantId } });
    }

    async createFromEmail(email: string): Promise<Tenant> {
        const domain = this.helperService.getEmailDomain(email);
        if (!domain) {
          throw new ConflictException('Invalid email domain');
        }
    
        const existing = await this.findByIdentifier(domain);
        if (existing) return existing;
    
        const tenantId = crypto.randomUUID();
        const shardIndex = this.shardRouterService.getIndexForTenantId(tenantId);
    
        const tenant = this.repo().create({
          id: tenantId,
          identifier: domain,
          name: domain,
          shard_index: shardIndex,
          status: TenantStatus.ACTIVE,
        });
    
        return this.repo().save(tenant);
    }

    async getShardDataSource(tenantId: string): Promise<DataSource> {
        const tenant = await this.findByTenantId(tenantId);
        if (!tenant) {
          throw new NotFoundException('Tenant not found');
        }
        return this.shardRouterService.getDataSourceByIndex(tenant.shard_index);
    }

    async fetchByIdentifier(identifier){
        const tenantDomain = this.helperService.getEmailDomain(identifier)
        if(!tenantDomain) return 

        const checkTenant = await this.findByIdentifier(tenantDomain)
        if(!checkTenant) return 

        return checkTenant.id
    }

}

