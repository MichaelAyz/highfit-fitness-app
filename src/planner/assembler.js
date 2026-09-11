/**
 * @file assembler.js
 * Deterministic Slot-Based Workout Assembler.
 * Matches structural template slots against the curated exercise database.
 */

import { exercises } from '../data/exercises.js';
import { TEMPLATES } from './templates.js';
import { getSlotPrescription } from '../engine/prescriptions.js';
import { TIME_CONSTRAINT } from '../engine/types.js';

/**
 * Selects an appropriate training template based on strategy frequency cap and time constraints.
 */
export function selectTemplate(trainingStrategy, timeConstraint) {
  if (timeConstraint === TIME_CONSTRAINT.SEVERE) {
    return TEMPLATES.TIME_CRUNCH_2_3;
  }

  const cap = trainingStrategy.frequency_cap;
  if (cap <= 3) {
    return TEMPLATES.FULL_BODY_3;
  } else if (cap === 4) {
    return TEMPLATES.UPPER_LOWER_4;
  } else {
    return TEMPLATES.PUSH_PULL_LEGS_5;
  }
}

/**
 * Filters the curated exercise database for a specific slot based on user profile constraints.
 * 
 * Filter hierarchy:
 * 1. Pattern matching (exact match)
 * 2. Equipment accessibility
 * 3. Injury exclusions
 * 4. Fatigue budget compatibility
 */
export function getValidOptionsForSlot(slot, userEquipment, userInjuries = [], fatigueBudget = 'Med') {
  // 1. Must match slot movement pattern
  let matches = exercises.filter(ex => ex.pattern === slot.pattern);

  // 2. Equipment access filtering (if specified)
  if (userEquipment && Array.isArray(userEquipment) && userEquipment.length > 0) {
    // Check if user has at least one of the required equipment items for this exercise
    const equipFiltered = matches.filter(ex => 
      ex.equipment.some(eq => userEquipment.includes(eq))
    );
    if (equipFiltered.length > 0) {
      matches = equipFiltered;
    }
  }

  // 3. Injury exclusions (strict)
  if (userInjuries && Array.isArray(userInjuries) && userInjuries.length > 0) {
    matches = matches.filter(ex => 
      !ex.injury_conflict.some(injury => userInjuries.includes(injury))
    );
  }

  // 4. Fatigue budget filtering
  if (fatigueBudget === 'Low') {
    const lowFatigueMatches = matches.filter(ex => ex.fatigue_cost !== 'High');
    if (lowFatigueMatches.length > 0) {
      matches = lowFatigueMatches;
    }
  }

  // Safeguard: If ultra-strict constraints left 0 matches, fallback to pattern matches without injury conflicts
  if (matches.length === 0) {
    matches = exercises.filter(ex => 
      ex.pattern === slot.pattern &&
      !ex.injury_conflict.some(injury => userInjuries.includes(injury))
    );
  }

  // If still 0, return any exercise matching pattern to prevent broken slot
  if (matches.length === 0) {
    matches = exercises.filter(ex => ex.pattern === slot.pattern);
  }

  return matches.map(ex => ({
    id: ex.id,
    name: ex.name,
    pattern: ex.pattern,
    equipment: ex.equipment,
    difficulty: ex.difficulty,
    fatigue_cost: ex.fatigue_cost,
    muscles_primary: ex.muscles_primary
  }));
}

/**
 * Assembles the full simulation structure for review and downstream AI selection.
 * 
 * @param {Object} userInput - Raw input or profile (equipment_access, injuries, goal)
 * @param {Object} userConstraints - Output of generateUserConstraints (nutrition, lifestyle_scores, training_strategy)
 * @returns {Object} Simulation result with days, slots, and valid_options
 */
export function assembleSimulation(userInput, userConstraints) {
  const { training_strategy, lifestyle_scores, nutrition } = userConstraints;
  const template = selectTemplate(training_strategy, lifestyle_scores.time_constraint);

  const equipmentAccess = userInput.equipment_access || (userInput.equipment ? [userInput.equipment] : null);
  const injuries = userInput.injuries || userInput.injury_flags || [];

  const days = template.days.slice(0, training_strategy.frequency_cap).map(dayConfig => {
    const slots = dayConfig.slots.map(slotConfig => {
      const validOptions = getValidOptionsForSlot(
        slotConfig,
        equipmentAccess,
        injuries,
        training_strategy.fatigue_budget
      );

      const prescription = getSlotPrescription(
        slotConfig.priority,
        training_strategy.volume_tier,
        training_strategy.intensity_tier,
        userInput.goal
      );

      return {
        priority: slotConfig.priority,
        pattern: slotConfig.pattern,
        fatigue_budget: slotConfig.fatigueBudget,
        prescription,
        valid_options: validOptions
      };
    });

    return {
      day: dayConfig.day,
      slots
    };
  });

  return {
    user_summary: {
      goal: userInput.goal,
      nutrition,
      lifestyle_scores,
      training_strategy
    },
    template: {
      id: template.id,
      name: template.name,
      days_per_week: training_strategy.frequency_cap,
      tradeoffs: template.tradeoffs
    },
    days
  };
}
