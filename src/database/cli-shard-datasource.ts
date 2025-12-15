import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

// Only for generation of migrations

const CliShardDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_SHARD_0_URL,       
  entities: ['dist/entities/shard-entities/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/shards/*.js'],
  migrationsTableName: 'migrations_shard',
  synchronize: false,
  logging: false,
});

export default CliShardDataSource;
