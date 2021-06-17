import path from 'path';
import { Knex } from 'knex';

import {
  dbUri, dbDebug, testDbUri, testDbDebug,
} from './src/config';

const BASE_PATH = path.join(__dirname, 'src/db');

const common: Knex.Config = {
  client: 'pg',
  connection: dbUri,
  debug: dbDebug,
  migrations: {
    tableName: 'migrations',
    directory: path.join(BASE_PATH, 'migrations'),
  },
  seeds: {
    directory: path.join(BASE_PATH, 'seeds'),
  },
};

const config: {
  [key: string]: Knex.Config
} = {
  test: {
    ...common,
    connection: testDbUri,
    debug: testDbDebug,
  },
  development: common,
  staging: common,
  production: {
    ...common,
    pool: {
      min: 2,
      max: 20,
    },
  },
}

export default config;
