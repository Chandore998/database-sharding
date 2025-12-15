import { shardDataSources } from "../shard-db-source";

async function runMigrationsOnAllShards() {
  for (const ds of shardDataSources) {
    console.log(`Running migrations on ${ds.options.name}...`);

    await ds.initialize();
    await ds.runMigrations();
    await ds.destroy();

    console.log(`✅ Done for ${ds.options.name}`);
  }
}

runMigrationsOnAllShards()
  .then(() => {
    console.log('All shard migrations completed.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
