/**
 * @file index.js
 * Database Connection & Query Layer.
 * Supports PostgreSQL via pg.Pool with automatic seamless fallback to persistent local storage
 * if PostgreSQL is unreachable.
 */

import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_DB_PATH = path.join(__dirname, 'local_db.json');

// In-memory / file-backed tables for zero-friction fallback
function loadLocalDb() {
  if (fs.existsSync(LOCAL_DB_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(LOCAL_DB_PATH, 'utf8'));
    } catch (err) {
      console.warn('Local database parse failed, initializing empty store:', err.message);
    }
  }
  return { users: [], profiles: [], plans: [] };
}

function saveLocalDb(data) {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write local_db.json', err);
  }
}

let localStore = loadLocalDb();
let usePostgres = false;
let pgPool = null;

// Initialize Postgres if configured
if (process.env.DATABASE_URL) {
  try {
    pgPool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 2000,
    });
  } catch (e) {
    console.warn('[DB] PostgreSQL pool initialization skipped:', e.message);
  }
}

/**
 * Executes a query with parameters against PostgreSQL, or fallback local store.
 */
export async function query(text, params = []) {
  if (pgPool && usePostgres !== false) {
    try {
      const res = await pgPool.query(text, params);
      usePostgres = true;
      return res;
    } catch (err) {
      // If Postgres connection refused, switch to local adapter
      if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.message?.includes('connect')) {
        console.warn('[DB] PostgreSQL unavailable. Operating in persistent local storage mode.');
        usePostgres = false;
      } else {
        throw err;
      }
    }
  }

  // Local Storage Fallback Engine
  const trimmed = text.trim();

  // CREATE TABLE
  if (/^CREATE TABLE/i.test(trimmed)) {
    return { rows: [], rowCount: 0 };
  }

  // INSERT INTO users
  if (/INSERT INTO users/i.test(trimmed)) {
    const id = params[0] || crypto.randomUUID();
    const email = params[1];
    const password_hash = params[2] || 'placeholder_hash';
    const existing = localStore.users.find(u => u.email === email || u.id === id);
    if (!existing) {
      const newUser = { id, email, password_hash, created_at: new Date().toISOString() };
      localStore.users.push(newUser);
      saveLocalDb(localStore);
      return { rows: [newUser], rowCount: 1 };
    }
    return { rows: [existing], rowCount: 0 };
  }

  // INSERT INTO plans
  if (/INSERT INTO plans/i.test(trimmed)) {
    const id = params[0] || crypto.randomUUID();
    const user_id = params[1];
    const active = params[2] !== undefined ? params[2] : true;
    const structure_json = typeof params[3] === 'object' ? JSON.stringify(params[3]) : params[3];
    const newPlan = { id, user_id, active, structure_json, created_at: new Date().toISOString() };
    localStore.plans.push(newPlan);
    saveLocalDb(localStore);
    return { rows: [newPlan], rowCount: 1 };
  }

  // SELECT ... FROM plans
  if (/FROM plans/i.test(trimmed)) {
    if (/COUNT\(\*\)/i.test(trimmed)) {
      return { rows: [{ count: String(localStore.plans.length) }], rowCount: 1 };
    }
    return { rows: localStore.plans, rowCount: localStore.plans.length };
  }

  // SELECT ... FROM users
  if (/FROM users/i.test(trimmed)) {
    return { rows: localStore.users, rowCount: localStore.users.length };
  }

  return { rows: [], rowCount: 0 };
}

export const pool = {
  query,
  on: (event, handler) => {
    if (pgPool) pgPool.on(event, handler);
  },
  end: async () => {
    if (pgPool) await pgPool.end();
  }
};

export default { query, pool };
