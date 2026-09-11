/**
 * @file service.js
 * AI Plan Generation Service.
 * Supports live Gemini LLM with strict JSON mode + robust offline deterministic fallback.
 */

import { buildSystemPrompt } from './prompts.js';

/**
 * Intelligent deterministic fallback selector when LLM is unavailable or SKIP_AI=true.
 * Guaranteed to satisfy all constraints, select only from valid_options, and produce optimistic rationale.
 */
export function generateDeterministicPlan(simulationResult) {
  const recovery = simulationResult.user_summary?.lifestyle_scores?.recovery_capacity ?? 70;
  const goal = simulationResult.user_summary?.goal ?? 'MuscleGain';
  const timeConstraint = simulationResult.user_summary?.lifestyle_scores?.time_constraint ?? 'Open';

  const days = simulationResult.days.map((dayObj) => {
    const slots = dayObj.slots.map((slotObj) => {
      const options = slotObj.valid_options;
      if (!options || options.length === 0) {
        throw new Error(`Slot has zero valid options for pattern ${slotObj.pattern}`);
      }

      // Prioritize exercise: if low recovery, prefer lower fatigue; otherwise prioritize staple compound/effective movements
      let selected = options[0];
      if (recovery < 50) {
        const lowFatigue = options.find(o => o.fatigue_cost === 'Low') || options.find(o => o.fatigue_cost === 'Medium');
        if (lowFatigue) selected = lowFatigue;
      } else {
        const staple = options.find(o => o.difficulty === 'Intermediate') || options[0];
        if (staple) selected = staple;
      }

      // Generate optimistic rationale
      let reason = `Selected ${selected.name} to maximize ${selected.muscles_primary?.join('/') || 'muscle'} stimulation.`;
      if (timeConstraint === 'Severe') {
        reason += ` High-density mechanics provide peak stimulus in your compact session.`;
      } else if (recovery < 50) {
        reason += ` Strategically moderated fatigue cost preserves recovery reserves while reinforcing progressive strength.`;
      } else {
        reason += ` Perfectly complements your ${goal} trajectory with optimal movement trajectory.`;
      }

      return {
        pattern: slotObj.pattern,
        selected_exercise_id: selected.id,
        selected_exercise_name: selected.name,
        equipment: selected.equipment,
        prescription: slotObj.prescription,
        reason
      };
    });

    return {
      day: dayObj.day,
      slots
    };
  });

  return { days };
}

/**
 * Validates AI or fallback plan structure and checks that selected exercises exist in slot options.
 */
export function validatePlanResponse(planJson, simulationResult) {
  if (!planJson || !Array.isArray(planJson.days)) {
    throw new Error('Plan response must contain a "days" array');
  }

  if (planJson.days.length !== simulationResult.days.length) {
    throw new Error(`Plan day count (${planJson.days.length}) does not match expected (${simulationResult.days.length})`);
  }

  for (let d = 0; d < simulationResult.days.length; d++) {
    const expectedDay = simulationResult.days[d];
    const actualDay = planJson.days[d];

    if (!actualDay || !Array.isArray(actualDay.slots)) {
      throw new Error(`Day ${d + 1} is missing slots array`);
    }

    if (actualDay.slots.length !== expectedDay.slots.length) {
      throw new Error(`Slot count mismatch on ${expectedDay.day}`);
    }

    for (let s = 0; s < expectedDay.slots.length; s++) {
      const expectedSlot = expectedDay.slots[s];
      const actualSlot = actualDay.slots[s];

      if (!actualSlot.selected_exercise_id) {
        throw new Error(`Missing selected_exercise_id for slot ${s + 1} on ${expectedDay.day}`);
      }

      const found = expectedSlot.valid_options.find(
        opt => opt.id === actualSlot.selected_exercise_id
      );

      if (!found) {
        throw new Error(
          `Constraint Violation: Exercise '${actualSlot.selected_exercise_id}' is not in valid_options for ${expectedSlot.pattern}`
        );
      }

      // Enrich slot with metadata
      actualSlot.selected_exercise_name = found.name;
      actualSlot.equipment = found.equipment;
      actualSlot.prescription = expectedSlot.prescription;
      if (!actualSlot.reason) {
        actualSlot.reason = `Selected to target ${found.muscles_primary?.join(', ')} safely within your current recovery capacity.`;
      }
    }
  }

  return true;
}

/**
 * Calls the Google Gemini API with strict JSON schema enforcement.
 */
async function callGeminiApi(prompt, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textContent) {
    throw new Error('Gemini API returned empty response');
  }

  return JSON.parse(textContent);
}

/**
 * Main AI Service Entry: Generates the finalized workout plan.
 * 
 * @param {Object} simulationResult - Output from assembleSimulation
 * @returns {Promise<Object>} Finalized plan JSON matching required schema
 */
export async function generateFinalPlan(simulationResult) {
  const apiKey = process.env.GEMINI_API_KEY;
  const skipAi = process.env.SKIP_AI === 'true' || !apiKey || apiKey === 'your_key_here';

  if (skipAi) {
    const fallbackPlan = generateDeterministicPlan(simulationResult);
    validatePlanResponse(fallbackPlan, simulationResult);
    return fallbackPlan;
  }

  const prompt = buildSystemPrompt(simulationResult);

  // Attempt API call with single retry on failure
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const rawPlan = await callGeminiApi(prompt, apiKey);
      validatePlanResponse(rawPlan, simulationResult);
      return rawPlan;
    } catch (err) {
      if (attempt === 2) {
        // Fallback to deterministic plan rather than crashing the user workflow
        console.warn(`[AI Service] Gemini call failed (${err.message}). Falling back to deterministic solver.`);
        const fallback = generateDeterministicPlan(simulationResult);
        validatePlanResponse(fallback, simulationResult);
        return fallback;
      }
    }
  }
}
