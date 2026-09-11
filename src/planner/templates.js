/**
 * @file templates.js
 * Predefined structural training templates defining slot requirements.
 * Templates define structure (slots, patterns, fatigue limits), NOT fixed exercises.
 */

export const TEMPLATES = {
  FULL_BODY_3: {
    id: 'full_body_3',
    name: 'Full Body Foundational 3-Day',
    daysPerWeek: 3,
    muscleFrequency: 'High (3x/week full body stimulus)',
    bestFor: 'General strength, hypertrophy, and optimal recovery across busy schedules',
    tradeoffs: {
      advantages: ['High muscle protein synthesis frequency', 'Flexible scheduling', 'Great systemic fat loss stimulus'],
      disadvantages: ['Longer systemic fatigue per session', 'Requires disciplined exercise rotation']
    },
    days: [
      {
        day: 'Day 1 - Quad & Horizontal Focus',
        slots: [
          { priority: 'Primary', pattern: 'Squat', fatigueBudget: 'Medium' },
          { priority: 'Primary', pattern: 'Push_Horizontal', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Pull_Horizontal', fatigueBudget: 'Medium' },
          { priority: 'Accessory', pattern: 'Core', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 2 - Posterior & Vertical Focus',
        slots: [
          { priority: 'Primary', pattern: 'Hinge', fatigueBudget: 'Medium' },
          { priority: 'Primary', pattern: 'Push_Vertical', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Pull_Vertical', fatigueBudget: 'Medium' },
          { priority: 'Accessory', pattern: 'Carry', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 3 - Unilateral & Density Focus',
        slots: [
          { priority: 'Primary', pattern: 'Lunge', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Push_Horizontal', fatigueBudget: 'Low' },
          { priority: 'Primary', pattern: 'Pull_Horizontal', fatigueBudget: 'Medium' },
          { priority: 'Accessory', pattern: 'Core', fatigueBudget: 'Low' }
        ]
      }
    ]
  },

  UPPER_LOWER_4: {
    id: 'upper_lower_4',
    name: 'Upper / Lower Power & Hypertrophy 4-Day',
    daysPerWeek: 4,
    muscleFrequency: 'Medium-High (2x/week per muscle group)',
    bestFor: 'Dedicated strength progression, focused upper and lower hypertrophy',
    tradeoffs: {
      advantages: ['Shorter, highly focused sessions', 'Lower systemic fatigue per workout', 'Excellent volume tolerance'],
      disadvantages: ['Requires 4 consistent days', 'Less flexibility if workouts are missed']
    },
    days: [
      {
        day: 'Day 1 - Upper Power',
        slots: [
          { priority: 'Primary', pattern: 'Push_Horizontal', fatigueBudget: 'Medium' },
          { priority: 'Primary', pattern: 'Pull_Horizontal', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Push_Vertical', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Core', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 2 - Lower Power',
        slots: [
          { priority: 'Primary', pattern: 'Squat', fatigueBudget: 'Medium' },
          { priority: 'Primary', pattern: 'Hinge', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Lunge', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Carry', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 3 - Upper Hypertrophy',
        slots: [
          { priority: 'Primary', pattern: 'Pull_Vertical', fatigueBudget: 'Medium' },
          { priority: 'Primary', pattern: 'Push_Vertical', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Push_Horizontal', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Pull_Horizontal', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 4 - Lower Hypertrophy',
        slots: [
          { priority: 'Primary', pattern: 'Hinge', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Squat', fatigueBudget: 'Low' },
          { priority: 'Secondary', pattern: 'Lunge', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Core', fatigueBudget: 'Low' }
        ]
      }
    ]
  },

  PUSH_PULL_LEGS_5: {
    id: 'push_pull_legs_5',
    name: 'Push / Pull / Legs Hypertrophy 5-Day',
    daysPerWeek: 5,
    muscleFrequency: 'Adaptive 5-day cycle',
    bestFor: 'Advanced bodybuilders and lifters with high recovery capacity',
    tradeoffs: {
      advantages: ['Maximum volume per muscle group', 'Minimal overlap between training days'],
      disadvantages: ['High time commitment', 'Elevated fatigue risk if sleep/nutrition slips']
    },
    days: [
      {
        day: 'Day 1 - Push Dominant',
        slots: [
          { priority: 'Primary', pattern: 'Push_Horizontal', fatigueBudget: 'Medium' },
          { priority: 'Primary', pattern: 'Push_Vertical', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Push_Horizontal', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Core', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 2 - Pull Dominant',
        slots: [
          { priority: 'Primary', pattern: 'Pull_Horizontal', fatigueBudget: 'Medium' },
          { priority: 'Primary', pattern: 'Pull_Vertical', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Pull_Horizontal', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Carry', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 3 - Legs Dominant',
        slots: [
          { priority: 'Primary', pattern: 'Squat', fatigueBudget: 'Medium' },
          { priority: 'Primary', pattern: 'Hinge', fatigueBudget: 'Medium' },
          { priority: 'Secondary', pattern: 'Lunge', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Core', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 4 - Upper Density',
        slots: [
          { priority: 'Primary', pattern: 'Push_Horizontal', fatigueBudget: 'Low' },
          { priority: 'Primary', pattern: 'Pull_Vertical', fatigueBudget: 'Low' },
          { priority: 'Secondary', pattern: 'Push_Vertical', fatigueBudget: 'Low' },
          { priority: 'Secondary', pattern: 'Pull_Horizontal', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 5 - Lower & Conditioning',
        slots: [
          { priority: 'Primary', pattern: 'Lunge', fatigueBudget: 'Low' },
          { priority: 'Secondary', pattern: 'Hinge', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Carry', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Core', fatigueBudget: 'Low' }
        ]
      }
    ]
  },

  TIME_CRUNCH_2_3: {
    id: 'time_crunch_2_3',
    name: 'Time-Crunched High-Density Routine',
    daysPerWeek: 3,
    muscleFrequency: 'Moderate',
    bestFor: 'Busy professionals with <45 minute training windows or high life stress',
    tradeoffs: {
      advantages: ['High efficiency', 'Low joint wear', 'Low systemic recovery footprint'],
      disadvantages: ['Restricted accessory work', 'Demands strict rest timer adherence']
    },
    days: [
      {
        day: 'Day 1 - Full Body Express A',
        slots: [
          { priority: 'Primary', pattern: 'Squat', fatigueBudget: 'Low' },
          { priority: 'Primary', pattern: 'Push_Horizontal', fatigueBudget: 'Low' },
          { priority: 'Secondary', pattern: 'Pull_Horizontal', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 2 - Full Body Express B',
        slots: [
          { priority: 'Primary', pattern: 'Hinge', fatigueBudget: 'Low' },
          { priority: 'Primary', pattern: 'Push_Vertical', fatigueBudget: 'Low' },
          { priority: 'Secondary', pattern: 'Pull_Vertical', fatigueBudget: 'Low' }
        ]
      },
      {
        day: 'Day 3 - Express Conditioning & Core',
        slots: [
          { priority: 'Primary', pattern: 'Lunge', fatigueBudget: 'Low' },
          { priority: 'Secondary', pattern: 'Core', fatigueBudget: 'Low' },
          { priority: 'Accessory', pattern: 'Carry', fatigueBudget: 'Low' }
        ]
      }
    ]
  }
};
