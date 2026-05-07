#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const databaseUrl = process.env.DATABASE_URL || './data/tickets.db';
const sqlFile = process.argv[2] || './data/demo-tickets.sql';

if (!fs.existsSync(sqlFile)) {
  console.error(`Fant ikke SQL-fil: ${sqlFile}`);
  process.exit(1);
}

const dbPath = databaseUrl.replace(/^sqlite:/, '');
const dbDir = path.dirname(dbPath);
fs.mkdirSync(dbDir, { recursive: true });

const sqliteCheck = spawnSync('sqlite3', ['--version'], { encoding: 'utf8' });
if (sqliteCheck.error) {
  console.error('sqlite3 CLI er ikke installert eller ikke i PATH.');
  console.error('Alternativ: importer data/demo-tickets.sql med databiblioteket prosjektet ditt bruker.');
  process.exit(1);
}

const result = spawnSync('sqlite3', [dbPath, `.read ${sqlFile}`], {
  encoding: 'utf8',
  shell: process.platform === 'win32',
});

if (result.status !== 0) {
  console.error('Seed feilet:');
  console.error(result.stderr || result.stdout);
  process.exit(result.status || 1);
}

console.log(`Demo-data lagt inn i ${dbPath}`);
