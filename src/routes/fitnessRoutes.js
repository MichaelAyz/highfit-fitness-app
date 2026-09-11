/**
 * @file fitnessRoutes.js
 * Express routes for analysis, optimistic simulation, and atomic plan generation.
 */

import { Router } from 'express';
import crypto from 'crypto';
import { generateUserConstraints } from '../engine/index.js';
import { assembleSimulation } from '../planner/assembler.js';
import { generateFinalPlan } from '../ai/service.js';
import { exercises } from '../data/exercises.js';
import { query } from '../db/index.js';

const router = Router();

/**
 * POST /api/v1/analyze
 * Generates deterministic constraints and template simulation WITHOUT calling AI.
 * Allows user to review "Optimistic Logic" first.
 */
router.post('/analyze', async (req, res, next) => {
  try {
    const rawInput = req.body;

    // 1. Generate deterministic constraints
    const constraints = generateUserConstraints(rawInput);

    // 2. Assemble slot-based workout simulation
    const simulation = assembleSimulation(rawInput, constraints);

    // Return the response matching spec
    res.status(200).json({
      lifestyle_scores: constraints.lifestyle_scores,
      training_strategy: constraints.training_strategy,
      nutrition: constraints.nutrition,
      simulation
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/v1/generate-plan
 * Executes AI selection within deterministic valid options and saves atomically.
 */
router.post('/generate-plan', async (req, res, next) => {
  try {
    const { user_id, constraints, simulation, raw_input } = req.body;

    let targetSimulation = simulation;

    // If full simulation wasn't provided directly, derive it from input and constraints
    if (!targetSimulation) {
      if (raw_input && constraints) {
        targetSimulation = assembleSimulation(raw_input, constraints);
      } else if (raw_input) {
        const derivedConstraints = generateUserConstraints(raw_input);
        targetSimulation = assembleSimulation(raw_input, derivedConstraints);
      } else {
        return res.status(400).json({
          error: 'Missing required payload: provide either "simulation" or "raw_input"'
        });
      }
    }

    // 1. Finalize plan through AI service (with valid_options validation)
    const finalPlan = await generateFinalPlan(targetSimulation);

    // 2. Persist to database atomically
    const planId = crypto.randomUUID();
    const targetUserId = user_id || '123e4567-e89b-12d3-a456-426614174000';

    try {
      await query(
        `INSERT INTO plans (id, user_id, active, structure_json) VALUES ($1, $2, $3, $4)`,
        [planId, targetUserId, true, JSON.stringify(finalPlan)]
      );
    } catch (dbErr) {
      console.error('[Database Error] Failed to persist plan:', dbErr);
      return res.status(500).json({
        error: 'Database persistence failed',
        details: dbErr.message
      });
    }

    res.status(200).json({
      success: true,
      plan_id: planId,
      user_id: targetUserId,
      plan: finalPlan,
      days: finalPlan.days // Include top-level days array for direct spec compatibility
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/v1/exercises
 * Returns the curated 50+ exercise library.
 */
router.get('/exercises', (req, res) => {
  const { pattern, equipment, difficulty, fatigue_cost } = req.query;
  let filtered = [...exercises];

  if (pattern) {
    filtered = filtered.filter(e => e.pattern.toLowerCase() === pattern.toLowerCase());
  }
  if (equipment) {
    filtered = filtered.filter(e => e.equipment.some(eq => eq.toLowerCase() === equipment.toLowerCase()));
  }
  if (difficulty) {
    filtered = filtered.filter(e => e.difficulty.toLowerCase() === difficulty.toLowerCase());
  }
  if (fatigue_cost) {
    filtered = filtered.filter(e => e.fatigue_cost.toLowerCase() === fatigue_cost.toLowerCase());
  }

  res.status(200).json({
    total: filtered.length,
    exercises: filtered
  });
});

/**
 * GET /api/v1/plans
 * Fetches saved plans.
 */
router.get('/plans', async (req, res, next) => {
  try {
    const result = await query('SELECT * FROM plans ORDER BY created_at DESC');
    res.status(200).json({
      total: result.rowCount || result.rows.length,
      plans: result.rows
    });
  } catch (err) {
    next(err);
  }
});

export default router;
