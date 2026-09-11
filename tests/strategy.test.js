import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveTrainingStrategy } from '../src/engine/strategy.js';
import { LEVEL_3, TIME_CONSTRAINT } from '../src/engine/types.js';

test('deriveTrainingStrategy caps frequency at 3 when recovery capacity is below 50', () => {
  const lowRecovery = {
    recovery_capacity: 40,
    stress_load: LEVEL_3.LOW,
    time_constraint: TIME_CONSTRAINT.OPEN,
  };
  const strategy = deriveTrainingStrategy(lowRecovery, 5);
  assert.strictEqual(strategy.frequency_cap, 3);
  assert.strictEqual(strategy.volume_tier, LEVEL_3.LOW);
  assert.strictEqual(strategy.fatigue_budget, LEVEL_3.LOW);
});

test('deriveTrainingStrategy caps frequency at 3 when stress load is High', () => {
  const highStress = {
    recovery_capacity: 70,
    stress_load: LEVEL_3.HIGH,
    time_constraint: TIME_CONSTRAINT.MODERATE,
  };
  const strategy = deriveTrainingStrategy(highStress, 6);
  assert.strictEqual(strategy.frequency_cap, 3);
  assert.strictEqual(strategy.volume_tier, LEVEL_3.LOW);
  assert.strictEqual(strategy.fatigue_budget, LEVEL_3.LOW);
});

test('deriveTrainingStrategy overrides intensity for severe time constraints', () => {
  const timeConstrained = {
    recovery_capacity: 90,
    stress_load: LEVEL_3.LOW,
    time_constraint: TIME_CONSTRAINT.SEVERE,
  };
  const strategy = deriveTrainingStrategy(timeConstrained, 4);
  assert.strictEqual(strategy.frequency_cap, 4);
  assert.strictEqual(strategy.intensity_tier, LEVEL_3.HIGH);
  assert.strictEqual(strategy.volume_tier, LEVEL_3.LOW);
});

test('deriveTrainingStrategy preserves requested days and default tiers when inputs are normal', () => {
  const normalScores = {
    recovery_capacity: 80,
    stress_load: LEVEL_3.MED,
    time_constraint: TIME_CONSTRAINT.MODERATE,
  };
  const strategy = deriveTrainingStrategy(normalScores, 4);
  assert.strictEqual(strategy.frequency_cap, 4);
  assert.strictEqual(strategy.volume_tier, LEVEL_3.MED);
  assert.strictEqual(strategy.intensity_tier, LEVEL_3.MED);
  assert.strictEqual(strategy.fatigue_budget, LEVEL_3.MED);
});
