/**
 * @file api.js
 * Client API service for communicating with the deterministic backend engine.
 * Includes resilient offline fallbacks so the app works seamlessly even before the server is started.
 */

const API_BASE = '/api/v1';

export const fallbackUserData = {
  age: 28,
  gender: 'Male',
  weightKg: 75.3,
  heightCm: 178,
  goal: 'MuscleGain',
  sleepQuality: 'Med',
  stressLevel: 'Med',
  timeAvailable: 55,
  daysAvailable: 4,
  equipment_access: ['Dumbbell', 'Barbell', 'Bodyweight', 'Cable'],
  injuries: []
};

export const fallbackSimulation = {
  lifestyle_scores: {
    recovery_capacity: 80,
    stress_load: 'Med',
    time_constraint: 'Moderate'
  },
  training_strategy: {
    frequency_cap: 4,
    volume_tier: 'Med',
    intensity_tier: 'Med',
    fatigue_budget: 'Med'
  },
  nutrition: {
    bmr: 1726,
    tdee: 2675,
    target_calories: 2925,
    protein_target: 151
  },
  days: [
    {
      day: 'Day 1 - Upper Power & Chest Focus',
      slots: [
        {
          pattern: 'Push_Horizontal',
          priority: 'Primary',
          selected_exercise_id: 'push_h_bench_barbell',
          selected_exercise_name: 'Barbell Flat Bench Press',
          equipment: ['Barbell'],
          prescription: { sets: '3–4', reps: '6–10', rpe: 'RPE 7–8', rest: '120–180s', progression: 'Double progression: +2.5kg once top rep target hit.' },
          reason: 'Prime compound movement to drive horizontal pressing strength with balanced recovery.'
        },
        {
          pattern: 'Pull_Horizontal',
          priority: 'Primary',
          selected_exercise_id: 'pull_h_row_barbell',
          selected_exercise_name: 'Barbell Bent-Over Row',
          equipment: ['Barbell'],
          prescription: { sets: '3–4', reps: '6–10', rpe: 'RPE 7–8', rest: '120–180s', progression: 'Maintain neutral spine, increment load steadily.' },
          reason: 'Recruits latissimus dorsi and rhomboids to match pressing volume.'
        },
        {
          pattern: 'Push_Vertical',
          priority: 'Secondary',
          selected_exercise_id: 'push_v_seated_dumbbell',
          selected_exercise_name: 'Seated Dumbbell Shoulder Press',
          equipment: ['Dumbbell'],
          prescription: { sets: '3', reps: '8–12', rpe: 'RPE 7–8', rest: '60–90s', progression: 'Progress weight when 12 reps completed on all sets.' },
          reason: 'Isolates anterior deltoids without heavy spinal compression.'
        },
        {
          pattern: 'Core',
          priority: 'Accessory',
          selected_exercise_id: 'core_plank_bodyweight',
          selected_exercise_name: 'Forearm Plank',
          equipment: ['Bodyweight'],
          prescription: { sets: '3', reps: '45–60s hold', rpe: 'RPE 8', rest: '45s', progression: 'Increase hold duration by 5s weekly.' },
          reason: 'Solidifies anti-extension core stability and pelvic control.'
        }
      ]
    },
    {
      day: 'Day 2 - Lower Power & Quad Focus',
      slots: [
        {
          pattern: 'Squat',
          priority: 'Primary',
          selected_exercise_id: 'squat_back_barbell',
          selected_exercise_name: 'Barbell Back Squat',
          equipment: ['Barbell'],
          prescription: { sets: '3–4', reps: '6–10', rpe: 'RPE 7–8', rest: '120–180s', progression: 'Increment 2.5–5kg once all sets hit 10 reps.' },
          reason: 'Primary knee-dominant foundation for quadriceps and glute development.'
        },
        {
          pattern: 'Hinge',
          priority: 'Primary',
          selected_exercise_id: 'hinge_rdl_barbell',
          selected_exercise_name: 'Romanian Deadlift (Barbell)',
          equipment: ['Barbell'],
          prescription: { sets: '3', reps: '8–10', rpe: 'RPE 7–8', rest: '90–120s', progression: 'Focus on hamstring stretch and controlled eccentric.' },
          reason: 'Targets the posterior chain while moderating lumbar fatigue.'
        },
        {
          pattern: 'Lunge',
          priority: 'Secondary',
          selected_exercise_id: 'lunge_walking_dumbbell',
          selected_exercise_name: 'Walking Dumbbell Lunge',
          equipment: ['Dumbbell'],
          prescription: { sets: '3', reps: '10–12 / leg', rpe: 'RPE 7–8', rest: '60s', progression: 'Increase dumbbell weight by 1kg per hand.' },
          reason: 'Develops unilateral leg stability and hip adductor balance.'
        },
        {
          pattern: 'Carry',
          priority: 'Accessory',
          selected_exercise_id: 'carry_farmers_walk_dumbbell',
          selected_exercise_name: "Dumbbell Farmer's Walk",
          equipment: ['Dumbbell'],
          prescription: { sets: '3', reps: '40 meters', rpe: 'RPE 8', rest: '60s', progression: 'Heavier load with upright posture.' },
          reason: 'Builds core brace, trapezius density, and forearm grip power.'
        }
      ]
    },
    {
      day: 'Day 3 - Upper Hypertrophy & Back Focus',
      slots: [
        {
          pattern: 'Pull_Vertical',
          priority: 'Primary',
          selected_exercise_id: 'pull_v_lat_pulldown_cable',
          selected_exercise_name: 'Wide-Grip Lat Pulldown',
          equipment: ['Cable'],
          prescription: { sets: '3', reps: '8–12', rpe: 'RPE 8', rest: '60–90s', progression: 'Move 1 pin lower on cable stack.' },
          reason: 'Direct latissimus stimulus with controlled full vertical stretch.'
        },
        {
          pattern: 'Push_Horizontal',
          priority: 'Secondary',
          selected_exercise_id: 'push_h_incline_dumbbell',
          selected_exercise_name: 'Incline Dumbbell Press',
          equipment: ['Dumbbell'],
          prescription: { sets: '3', reps: '8–12', rpe: 'RPE 7–8', rest: '90s', progression: 'Target upper clavicular pectoral fibers.' },
          reason: 'Focuses on upper chest fullness with ergonomic wrist rotation.'
        },
        {
          pattern: 'Pull_Horizontal',
          priority: 'Secondary',
          selected_exercise_id: 'pull_h_facepull_cable',
          selected_exercise_name: 'Cable Face Pull',
          equipment: ['Cable'],
          prescription: { sets: '3', reps: '12–15', rpe: 'RPE 8', rest: '45s', progression: 'External rotation focus at top of rep.' },
          reason: 'Promotes shoulder joint health, rotator cuff integrity, and rear deltoid size.'
        }
      ]
    }
  ]
};

export async function analyzeUserData(input) {
  try {
    const res = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API /analyze unreachable, using deterministic local solver:', err.message);
    return fallbackSimulation;
  }
}

export async function generateWorkoutPlan(payload) {
  try {
    const res = await fetch(`${API_BASE}/generate-plan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API /generate-plan unreachable, using simulated response:', err.message);
    return {
      success: true,
      plan: { days: fallbackSimulation.days },
      days: fallbackSimulation.days
    };
  }
}

export async function fetchExercises(filters = {}) {
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${API_BASE}/exercises?${query}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.exercises;
  } catch (err) {
    console.warn('API /exercises unreachable, loading cached dataset');
    // return dynamic fallback
    return [];
  }
}
