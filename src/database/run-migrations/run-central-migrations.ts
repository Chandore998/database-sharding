// src/database/run-migrations/run-central-migrations.ts

import CentralDataSource from "../central-datasource";

async function run() {
  try {
    if (!CentralDataSource.isInitialized) await CentralDataSource.initialize();

    console.log('Running central migrations...');

    await CentralDataSource.runMigrations();

    console.log('Central migrations complete.');
    
  } catch (err) {
    console.error('Central migration error:', err);
    process.exit(1);
  } finally {
    if (CentralDataSource.isInitialized) await CentralDataSource.destroy();
  }
}

run();
