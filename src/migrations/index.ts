import * as migration_20260220_010812_initial_migration from './20260220_010812_initial_migration';
import * as migration_20260220_033059_add_events_collection from './20260220_033059_add_events_collection';
import * as migration_20260304_173424_add_categories from './20260304_173424_add_categories';

export const migrations = [
  {
    up: migration_20260220_010812_initial_migration.up,
    down: migration_20260220_010812_initial_migration.down,
    name: '20260220_010812_initial_migration',
  },
  {
    up: migration_20260220_033059_add_events_collection.up,
    down: migration_20260220_033059_add_events_collection.down,
    name: '20260220_033059_add_events_collection',
  },
  {
    up: migration_20260304_173424_add_categories.up,
    down: migration_20260304_173424_add_categories.down,
    name: '20260304_173424_add_categories'
  },
];
