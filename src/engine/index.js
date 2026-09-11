/**
 * @file index.js
 * Main orchestrator for the deterministic Logic Engine.
 */

import { validateUserRawInput } from './types.js';
import { calculateNutrition } from './nutrition.js';
import { deriveLifestyleScores } from './lifestyle.js';
import { deriveTrainingStrategy } from './strategy.js';

/**
 * Validates raw user input and derives deterministic constraints.
 * 
 * Flow:
 * UserRawInput -> Validate -> Nutrition Logic -> Lifestyle Scoring -> Strategy Matrix
 * 
 * @param {Object} userInput - Raw user form data matching UserRawInput
 * @returns {{ nutrition: Object, lifestyle_scores: Object, training_strategy: Object }}
 * @throws {Error} If validation fails
 */
export function generateUserConstraints(userInput) {
  const validation = validateUserRawInput(userInput);
  if (!validation.valid) {
    const errorMsg = `Input Validation Failed: ${validation.errors.join('; ')}`;
    const err = new Error(errorMsg);
    err.status = 400;
    err.details = validation.errors;
    throw err;
  }

  // 1. Calculate safe metabolic targets
  const nutrition = calculateNutrition(userInput);

  // 2. Score recovery capacity, stress load, and time availability
  const lifestyle_scores = deriveLifestyleScores(userInput);

  // 3. Select training strategy from lifestyle constraints
  const training_strategy = deriveTrainingStrategy(lifestyle_scores, userInput.daysAvailable);

  return {
    nutrition,
    lifestyle_scores,
    training_strategy,
  };
}

export * from './types.js';
export * from './nutrition.js';
export * from './lifestyle.js';
export * from './strategy.js';
export * from './prescriptions.js';
