/**
 * @file types.js
 * JSDoc type schemas and enums for the deterministic Logic Engine.
 */

/**
 * Valid Enums for User Raw Input
 */
export const GENDER = Object.freeze({
  MALE: 'Male',
  FEMALE: 'Female',
  UNSPECIFIED: 'Unspecified',
});

export const GOAL = Object.freeze({
  FAT_LOSS: 'FatLoss',
  MUSCLE_GAIN: 'MuscleGain',
});

export const LEVEL_3 = Object.freeze({
  LOW: 'Low',
  MED: 'Med',
  HIGH: 'High',
});

export const TIME_CONSTRAINT = Object.freeze({
  SEVERE: 'Severe',
  MODERATE: 'Moderate',
  OPEN: 'Open',
});

export const MOVEMENT_PATTERN = Object.freeze({
  SQUAT: 'Squat',
  LUNGE: 'Lunge',
  HINGE: 'Hinge',
  PUSH_HORIZONTAL: 'Push_Horizontal',
  PUSH_VERTICAL: 'Push_Vertical',
  PULL_HORIZONTAL: 'Pull_Horizontal',
  PULL_VERTICAL: 'Pull_Vertical',
  CORE: 'Core',
  CARRY: 'Carry',
});

export const EQUIPMENT = Object.freeze({
  BODYWEIGHT: 'Bodyweight',
  DUMBBELL: 'Dumbbell',
  BARBELL: 'Barbell',
  MACHINE: 'Machine',
  CABLE: 'Cable',
  BAND: 'Band',
});

export const DIFFICULTY = Object.freeze({
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
});

export const FATIGUE_COST = Object.freeze({
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
});

/**
 * Validates raw user input to ensure all fields are within safe scientific bounds.
 * @param {Object} input 
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateUserRawInput(input) {
  const errors = [];

  if (!input || typeof input !== 'object') {
    return { valid: false, errors: ['Input must be a valid non-empty object'] };
  }

  // Age: 18 - 65
  if (typeof input.age !== 'number' || input.age < 18 || input.age > 65) {
    errors.push('age must be a number between 18 and 65');
  }

  // Gender: "Male" | "Female" | "Unspecified"
  if (!Object.values(GENDER).includes(input.gender)) {
    errors.push(`gender must be one of: ${Object.values(GENDER).join(', ')}`);
  }

  // Weight: 30 - 300 kg
  if (typeof input.weightKg !== 'number' || input.weightKg < 30 || input.weightKg > 300) {
    errors.push('weightKg must be a positive number between 30 and 300');
  }

  // Height: 100 - 250 cm
  if (typeof input.heightCm !== 'number' || input.heightCm < 100 || input.heightCm > 250) {
    errors.push('heightCm must be a positive number between 100 and 250');
  }

  // Goal: "FatLoss" | "MuscleGain"
  if (!Object.values(GOAL).includes(input.goal)) {
    errors.push(`goal must be one of: ${Object.values(GOAL).join(', ')}`);
  }

  // Sleep Quality: "Low" | "Med" | "High"
  if (!Object.values(LEVEL_3).includes(input.sleepQuality)) {
    errors.push(`sleepQuality must be one of: ${Object.values(LEVEL_3).join(', ')}`);
  }

  // Stress Level: "Low" | "Med" | "High"
  if (!Object.values(LEVEL_3).includes(input.stressLevel)) {
    errors.push(`stressLevel must be one of: ${Object.values(LEVEL_3).join(', ')}`);
  }

  // Time Available: minutes per day (15 - 240)
  if (typeof input.timeAvailable !== 'number' || input.timeAvailable < 15 || input.timeAvailable > 240) {
    errors.push('timeAvailable must be a number between 15 and 240 minutes');
  }

  // Days Available: 2 - 6
  if (typeof input.daysAvailable !== 'number' || input.daysAvailable < 2 || input.daysAvailable > 6) {
    errors.push('daysAvailable must be a number between 2 and 6');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
