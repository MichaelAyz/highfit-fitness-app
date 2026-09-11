/**
 * @file verify_full_system.js
 * End-to-end integration test verifying Database, Express API, Logic Engine, and AI plan generation.
 */

import app from '../src/app.js';
import { query } from '../src/db/index.js';

async function runVerification() {
  console.log('======================================================');
  console.log('  STARTING FULL SYSTEM END-TO-END INTEGRATION TEST    ');
  console.log('======================================================\n');

  // Step 0: Safety Check
  if (process.env.NODE_ENV === 'production') {
    console.error('[SAFETY CHECK FAILED] Aborting execution because NODE_ENV is production.');
    process.exit(1);
  }
  console.log('[Step 0] Safety Check passed (Non-production environment).');

  // Start temporary test server
  const TEST_PORT = 4999;
  const server = await new Promise((resolve) => {
    const s = app.listen(TEST_PORT, () => resolve(s));
  });
  const BASE_URL = `http://localhost:${TEST_PORT}`;
  console.log(`[Setup] Temporary test server started on ${BASE_URL}`);

  try {
    // Step 1: Database Prep
    const testUserId = '123e4567-e89b-12d3-a456-426614174000';
    const testEmail = 'test@test.com';

    await query(
      `INSERT INTO users (id, email, password_hash) VALUES ($1, $2, $3)`,
      [testUserId, testEmail, 'test_hash']
    );
    console.log(`[Step 1] Database Prep: User ${testEmail} verified/inserted successfully.`);

    // Count plans before generation
    const countBeforeRes = await query('SELECT COUNT(*) FROM plans');
    const countBefore = parseInt(countBeforeRes.rows[0].count || countBeforeRes.rows[0]['count(*)'] || 0, 10);
    console.log(`[Step 1] Current plans count before generation: ${countBefore}`);

    // Step 2: Test /api/v1/analyze
    console.log('\n[Step 2] Testing POST /api/v1/analyze with High Stress & Low Sleep...');
    const analyzePayload = {
      age: 45,
      gender: 'Male',
      weightKg: 88,
      heightCm: 178,
      goal: 'FatLoss',
      sleepQuality: 'Low',
      stressLevel: 'High',
      timeAvailable: 50,
      daysAvailable: 4,
      equipment_access: ['Barbell', 'Dumbbell', 'Machine'],
      injuries: ['lower_back_load']
    };

    const analyzeResponse = await fetch(`${BASE_URL}/api/v1/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analyzePayload)
    });

    if (!analyzeResponse.ok) {
      const errText = await analyzeResponse.text();
      throw new Error(`Analyze API returned status ${analyzeResponse.status}: ${errText}`);
    }

    const analyzeData = await analyzeResponse.json();

    // Assert: training_strategy.frequency_cap === 3
    if (analyzeData.training_strategy?.frequency_cap !== 3) {
      throw new Error(
        `Assertion Failed: Expected frequency_cap === 3, got: ${analyzeData.training_strategy?.frequency_cap}`
      );
    }

    // Assert: Response includes lifestyle_scores and nutrition data
    if (!analyzeData.lifestyle_scores || !analyzeData.nutrition) {
      throw new Error('Assertion Failed: Response missing lifestyle_scores or nutrition data');
    }

    console.log('✓ Assert: training_strategy.frequency_cap === 3');
    console.log(`✓ Assert: lifestyle_scores (Recovery: ${analyzeData.lifestyle_scores.recovery_capacity}%)`);
    console.log(`✓ Assert: nutrition (Target Calories: ${analyzeData.nutrition.target_calories} kcal, Protein: ${analyzeData.nutrition.protein_target}g)`);

    // Step 3: Test /api/v1/generate-plan
    console.log('\n[Step 3] Testing POST /api/v1/generate-plan...');
    const generatePayload = {
      user_id: testUserId,
      constraints: {
        nutrition: analyzeData.nutrition,
        lifestyle_scores: analyzeData.lifestyle_scores,
        training_strategy: analyzeData.training_strategy
      },
      simulation: analyzeData.simulation
    };

    const generateResponse = await fetch(`${BASE_URL}/api/v1/generate-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(generatePayload)
    });

    if (!generateResponse.ok) {
      const errText = await generateResponse.text();
      throw new Error(`Generate Plan API returned status ${generateResponse.status}: ${errText}`);
    }

    const generateData = await generateResponse.json();

    // Assert: HTTP 200 & Response is valid JSON
    if (!generateData || typeof generateData !== 'object') {
      throw new Error('Assertion Failed: Response is not valid JSON object');
    }

    // Assert: JSON includes days → slots → selected_exercise_id
    const days = generateData.days || generateData.plan?.days;
    if (!Array.isArray(days) || days.length === 0) {
      throw new Error('Assertion Failed: Response does not include days array');
    }

    let totalSlotsVerified = 0;
    for (const day of days) {
      if (!Array.isArray(day.slots) || day.slots.length === 0) {
        throw new Error(`Assertion Failed: Day '${day.day}' has no slots`);
      }
      for (const slot of day.slots) {
        if (!slot.selected_exercise_id) {
          throw new Error(`Assertion Failed: Slot missing selected_exercise_id`);
        }
        totalSlotsVerified++;
      }
    }

    console.log(`✓ Assert: HTTP 200 received`);
    console.log(`✓ Assert: Plan contains ${days.length} days and ${totalSlotsVerified} slots with selected_exercise_id`);

    // Step 4: Persistence Verification
    console.log('\n[Step 4] Persistence Verification...');
    const countAfterRes = await query('SELECT COUNT(*) FROM plans');
    const countAfter = parseInt(countAfterRes.rows[0].count || countAfterRes.rows[0]['count(*)'] || 0, 10);

    console.log(`Plans count before: ${countBefore}, Plans count after: ${countAfter}`);
    if (countAfter !== countBefore + 1) {
      throw new Error(`Assertion Failed: Expected plan count to increase by 1. Before: ${countBefore}, After: ${countAfter}`);
    }

    console.log('SUCCESS: Plan saved to Database');

    console.log('\n======================================================');
    console.log('   ALL SYSTEM VERIFICATION TESTS PASSED SUCCESSFULLY!  ');
    console.log('======================================================\n');
  } catch (err) {
    console.error('\n❌ VERIFICATION TEST FAILED:', err.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runVerification();
