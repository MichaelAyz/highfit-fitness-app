import test from 'node:test';
import assert from 'node:assert/strict';
import { exercises } from '../src/data/exercises.js';

test('exercise catalog contains at least 50 curated movements', () => {
  assert.ok(exercises.length >= 50, `Expected >= 50 exercises, got ${exercises.length}`);
});

test('every exercise adheres strictly to data schema', () => {
  const validPatterns = new Set([
    'Squat', 'Lunge', 'Hinge', 'Push_Horizontal', 'Push_Vertical',
    'Pull_Horizontal', 'Pull_Vertical', 'Core', 'Carry'
  ]);
  const validDifficulties = new Set(['Beginner', 'Intermediate', 'Advanced']);
  const validFatigue = new Set(['Low', 'Medium', 'High']);

  for (const ex of exercises) {
    assert.ok(typeof ex.id === 'string' && ex.id.length > 0, `Invalid id in ${JSON.stringify(ex)}`);
    assert.ok(typeof ex.name === 'string' && ex.name.length > 0, `Invalid name in ${ex.id}`);
    assert.ok(validPatterns.has(ex.pattern), `Invalid pattern ${ex.pattern} in ${ex.id}`);
    assert.ok(Array.isArray(ex.equipment) && ex.equipment.length > 0, `Invalid equipment in ${ex.id}`);
    assert.ok(validDifficulties.has(ex.difficulty), `Invalid difficulty ${ex.difficulty} in ${ex.id}`);
    assert.ok(validFatigue.has(ex.fatigue_cost), `Invalid fatigue_cost ${ex.fatigue_cost} in ${ex.id}`);
    assert.ok(Array.isArray(ex.muscles_primary) && ex.muscles_primary.length > 0, `Invalid muscles in ${ex.id}`);
    assert.ok(Array.isArray(ex.injury_conflict), `Invalid injury_conflict in ${ex.id}`);
  }
});

test('all 9 movement patterns have sufficient movement variety', () => {
  const patternCounts = {};
  for (const ex of exercises) {
    patternCounts[ex.pattern] = (patternCounts[ex.pattern] || 0) + 1;
  }
  const requiredPatterns = [
    'Squat', 'Lunge', 'Hinge', 'Push_Horizontal', 'Push_Vertical',
    'Pull_Horizontal', 'Pull_Vertical', 'Core', 'Carry'
  ];
  for (const pattern of requiredPatterns) {
    assert.ok(
      patternCounts[pattern] >= 3,
      `Pattern ${pattern} has only ${patternCounts[pattern]} exercises (expected >= 3)`
    );
  }
});

test('all exercise IDs are unique', () => {
  const ids = new Set();
  for (const ex of exercises) {
    assert.ok(!ids.has(ex.id), `Duplicate exercise ID: ${ex.id}`);
    ids.add(ex.id);
  }
});
