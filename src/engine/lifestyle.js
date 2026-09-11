/**
 * @file lifestyle.js
 * Lifestyle and recovery scoring to derive physiological constraints.
 */

import { LEVEL_3, TIME_CONSTRAINT } from './types.js';

/**
 * Calculates Recovery Capacity (0–100, clamped).
 * Starts at 100 baseline.
 * Penalties:
 * - Sleep: Low (-20), Med (-10), High (0)
 * - Stress: High (-20), Med (-10), Low (0)
 * - Age: > 40 (-10)
 * @param {string} sleepQuality 
 * @param {string} stressLevel 
 * @param {number} age 
 * @returns {number} Clamped integer between 0 and 100
 */
export function calculateRecoveryCapacity(sleepQuality, stressLevel, age) {
  let score = 100;

  // Sleep Quality penalty
  if (sleepQuality === LEVEL_3.LOW) {
    score -= 20;
  } else if (sleepQuality === LEVEL_3.MED) {
    score -= 10;
  }

  // Stress Level penalty
  if (stressLevel === LEVEL_3.HIGH) {
    score -= 20;
  } else if (stressLevel === LEVEL_3.MED) {
    score -= 10;
  }

  // Age factor: physiological recovery slows past 40
  if (age > 40) {
    score -= 10;
  }

  // Clamp between 0 and 100
  return Math.max(0, Math.min(100, score));
}

/**
 * Maps raw stress level string to canonical stress load enum.
 * @param {string} stressLevel 
 * @returns {string} "Low" | "Med" | "High"
 */
export function mapStressLoad(stressLevel) {
  if (stressLevel === LEVEL_3.HIGH) return LEVEL_3.HIGH;
  if (stressLevel === LEVEL_3.MED) return LEVEL_3.MED;
  return LEVEL_3.LOW;
}

/**
 * Maps daily available minutes to discrete time constraint categories.
 * - < 45 mins → "Severe"
 * - 45–60 mins → "Moderate"
 * - > 60 mins → "Open"
 * @param {number} timeAvailableMinutes 
 * @returns {string} "Severe" | "Moderate" | "Open"
 */
export function mapTimeConstraint(timeAvailableMinutes) {
  if (timeAvailableMinutes < 45) {
    return TIME_CONSTRAINT.SEVERE;
  } else if (timeAvailableMinutes <= 60) {
    return TIME_CONSTRAINT.MODERATE;
  } else {
    return TIME_CONSTRAINT.OPEN;
  }
}

/**
 * Derives the complete LifestyleScores object from raw user inputs.
 * @param {Object} input - Validated UserRawInput
 * @returns {{ recovery_capacity: number, stress_load: string, time_constraint: string }}
 */
export function deriveLifestyleScores(input) {
  const recovery_capacity = calculateRecoveryCapacity(input.sleepQuality, input.stressLevel, input.age);
  const stress_load = mapStressLoad(input.stressLevel);
  const time_constraint = mapTimeConstraint(input.timeAvailable);

  return {
    recovery_capacity,
    stress_load,
    time_constraint,
  };
}
