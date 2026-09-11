import test from 'node:test';
import assert from 'node:assert/strict';
import { fallbackUserData, fallbackSimulation, analyzeUserData, fetchExercises } from '../client/src/services/api.js';

test('fallbackUserData has all required user profile properties', () => {
  assert.ok(typeof fallbackUserData.age === 'number');
  assert.ok(typeof fallbackUserData.weightKg === 'number');
  assert.ok(typeof fallbackUserData.heightCm === 'number');
  assert.ok(fallbackUserData.goal);
  assert.ok(Array.isArray(fallbackUserData.equipment_access));
});

test('fallbackSimulation provides full structural routine with nutrition and scores', () => {
  assert.ok(fallbackSimulation.lifestyle_scores);
  assert.ok(fallbackSimulation.training_strategy);
  assert.ok(fallbackSimulation.nutrition);
  assert.ok(Array.isArray(fallbackSimulation.days));
  assert.ok(fallbackSimulation.days.length >= 3);

  for (const day of fallbackSimulation.days) {
    assert.ok(day.day);
    assert.ok(day.slots.length > 0);
    for (const slot of day.slots) {
      assert.ok(slot.selected_exercise_id);
      assert.ok(slot.selected_exercise_name);
      assert.ok(slot.prescription);
    }
  }
});

test('analyzeUserData gracefully falls back when fetch is unavailable', async () => {
  // Offline or invalid URL fallback test
  const result = await analyzeUserData({ age: 25 });
  assert.ok(result);
  assert.ok(result.nutrition);
  assert.ok(result.training_strategy);
});

test('fetchExercises returns an array even on network failure', async () => {
  const result = await fetchExercises();
  assert.ok(Array.isArray(result));
});
