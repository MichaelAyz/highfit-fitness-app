/**
 * @file nutrition.js
 * Pure deterministic calorie and macro calculations based on Mifflin-St Jeor.
 */

import { GENDER, GOAL } from './types.js';

/**
 * Calculates Mifflin-St Jeor Basal Metabolic Rate (BMR).
 * @param {number} weightKg 
 * @param {number} heightCm 
 * @param {number} age 
 * @param {string} gender 
 * @returns {number} BMR in kcal/day rounded to nearest integer
 */
export function calculateBMR(weightKg, heightCm, age, gender) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  
  if (gender === GENDER.MALE) {
    return Math.round(base + 5);
  } else if (gender === GENDER.FEMALE) {
    return Math.round(base - 161);
  } else {
    // Unspecified: Use the average of male (+5) and female (-161) equations = (base + 5 + base - 161) / 2 = base - 78
    const maleBmr = base + 5;
    const femaleBmr = base - 161;
    return Math.round((maleBmr + femaleBmr) / 2);
  }
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE) using training frequency multiplier.
 * Multipliers:
 * - 2-3 days: 1.4 (Moderately active / base strength)
 * - 4-5 days: 1.55 (Active / regular splits)
 * - 6 days: 1.7 (Very active / high density)
 * @param {number} bmr 
 * @param {number} daysAvailable 
 * @returns {number} TDEE in kcal/day rounded to nearest integer
 */
export function calculateTDEE(bmr, daysAvailable) {
  let multiplier = 1.4;
  if (daysAvailable >= 6) {
    multiplier = 1.7;
  } else if (daysAvailable >= 4) {
    multiplier = 1.55;
  }
  return Math.round(bmr * multiplier);
}

/**
 * Determines target calories based on goal and safety constraints.
 * FatLoss: max deficit -500 kcal, clamped so target_calories never falls below BMR.
 * MuscleGain: fixed surplus +250 kcal.
 * @param {number} bmr 
 * @param {number} tdee 
 * @param {string} goal 
 * @returns {number} target_calories in kcal/day
 */
export function calculateTargetCalories(bmr, tdee, goal) {
  if (goal === GOAL.FAT_LOSS) {
    const rawTarget = tdee - 500;
    // Safety constraint: Never return target_calories < BMR to prevent metabolic adaptation and lean tissue loss
    return Math.max(rawTarget, bmr);
  } else if (goal === GOAL.MUSCLE_GAIN) {
    return tdee + 250;
  }
  return tdee;
}

/**
 * Calculates daily protein target using 2g per kg bodyweight proxy.
 * @param {number} weightKg 
 * @returns {number} grams of protein per day
 */
export function calculateProteinTarget(weightKg) {
  return Math.round(2 * weightKg);
}

/**
 * Main orchestrator for nutrition logic.
 * @param {Object} input - Validated UserRawInput
 * @returns {{ bmr: number, tdee: number, target_calories: number, protein_target: number }}
 */
export function calculateNutrition(input) {
  const bmr = calculateBMR(input.weightKg, input.heightCm, input.age, input.gender);
  const tdee = calculateTDEE(bmr, input.daysAvailable);
  const target_calories = calculateTargetCalories(bmr, tdee, input.goal);
  const protein_target = calculateProteinTarget(input.weightKg);

  return {
    bmr,
    tdee,
    target_calories,
    protein_target,
  };
}
