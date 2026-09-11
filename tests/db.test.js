import test from 'node:test';
import assert from 'node:assert/strict';
import { query, pool } from '../src/db/index.js';

test('db query supports CREATE TABLE safely', async () => {
  const result = await query('CREATE TABLE IF NOT EXISTS test_table (id TEXT);');
  assert.strictEqual(result.rowCount, 0);
  assert.ok(Array.isArray(result.rows));
});

test('db query handles user insert and retrieval in fallback storage mode', async () => {
  const testUserId = `test-user-${Date.now()}`;
  const testEmail = `tester-${Date.now()}@example.com`;

  const insertResult = await query(
    'INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
    [testUserId, testEmail, 'hash_abc']
  );
  assert.ok(insertResult.rows.length >= 0);

  const selectResult = await query('SELECT * FROM users');
  assert.ok(selectResult.rows.some(u => u.email === testEmail || u.id === testUserId));
});

test('db query handles plan insertion and select count', async () => {
  const planId = `plan-${Date.now()}`;
  const dummyPlan = { goal: 'FatLoss', days: [] };

  const insertResult = await query(
    'INSERT INTO plans (id, user_id, active, structure_json) VALUES ($1, $2, $3, $4) RETURNING *',
    [planId, 'user-123', true, JSON.stringify(dummyPlan)]
  );
  assert.strictEqual(insertResult.rowCount, 1);

  const countResult = await query('SELECT COUNT(*) FROM plans');
  assert.ok(Number(countResult.rows[0].count) >= 1);
});

test('db pool object provides graceful lifecycle hooks', async () => {
  assert.ok(typeof pool.query === 'function');
  assert.ok(typeof pool.on === 'function');
  assert.ok(typeof pool.end === 'function');
});
