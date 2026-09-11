import test from 'node:test';
import assert from 'node:assert/strict';
import { generateUserConstraints } from '../src/engine/index.js';
import { GENDER, GOAL, LEVEL_3, TIME_CONSTRAINT } from '../src/engine/types.js';

test('generateUserConstraints integrates full engine pipeline cleanly', () => {
  const userInput = {
    age: 32,
    gender: GENDER.MALE,
    weightKg: 85,
    heightCm: 182,
    goal: GOAL.FAT_LOSS,
    sleepQuality: LEVEL_3.HIGH,
    stressLevel: LEVEL_3.LOW,
    timeAvailable: 60,
    daysAvailable: 4,
  };

  const result = generateUserConstraints(userInput);
  assert.ok(result.nutrition);
  assert.ok(result.lifestyle_scores);
  assert.ok(result.training_strategy);

  // Nutrition assertions
  assert.ok(result.nutrition.bmr > 0);
  assert.ok(result.nutrition.tdee > result.nutrition.bmr);
  assert.ok(result.nutrition.target_calories >= result.nutrition.bmr);
  assert.strictEqual(result.nutrition.protein_target, 170); // 2g * 85kg

  // Lifestyle assertions
  assert.strictEqual(result.lifestyle_scores.recovery_capacity, 100);
  assert.strictEqual(result.lifestyle_scores.stress_load, LEVEL_3.LOW);
  assert.strictEqual(result.lifestyle_scores.time_constraint, TIME_CONSTRAINT.MODERATE);

  // Strategy assertions
  assert.strictEqual(result.training_strategy.frequency_cap, 4);
});

test('generateUserConstraints rejects invalid inputs with descriptive 400 error', () => {
  assert.throws(
    () => {
      generateUserConstraints({ age: 10 });
    },
    (err) => {
      return err.status === 400 && err.message.includes('Input Validation Failed');
    }
  );
});
