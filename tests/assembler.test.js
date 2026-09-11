import test from 'node:test';
import assert from 'node:assert/strict';
import { selectTemplate, getValidOptionsForSlot, assembleSimulation } from '../src/planner/assembler.js';
import { TIME_CONSTRAINT, MOVEMENT_PATTERN, GOAL, LEVEL_3, GENDER } from '../src/engine/types.js';
import { TEMPLATES } from '../src/planner/templates.js';

test('selectTemplate chooses appropriate routine template based on strategy and time constraints', () => {
  // Severe time constraint always selects time crunch template
  const severe = selectTemplate({ frequency_cap: 4 }, TIME_CONSTRAINT.SEVERE);
  assert.strictEqual(severe.id, TEMPLATES.TIME_CRUNCH_2_3.id);

  // Frequency <= 3 selects Full Body 3
  const fullBody = selectTemplate({ frequency_cap: 3 }, TIME_CONSTRAINT.OPEN);
  assert.strictEqual(fullBody.id, TEMPLATES.FULL_BODY_3.id);

  // Frequency 4 selects Upper / Lower 4
  const upperLower = selectTemplate({ frequency_cap: 4 }, TIME_CONSTRAINT.MODERATE);
  assert.strictEqual(upperLower.id, TEMPLATES.UPPER_LOWER_4.id);

  // Frequency 5-6 selects PPL
  const ppl = selectTemplate({ frequency_cap: 5 }, TIME_CONSTRAINT.OPEN);
  assert.strictEqual(ppl.id, TEMPLATES.PUSH_PULL_LEGS_5.id);
});

test('getValidOptionsForSlot filters by movement pattern and equipment', () => {
  const slot = { pattern: MOVEMENT_PATTERN.SQUAT, priority: 'Primary' };
  const userEquipment = ['Bodyweight'];
  const options = getValidOptionsForSlot(slot, userEquipment, [], 'Med');

  assert.ok(options.length > 0);
  for (const opt of options) {
    assert.strictEqual(opt.pattern, MOVEMENT_PATTERN.SQUAT);
    assert.ok(opt.equipment.includes('Bodyweight'));
  }
});

test('getValidOptionsForSlot strictly excludes injury conflict exercises', () => {
  const slot = { pattern: MOVEMENT_PATTERN.SQUAT, priority: 'Primary' };
  const userEquipment = ['Barbell', 'Dumbbell'];
  const userInjuries = ['lower_back_load']; // Barbell Back Squat has lower_back_load conflict
  const options = getValidOptionsForSlot(slot, userEquipment, userInjuries, 'Med');

  assert.ok(options.length > 0);
  const hasBackSquat = options.some(opt => opt.id === 'squat_back_barbell');
  assert.strictEqual(hasBackSquat, false, 'Expected Barbell Back Squat to be excluded due to lower back injury');
});

test('assembleSimulation constructs full multi-day routine with slots and prescriptions', () => {
  const userInput = {
    age: 29,
    gender: GENDER.MALE,
    weightKg: 80,
    heightCm: 180,
    goal: GOAL.MUSCLE_GAIN,
    sleepQuality: LEVEL_3.HIGH,
    stressLevel: LEVEL_3.LOW,
    timeAvailable: 60,
    daysAvailable: 3,
    equipment_access: ['Barbell', 'Dumbbell', 'Bodyweight'],
    injuries: []
  };

  const userConstraints = {
    nutrition: { bmr: 1780, tdee: 2492, target_calories: 2742, protein_target: 160 },
    lifestyle_scores: { recovery_capacity: 100, stress_load: LEVEL_3.LOW, time_constraint: TIME_CONSTRAINT.MODERATE },
    training_strategy: { frequency_cap: 3, volume_tier: LEVEL_3.MED, intensity_tier: LEVEL_3.MED, fatigue_budget: LEVEL_3.MED }
  };

  const simulation = assembleSimulation(userInput, userConstraints);
  assert.strictEqual(simulation.days.length, 3);
  assert.ok(simulation.template.id.includes('full_body'));

  for (const day of simulation.days) {
    assert.ok(day.day.length > 0);
    assert.ok(day.slots.length >= 4);
    for (const slot of day.slots) {
      assert.ok(slot.valid_options.length > 0, `Slot ${slot.pattern} should have valid options`);
      assert.ok(slot.prescription.sets);
      assert.ok(slot.prescription.reps);
    }
  }
});
