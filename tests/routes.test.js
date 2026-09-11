import test from 'node:test';
import assert from 'node:assert/strict';
import fitnessRoutes from '../src/routes/fitnessRoutes.js';

test('fitnessRoutes router is properly exported Express Router instance', () => {
  assert.ok(typeof fitnessRoutes === 'function');
  assert.ok(Array.isArray(fitnessRoutes.stack));
  assert.ok(fitnessRoutes.stack.length >= 4);
});
