import {drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './schema.js';

const connectionString = 'postgresql://coach:coach_dev_password@localhost:5432/coach';

const pool = new pg.Pool({
  connectionString,
});

export const db = drizzle(pool, {schema});
