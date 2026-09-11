/**
 * @file strategy.js
 * Decision matrix that converts LifestyleScores and user availability into a strict TrainingStrategy.
 */

import { LEVEL_3, TIME_CONSTRAINT } from './types.js';

/**
 * Derives TrainingStrategy using strict hierarchical rule priorities.
 * 
 * Rule Priority:
 * 1. Recovery & Stress rules apply first:
 *    - If recovery_capacity < 50 OR stress_load === "High":
 *      frequency_cap = min(daysAvailable, 3), volume_tier = "Low", fatigue_budget = "Low"
 * 2. Time rules apply second (overrides intensity, ensures low volume for short sessions):
 *    - If time_constraint === "Severe":
 *      intensity_tier = "High", volume_tier = "Low"
 * 
 * Defaults (if not overridden):
 *    - frequency_cap = daysAvailable
 *    - volume_tier = "Med"
 *    - intensity_tier = "Med"
 *    - fatigue_budget = "Med"
 * 
 * @param {Object} lifestyleScores - Output from deriveLifestyleScores
 * @param {number} daysAvailable - User requested days per week (2-6)
 * @returns {{ frequency_cap: number, volume_tier: string, intensity_tier: string, fatigue_budget: string }}
 */
export function deriveTrainingStrategy(lifestyleScores, daysAvailable) {
  // Set defaults
  let frequency_cap = daysAvailable;
  let volume_tier = LEVEL_3.MED;
  let intensity_tier = LEVEL_3.MED;
  let fatigue_budget = LEVEL_3.MED;

  // RULE 1: Recovery & Stress Rules (highest priority)
  // Low recovery capacity or high life stress dramatically impairs systemic adaptation.
  // We cap frequency to at most 3 days and throttle volume/fatigue to prevent overtraining.
  if (lifestyleScores.recovery_capacity < 50 || lifestyleScores.stress_load === LEVEL_3.HIGH) {
    frequency_cap = Math.min(daysAvailable, 3);
    volume_tier = LEVEL_3.LOW;
    fatigue_budget = LEVEL_3.LOW;
  }

  // RULE 2: Time Constraint Rules (applied second)
  // Severe time (<45 min) requires high intensity density with low total volume.
  if (lifestyleScores.time_constraint === TIME_CONSTRAINT.SEVERE) {
    intensity_tier = LEVEL_3.HIGH;
    volume_tier = LEVEL_3.LOW;
  }

  return {
    frequency_cap,
    volume_tier,
    intensity_tier,
    fatigue_budget,
  };
}
