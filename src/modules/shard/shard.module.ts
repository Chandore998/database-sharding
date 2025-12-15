import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { ShardRouterService } from './shard-router.service';
import { shardDataSourceProvider, centralDataSourceProvider } from './shard-provider';
import { HelperModule } from 'src/common/helpers/helper.module';

@Module({
    imports:[HelperModule],
    providers: [
        shardDataSourceProvider,
        centralDataSourceProvider,
        ShardRouterService,
        TenantService,
    ],
    exports: [
        ShardRouterService,
        TenantService,
    ],
})
export class ShardModule {}

