import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBMR,
  calculateTDEE,
  calculateTargetCalories,
  calculateProteinTarget,
  calculateNutrition,
} from '../src/engine/nutrition.js';
import { GENDER, GOAL } from '../src/engine/types.js';

test('calculateBMR calculates correct basal metabolic rate for male', () => {
  // 10 * 80 + 6.25 * 180 - 5 * 30 + 5 = 800 + 1125 - 150 + 5 = 1780
  const bmr = calculateBMR(80, 180, 30, GENDER.MALE);
  assert.strictEqual(bmr, 1780);
});

test('calculateBMR calculates correct basal metabolic rate for female', () => {
  // 10 * 60 + 6.25 * 165 - 5 * 28 - 161 = 600 + 1031.25 - 140 - 161 = 1330.25 -> 1330
  const bmr = calculateBMR(60, 165, 28, GENDER.FEMALE);
  assert.strictEqual(bmr, 1330);
});

test('calculateBMR calculates midpoint for unspecified gender', () => {
  const male = calculateBMR(70, 175, 25, GENDER.MALE);
  const female = calculateBMR(70, 175, 25, GENDER.FEMALE);
  const other = calculateBMR(70, 175, 25, 'other');
  const expectedMid = Math.round((male + female) / 2);
  assert.strictEqual(other, expectedMid);
});

test('calculateTDEE applies appropriate activity multipliers based on days', () => {
  const bmr = 1700;
  // 2 or 3 days -> 1.4x
  assert.strictEqual(calculateTDEE(bmr, 3), Math.round(1700 * 1.4));
  // 4 or 5 days -> 1.55x
  assert.strictEqual(calculateTDEE(bmr, 4), Math.round(1700 * 1.55));
  // 6 or more days -> 1.7x
  assert.strictEqual(calculateTDEE(bmr, 6), Math.round(1700 * 1.7));
});

test('calculateTargetCalories handles fat loss deficit without dropping below BMR', () => {
  const bmr = 1500;
  const tdee = 1900; // tdee - 500 = 1400, but clamped to BMR 1500
  const target = calculateTargetCalories(bmr, tdee, GOAL.FAT_LOSS);
  assert.strictEqual(target, 1500);

  const highTdee = 2500; // 2500 - 500 = 2000, which is > BMR 1500
  const normalDeficit = calculateTargetCalories(bmr, highTdee, GOAL.FAT_LOSS);
  assert.strictEqual(normalDeficit, 2000);
});

test('calculateTargetCalories handles muscle gain surplus and maintenance', () => {
  const bmr = 1600;
  const tdee = 2200;
  // Muscle gain = +250 kcal
  assert.strictEqual(calculateTargetCalories(bmr, tdee, GOAL.MUSCLE_GAIN), 2450);
  // Maintenance = tdee
  assert.strictEqual(calculateTargetCalories(bmr, tdee, 'maintenance'), 2200);
});

test('calculateProteinTarget provides 2g per kg bodyweight', () => {
  assert.strictEqual(calculateProteinTarget(75), 150);
  assert.strictEqual(calculateProteinTarget(82.4), 165);
});

test('calculateNutrition orchestrates all calculations correctly', () => {
  const input = {
    weightKg: 80,
    heightCm: 180,
    age: 30,
    gender: GENDER.MALE,
    goal: GOAL.FAT_LOSS,
    daysAvailable: 4,
  };
  const result = calculateNutrition(input);
  assert.strictEqual(result.bmr, 1780);
  assert.strictEqual(result.tdee, Math.round(1780 * 1.55)); // 2759
  assert.strictEqual(result.target_calories, 2759 - 500); // 2259
  assert.strictEqual(result.protein_target, 160);
});
