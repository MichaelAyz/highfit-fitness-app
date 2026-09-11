import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

let server;
let baseUrl;

test.before(async () => {
  await new Promise(resolve => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise(resolve => {
    server.close(resolve);
  });
});

test('GET /api/health returns 200 and status ok', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.status, 'ok');
  assert.ok(data.timestamp);
});

test('POST /api/v1/analyze performs deterministic constraint and simulation analysis', async () => {
  const payload = {
    age: 26,
    gender: 'Male',
    weightKg: 75,
    heightCm: 175,
    goal: 'MuscleGain',
    sleepQuality: 'High',
    stressLevel: 'Low',
    timeAvailable: 60,
    daysAvailable: 4,
    equipment_access: ['Barbell', 'Dumbbell'],
    injuries: []
  };

  const res = await fetch(`${baseUrl}/api/v1/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(data.nutrition);
  assert.ok(data.lifestyle_scores);
  assert.ok(data.training_strategy);
  assert.ok(data.simulation);
  assert.strictEqual(data.nutrition.protein_target, 150);
});

test('POST /api/v1/analyze returns 400 with descriptive error on invalid inputs', async () => {
  const badPayload = {
    age: 12, // Invalid: < 18
    gender: 'Invalid',
    weightKg: -5
  };

  const res = await fetch(`${baseUrl}/api/v1/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(badPayload)
  });

  assert.strictEqual(res.status, 400);
  const data = await res.json();
  assert.ok(data.message.includes('Validation Failed'));
});

test('GET /api/v1/exercises returns full exercise catalog', async () => {
  const res = await fetch(`${baseUrl}/api/v1/exercises`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.ok(data.total >= 50);
  assert.ok(Array.isArray(data.exercises));
});

test('GET unknown route returns 404 JSON', async () => {
  const res = await fetch(`${baseUrl}/api/v1/non-existent-route`);
  assert.strictEqual(res.status, 404);
  const data = await res.json();
  assert.ok(data.error.includes('Route not found'));
});
