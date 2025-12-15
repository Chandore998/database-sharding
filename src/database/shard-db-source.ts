import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

// Define multiple shard data sources

export const shardDataSources = [
  new DataSource({
    name: 'shard0',
    type: 'postgres',
    url: process.env.DB_SHARD_0_URL,
    entities: ['dist/entities/shard-entities/*.entity{.ts,.js}'],
    migrationsTableName: "migrations",
    migrations: ['dist/migrations/shards/*.js'],
    synchronize: false,
    logging: false,
  }),
  new DataSource({
    name: 'shard1',
    type: 'postgres',
    url: process.env.DB_SHARD_1_URL,
    entities: ['dist/entities/shard-entities/*.entity{.ts,.js}'],
    migrationsTableName: "migrations",
    migrations: ['dist/migrations/shards/*.js'],
    synchronize: false,
    logging: false,
  }),
  new DataSource({
    name: 'shard2',
    type: 'postgres',
    url: process.env.DB_SHARD_2_URL,
    entities: ['dist/entities/shard-entities/*.entity{.ts,.js}'],
    migrationsTableName: "migrations",
    migrations: ['dist/migrations/shards/*.js'],
    synchronize: false,
    logging: false,
  }),
];
