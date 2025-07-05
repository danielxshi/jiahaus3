import * as migration_20250705_033625_projects from './20250705_033625_projects';

export const migrations = [
  {
    up: migration_20250705_033625_projects.up,
    down: migration_20250705_033625_projects.down,
    name: '20250705_033625_projects'
  },
];
