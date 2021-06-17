import knex from 'knex';
import { env } from '../config';
import knexConfig from '../../knexfile';

export default knex(knexConfig[env]);
