/**
 * @file prescriptions.js
 * Standardized scientific rep ranges, sets, RPE, rest intervals, and double-progression rules.
 */

import { GOAL } from './types.js';

/**
 * Standardized prescription matrix by slot priority and volume/intensity tiers.
 */
export function getSlotPrescription(priority, volumeTier, intensityTier, goal) {
  let sets = '3';
  let reps = '8–12';
  let rpe = 'RPE 7–8';
  let rest = '60–90s';

  if (priority === 'Primary') {
    if (goal === GOAL.MUSCLE_GAIN) {
      sets = volumeTier === 'Low' ? '3' : '3–4';
      reps = intensityTier === 'High' ? '6–8' : '6–10';
      rpe = intensityTier === 'High' ? 'RPE 8–9' : 'RPE 7–8';
      rest = '120–180s';
    } else {
      // FatLoss preservation of strength
      sets = volumeTier === 'Low' ? '2–3' : '3';
      reps = '6–8';
      rpe = 'RPE 8';
      rest = '90–120s';
    }
  } else if (priority === 'Secondary') {
    sets = volumeTier === 'Low' ? '2–3' : '3';
    reps = '8–12';
    rpe = 'RPE 7–8';
    rest = '60–90s';
  } else if (priority === 'Accessory') {
    sets = volumeTier === 'Low' ? '2' : '2–3';
    reps = '12–15';
    rpe = 'RPE 8–9';
    rest = '45–60s';
  } else if (priority === 'Conditioning') {
    sets = '3–4 rounds';
    reps = '30–45s work';
    rpe = 'RPE 8';
    rest = '30s rest';
  }

  return {
    sets,
    reps,
    rpe,
    rest,
    progression: 'Double progression: When top rep target is completed across all sets with solid form, increase load by 2.5kg (or smallest increment).'
  };
}
