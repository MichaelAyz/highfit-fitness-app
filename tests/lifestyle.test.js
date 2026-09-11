import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRecoveryCapacity,
  mapStressLoad,
  mapTimeConstraint,
  deriveLifestyleScores,
} from '../src/engine/lifestyle.js';
import { LEVEL_3, TIME_CONSTRAINT } from '../src/engine/types.js';

test('calculateRecoveryCapacity starts at 100 baseline and subtracts appropriate penalties', () => {
  // Optimal: High sleep, Low stress, age <= 40 -> 100
  const optimal = calculateRecoveryCapacity(LEVEL_3.HIGH, LEVEL_3.LOW, 25);
  assert.strictEqual(optimal, 100);

  // Moderate penalties: Med sleep (-10), Med stress (-10), age 30 -> 80
  const moderate = calculateRecoveryCapacity(LEVEL_3.MED, LEVEL_3.MED, 30);
  assert.strictEqual(moderate, 80);

  // Severe penalties: Low sleep (-20), High stress (-20), age 45 (-10) -> 50
  const fatigued = calculateRecoveryCapacity(LEVEL_3.LOW, LEVEL_3.HIGH, 45);
  assert.strictEqual(fatigued, 50);
});

test('calculateRecoveryCapacity is properly clamped between 0 and 100', () => {
  const overclamped = calculateRecoveryCapacity(LEVEL_3.HIGH, LEVEL_3.LOW, 18);
  assert.ok(overclamped <= 100);

  const underclamped = calculateRecoveryCapacity(LEVEL_3.LOW, LEVEL_3.HIGH, 99);
  assert.ok(underclamped >= 0);
});

test('mapStressLoad maps strings accurately to canonical 3-level scale', () => {
  assert.strictEqual(mapStressLoad(LEVEL_3.HIGH), LEVEL_3.HIGH);
  assert.strictEqual(mapStressLoad(LEVEL_3.MED), LEVEL_3.MED);
  assert.strictEqual(mapStressLoad(LEVEL_3.LOW), LEVEL_3.LOW);
  assert.strictEqual(mapStressLoad('unknown'), LEVEL_3.LOW);
});

test('mapTimeConstraint categorizes minute durations into Severe, Moderate, and Open', () => {
  // < 45 min -> Severe
  assert.strictEqual(mapTimeConstraint(30), TIME_CONSTRAINT.SEVERE);
  assert.strictEqual(mapTimeConstraint(44), TIME_CONSTRAINT.SEVERE);

  // 45-60 min -> Moderate
  assert.strictEqual(mapTimeConstraint(45), TIME_CONSTRAINT.MODERATE);
  assert.strictEqual(mapTimeConstraint(60), TIME_CONSTRAINT.MODERATE);

  // > 60 min -> Open
  assert.strictEqual(mapTimeConstraint(75), TIME_CONSTRAINT.OPEN);
  assert.strictEqual(mapTimeConstraint(90), TIME_CONSTRAINT.OPEN);
});

test('deriveLifestyleScores aggregates all lifestyle dimensions accurately', () => {
  const input = {
    sleepQuality: LEVEL_3.MED,
    stressLevel: LEVEL_3.HIGH,
    age: 35,
    timeAvailable: 45,
  };
  const scores = deriveLifestyleScores(input);
  assert.strictEqual(scores.recovery_capacity, 70); // 100 - 10 (sleep) - 20 (stress)
  assert.strictEqual(scores.stress_load, LEVEL_3.HIGH);
  assert.strictEqual(scores.time_constraint, TIME_CONSTRAINT.MODERATE);
});
