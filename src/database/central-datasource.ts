import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const CentralDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_CENTRAL_POSTGRES_URL,  
  entities: ['dist/central-entities/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/central/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: false,
});

export default CentralDataSource;
