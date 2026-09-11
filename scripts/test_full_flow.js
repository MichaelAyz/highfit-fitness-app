/**
 * @file test_full_flow.js
 * Integration test for the Logic Engine + Assembler + Prompt Builder.
 * Simulates a High-Stress, Home-Gym user.
 */

import { generateUserConstraints } from '../src/engine/index.js';
import { assembleSimulation } from '../src/planner/assembler.js';
import { buildSystemPrompt } from '../src/ai/prompts.js';

console.log('--- RUNNING LOGIC ENGINE & ASSEMBLER FLOW TEST ---');

// Mock user with High-Stress and Home-Gym equipment (Dumbbells + Bodyweight + Band)
const mockUser = {
  age: 42,
  gender: 'Male',
  weightKg: 85,
  heightCm: 180,
  goal: 'FatLoss',
  sleepQuality: 'Low',
  stressLevel: 'High',
  timeAvailable: 40, // Severe time constraint (< 45 mins)
  daysAvailable: 5,
  equipment_access: ['Dumbbell', 'Bodyweight', 'Band'],
  injuries: ['lower_back_load']
};

console.log('\n[1] User Raw Input:\n', JSON.stringify(mockUser, null, 2));

// 1. Generate constraints
const constraints = generateUserConstraints(mockUser);
console.log('\n[2] Derived Deterministic Constraints:\n', JSON.stringify(constraints, null, 2));

// Verify high-stress / low-sleep cap
if (constraints.training_strategy.frequency_cap !== 3) {
  throw new Error(`Expected frequency_cap to be capped at 3, got: ${constraints.training_strategy.frequency_cap}`);
}

// 2. Assemble simulation
const simulation = assembleSimulation(mockUser, constraints);
console.log('\n[3] Assembled Simulation Structure:');
console.log(`- Template: ${simulation.template.name}`);
console.log(`- Days: ${simulation.days.length}`);
simulation.days.forEach((day, dIdx) => {
  console.log(`  * ${day.day}: ${day.slots.length} slots`);
  day.slots.forEach((s, sIdx) => {
    console.log(`    - Slot ${sIdx + 1} (${s.pattern}): ${s.valid_options.length} valid options found`);
  });
});

// 3. Build System Prompt
const systemPrompt = buildSystemPrompt(simulation);
console.log('\n[4] Generated AI System Prompt (First 500 chars):\n');
console.log(systemPrompt.substring(0, 500) + '...\n');

console.log('--- FLOW TEST COMPLETED SUCCESSFULLY ---');
