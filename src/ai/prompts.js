/**
 * @file prompts.js
 * Builds the compressed context and prompt for the Optimistic Planning AI.
 */

/**
 * Builds the system prompt for AI plan selection.
 * @param {Object} simulationResult - Output of assembleSimulation
 * @returns {string} Fully formed system prompt
 */
export function buildSystemPrompt(simulationResult) {
  // Compress days and valid options to keep context clean and token-efficient
  const compressedContext = {
    user_summary: simulationResult.user_summary,
    template: simulationResult.template,
    days: simulationResult.days.map(d => ({
      day: d.day,
      slots: d.slots.map(s => ({
        pattern: s.pattern,
        priority: s.priority,
        valid_options: s.valid_options.map(opt => ({
          id: opt.id,
          name: opt.name,
          equipment: opt.equipment,
          difficulty: opt.difficulty,
          fatigue_cost: opt.fatigue_cost
        }))
      }))
    }))
  };

  return `You are an expert fitness coach known for "Optimistic Planning".

Your goal is to finalize a workout plan based STRICTLY on the provided constraints.

Rules:
1. Selection Only: For every Slot, you will receive a valid_options list. Pick EXACTLY ONE exercise from that list.
2. Do NOT invent exercises.
3. Do NOT select exercises outside the provided options.
4. Prefer variety when multiple valid options exist, but reuse is allowed if appropriate.

Explanation Requirement:
For every selection, include a short, encouraging explanation tied to the user’s constraints.

Tone:
Supportive and forward-looking.
Frame lower volume as strategic optimization, never as limitation.

Output Format:
Return STRICT JSON matching the schema below.
No extra text.

Output Schema:
{
  "days": [
    {
      "day": "string",
      "slots": [
        {
          "pattern": "string",
          "selected_exercise_id": "string",
          "reason": "string"
        }
      ]
    }
  ]
}

CONTEXT:
${JSON.stringify(compressedContext, null, 2)}`;
}
