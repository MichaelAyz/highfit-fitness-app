import test from 'node:test';
import assert from 'node:assert/strict';
import { generateDeterministicPlan } from '../src/ai/service.js';
import { buildSystemPrompt } from '../src/ai/prompts.js';

test('generateDeterministicPlan selects valid exercises from simulation slots', () => {
  const dummySimulation = {
    user_summary: {
      goal: 'MuscleGain',
      lifestyle_scores: { recovery_capacity: 80, time_constraint: 'Moderate' },
      training_strategy: { frequency_cap: 3 }
    },
    days: [
      {
        day: 'Day 1',
        slots: [
          {
            pattern: 'Squat',
            prescription: { sets: '3', reps: '8-10', rpe: 'RPE 8' },
            valid_options: [
              { id: 'squat_goblet', name: 'Goblet Squat', equipment: ['Dumbbell'], fatigue_cost: 'Medium' },
              { id: 'squat_air', name: 'Air Squat', equipment: ['Bodyweight'], fatigue_cost: 'Low' }
            ]
          }
        ]
      }
    ]
  };

  const plan = generateDeterministicPlan(dummySimulation);
  assert.strictEqual(plan.days.length, 1);
  assert.strictEqual(plan.days[0].slots.length, 1);
  const slot = plan.days[0].slots[0];
  assert.ok(slot.selected_exercise_id);
  assert.ok(slot.selected_exercise_name);
  assert.ok(slot.reason.length > 10);
});

test('buildSystemPrompt returns non-empty structured JSON instruction', () => {
  const dummySimulation = {
    user_summary: { goal: 'MuscleGain' },
    template: { id: 'full_body' },
    days: []
  };
  const prompt = buildSystemPrompt(dummySimulation);
  assert.ok(typeof prompt === 'string' && prompt.length > 50);
  assert.ok(prompt.includes('JSON'));
});
