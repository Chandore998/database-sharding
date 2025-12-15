import { Provider } from '@nestjs/common';
import { shardDataSources } from '../../database/shard-db-source';
import CentralDataSource from '../../database/central-datasource';

export const SHARD_DATASOURCES = 'SHARD_DATASOURCES';
export const CENTRAL_DATASOURCE = 'CENTRAL_DATASOURCE';

export const shardDataSourceProvider: Provider = {
    provide: SHARD_DATASOURCES,
    useFactory: async () => {
        for (const ds of shardDataSources) {
            if (!ds.isInitialized) await ds.initialize();
        }
        return shardDataSources;
    },
};

export const centralDataSourceProvider: Provider = {
    provide: CENTRAL_DATASOURCE,
    useFactory: async () => {
        if (!CentralDataSource.isInitialized) {
            await CentralDataSource.initialize();
        }
        return CentralDataSource;
    },
};