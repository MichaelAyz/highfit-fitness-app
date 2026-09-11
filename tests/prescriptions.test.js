import test from 'node:test';
import assert from 'node:assert/strict';
import { getSlotPrescription } from '../src/engine/prescriptions.js';
import { GOAL } from '../src/engine/types.js';

test('getSlotPrescription assigns heavier strength ranges for Primary muscle gain', () => {
  const rx = getSlotPrescription('Primary', 'Med', 'High', GOAL.MUSCLE_GAIN);
  assert.strictEqual(rx.sets, '3–4');
  assert.strictEqual(rx.reps, '6–8');
  assert.strictEqual(rx.rpe, 'RPE 8–9');
  assert.strictEqual(rx.rest, '120–180s');
  assert.ok(rx.progression.includes('Double progression'));
});

test('getSlotPrescription reduces sets under Low volume tier', () => {
  const rx = getSlotPrescription('Primary', 'Low', 'Med', GOAL.FAT_LOSS);
  assert.strictEqual(rx.sets, '2–3');
  assert.strictEqual(rx.reps, '6–8');
  assert.strictEqual(rx.rpe, 'RPE 8');
});

test('getSlotPrescription provides hypertrophy parameters for Secondary slots', () => {
  const rx = getSlotPrescription('Secondary', 'Med', 'Med', GOAL.MUSCLE_GAIN);
  assert.strictEqual(rx.sets, '3');
  assert.strictEqual(rx.reps, '8–12');
  assert.strictEqual(rx.rpe, 'RPE 7–8');
  assert.strictEqual(rx.rest, '60–90s');
});

test('getSlotPrescription provides endurance and accessory parameters', () => {
  const rx = getSlotPrescription('Accessory', 'Low', 'Med', GOAL.FAT_LOSS);
  assert.strictEqual(rx.sets, '2');
  assert.strictEqual(rx.reps, '12–15');
  assert.strictEqual(rx.rpe, 'RPE 8–9');
  assert.strictEqual(rx.rest, '45–60s');
});

test('getSlotPrescription configures conditioning intervals appropriately', () => {
  const rx = getSlotPrescription('Conditioning', 'Med', 'Med', GOAL.FAT_LOSS);
  assert.strictEqual(rx.sets, '3–4 rounds');
  assert.strictEqual(rx.reps, '30–45s work');
  assert.strictEqual(rx.rest, '30s rest');
});
