import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateUserRawInput,
  GENDER,
  GOAL,
  LEVEL_3,
  MOVEMENT_PATTERN,
  EQUIPMENT,
} from '../src/engine/types.js';

test('validateUserRawInput accepts valid user profile', () => {
  const validUser = {
    age: 28,
    gender: GENDER.MALE,
    weightKg: 78,
    heightCm: 178,
    goal: GOAL.MUSCLE_GAIN,
    sleepQuality: LEVEL_3.HIGH,
    stressLevel: LEVEL_3.LOW,
    timeAvailable: 60,
    daysAvailable: 4,
  };
  const result = validateUserRawInput(validUser);
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.errors.length, 0);
});

test('validateUserRawInput catches invalid or out-of-range fields', () => {
  const invalidUser = {
    age: 14, // below 18
    gender: 'UnknownGender',
    weightKg: -5,
    heightCm: 50,
    goal: 'GetShredded',
    sleepQuality: 'Poor',
    stressLevel: 'Insane',
    timeAvailable: 10,
    daysAvailable: 8,
  };
  const result = validateUserRawInput(invalidUser);
  assert.strictEqual(result.valid, false);
  assert.ok(result.errors.some(e => e.includes('age')));
  assert.ok(result.errors.some(e => e.includes('gender')));
  assert.ok(result.errors.some(e => e.includes('weightKg')));
  assert.ok(result.errors.some(e => e.includes('heightCm')));
  assert.ok(result.errors.some(e => e.includes('goal')));
  assert.ok(result.errors.some(e => e.includes('sleepQuality')));
  assert.ok(result.errors.some(e => e.includes('stressLevel')));
  assert.ok(result.errors.some(e => e.includes('timeAvailable')));
  assert.ok(result.errors.some(e => e.includes('daysAvailable')));
});

test('validateUserRawInput rejects non-object inputs', () => {
  assert.strictEqual(validateUserRawInput(null).valid, false);
  assert.strictEqual(validateUserRawInput(undefined).valid, false);
  assert.strictEqual(validateUserRawInput('string').valid, false);
});

test('constants and enums are frozen and well-formed', () => {
  assert.ok(Object.isFrozen(GENDER));
  assert.ok(Object.isFrozen(GOAL));
  assert.ok(Object.isFrozen(LEVEL_3));
  assert.ok(Object.isFrozen(MOVEMENT_PATTERN));
  assert.ok(Object.isFrozen(EQUIPMENT));
});
