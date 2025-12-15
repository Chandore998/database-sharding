import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { SHARD_DATASOURCES } from './shard-provider';

@Injectable()
export class ShardRouterService {
    constructor(
        @Inject(SHARD_DATASOURCES) private readonly shards: DataSource[],
    ) { }

    private hashStringToNumber(key: string) {
        let h = 2166136261 >>> 0;
        for (let i = 0; i < key.length; i++) {
            h ^= key.charCodeAt(i);
            h = Math.imul(h, 16777619) >>> 0;
        }
        return h;
    }

    getIndexForTenantId(tenantId: string) {
        const hash = this.hashStringToNumber(tenantId);
        return Math.abs(hash) % this.shards.length;
    }

    getDataSourceByTenant(tenantId: string): DataSource {
        const idx = this.getIndexForTenantId(tenantId);
        return this.shards[idx];
    }

    getDataSourceByIndex(index: number): DataSource {
        if (!this.shards[index]) {
          throw new Error(`Shard index ${index} not found`);
        }
        return this.shards[index];
    }
}