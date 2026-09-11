/**
 * @file exercises.js
 * Curated, authoritative exercise database.
 * Single source of truth for all movement patterns and equipment requirements.
 * 
 * Strict Schema:
 * {
 *   id: string,
 *   name: string,
 *   pattern: "Squat" | "Lunge" | "Hinge" | "Push_Horizontal" | "Push_Vertical" | "Pull_Horizontal" | "Pull_Vertical" | "Core" | "Carry",
 *   equipment: ("Bodyweight" | "Dumbbell" | "Barbell" | "Machine" | "Cable" | "Band")[],
 *   difficulty: "Beginner" | "Intermediate" | "Advanced",
 *   fatigue_cost: "Low" | "Medium" | "High",
 *   muscles_primary: string[],
 *   injury_conflict: string[]
 * }
 */

export const exercises = [
  // ==================== SQUAT PATTERN ====================
  {
    id: "squat_back_barbell",
    name: "Barbell Back Squat",
    pattern: "Squat",
    equipment: ["Barbell"],
    difficulty: "Advanced",
    fatigue_cost: "High",
    muscles_primary: ["Quadriceps", "Glutes", "Erector Spinae"],
    injury_conflict: ["lower_back_load", "knee_acute_pain"]
  },
  {
    id: "squat_goblet_dumbbell",
    name: "Dumbbell Goblet Squat",
    pattern: "Squat",
    equipment: ["Dumbbell"],
    difficulty: "Beginner",
    fatigue_cost: "Medium",
    muscles_primary: ["Quadriceps", "Glutes", "Core"],
    injury_conflict: ["knee_acute_pain"]
  },
  {
    id: "squat_air_bodyweight",
    name: "Bodyweight Air Squat",
    pattern: "Squat",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Quadriceps", "Glutes"],
    injury_conflict: []
  },
  {
    id: "squat_leg_press_machine",
    name: "Leg Press Machine",
    pattern: "Squat",
    equipment: ["Machine"],
    difficulty: "Beginner",
    fatigue_cost: "Medium",
    muscles_primary: ["Quadriceps", "Glutes"],
    injury_conflict: []
  },
  {
    id: "squat_bulgarian_split_dumbbell",
    name: "Bulgarian Split Squat",
    pattern: "Squat",
    equipment: ["Dumbbell", "Bodyweight"],
    difficulty: "Intermediate",
    fatigue_cost: "High",
    muscles_primary: ["Quadriceps", "Glutes"],
    injury_conflict: ["knee_acute_pain"]
  },
  {
    id: "squat_box_band",
    name: "Resistance Band Box Squat",
    pattern: "Squat",
    equipment: ["Band"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Quadriceps", "Glutes"],
    injury_conflict: []
  },
  {
    id: "squat_hack_machine",
    name: "Hack Squat Machine",
    pattern: "Squat",
    equipment: ["Machine"],
    difficulty: "Intermediate",
    fatigue_cost: "High",
    muscles_primary: ["Quadriceps"],
    injury_conflict: ["knee_acute_pain"]
  },

  // ==================== LUNGE PATTERN ====================
  {
    id: "lunge_walking_dumbbell",
    name: "Walking Dumbbell Lunge",
    pattern: "Lunge",
    equipment: ["Dumbbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Quadriceps", "Glutes", "Hamstrings"],
    injury_conflict: ["knee_acute_pain"]
  },
  {
    id: "lunge_reverse_bodyweight",
    name: "Bodyweight Reverse Lunge",
    pattern: "Lunge",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Quadriceps", "Glutes"],
    injury_conflict: []
  },
  {
    id: "lunge_step_ups_dumbbell",
    name: "Dumbbell Step-Ups",
    pattern: "Lunge",
    equipment: ["Dumbbell"],
    difficulty: "Beginner",
    fatigue_cost: "Medium",
    muscles_primary: ["Glutes", "Quadriceps"],
    injury_conflict: []
  },
  {
    id: "lunge_lateral_bodyweight",
    name: "Lateral Side Lunge",
    pattern: "Lunge",
    equipment: ["Bodyweight", "Dumbbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Low",
    muscles_primary: ["Adductors", "Glutes", "Quadriceps"],
    injury_conflict: ["groin_strain"]
  },

  // ==================== HINGE PATTERN ====================
  {
    id: "hinge_dl_barbell",
    name: "Barbell Conventional Deadlift",
    pattern: "Hinge",
    equipment: ["Barbell"],
    difficulty: "Advanced",
    fatigue_cost: "High",
    muscles_primary: ["Hamstrings", "Glutes", "Erector Spinae"],
    injury_conflict: ["lower_back_load"]
  },
  {
    id: "hinge_rdl_barbell",
    name: "Romanian Deadlift (Barbell)",
    pattern: "Hinge",
    equipment: ["Barbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Hamstrings", "Glutes"],
    injury_conflict: ["lower_back_load"]
  },
  {
    id: "hinge_rdl_dumbbell",
    name: "Dumbbell Romanian Deadlift",
    pattern: "Hinge",
    equipment: ["Dumbbell"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Hamstrings", "Glutes"],
    injury_conflict: ["lower_back_load"]
  },
  {
    id: "hinge_swing_dumbbell",
    name: "Kettlebell / Dumbbell Swing",
    pattern: "Hinge",
    equipment: ["Dumbbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Glutes", "Hamstrings", "Core"],
    injury_conflict: ["lower_back_load"]
  },
  {
    id: "hinge_back_extension_machine",
    name: "45-Degree Back Extension",
    pattern: "Hinge",
    equipment: ["Machine", "Bodyweight"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Erector Spinae", "Glutes", "Hamstrings"],
    injury_conflict: []
  },
  {
    id: "hinge_pull_through_cable",
    name: "Cable Pull-Through",
    pattern: "Hinge",
    equipment: ["Cable"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Glutes", "Hamstrings"],
    injury_conflict: []
  },
  {
    id: "hinge_good_morning_band",
    name: "Resistance Band Good Morning",
    pattern: "Hinge",
    equipment: ["Band"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Hamstrings", "Glutes"],
    injury_conflict: []
  },

  // ==================== PUSH HORIZONTAL ====================
  {
    id: "push_h_bench_barbell",
    name: "Barbell Flat Bench Press",
    pattern: "Push_Horizontal",
    equipment: ["Barbell"],
    difficulty: "Intermediate",
    fatigue_cost: "High",
    muscles_primary: ["Pectoralis Major", "Triceps Brachii", "Anterior Deltoid"],
    injury_conflict: ["shoulder_impingement", "wrist_pain"]
  },
  {
    id: "push_h_bench_dumbbell",
    name: "Dumbbell Flat Bench Press",
    pattern: "Push_Horizontal",
    equipment: ["Dumbbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Pectoralis Major", "Triceps Brachii"],
    injury_conflict: ["shoulder_impingement"]
  },
  {
    id: "push_h_incline_dumbbell",
    name: "Incline Dumbbell Press",
    pattern: "Push_Horizontal",
    equipment: ["Dumbbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Upper Pectoralis", "Anterior Deltoid", "Triceps"],
    injury_conflict: ["shoulder_impingement"]
  },
  {
    id: "push_h_pushup_bodyweight",
    name: "Standard Push-Up",
    pattern: "Push_Horizontal",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Pectoralis Major", "Triceps Brachii", "Core"],
    injury_conflict: ["wrist_pain"]
  },
  {
    id: "push_h_chest_press_machine",
    name: "Machine Chest Press",
    pattern: "Push_Horizontal",
    equipment: ["Machine"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Pectoralis Major", "Triceps"],
    injury_conflict: []
  },
  {
    id: "push_h_cable_crossover",
    name: "Standing Cable Flye",
    pattern: "Push_Horizontal",
    equipment: ["Cable"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Pectoralis Major"],
    injury_conflict: []
  },
  {
    id: "push_h_band_pushup",
    name: "Band-Resisted Push-Up",
    pattern: "Push_Horizontal",
    equipment: ["Band", "Bodyweight"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Pectoralis Major", "Triceps"],
    injury_conflict: ["wrist_pain"]
  },

  // ==================== PUSH VERTICAL ====================
  {
    id: "push_v_ohp_barbell",
    name: "Standing Overhead Barbell Press",
    pattern: "Push_Vertical",
    equipment: ["Barbell"],
    difficulty: "Advanced",
    fatigue_cost: "High",
    muscles_primary: ["Anterior Deltoid", "Lateral Deltoid", "Triceps Brachii"],
    injury_conflict: ["shoulder_impingement", "lower_back_load"]
  },
  {
    id: "push_v_seated_dumbbell",
    name: "Seated Dumbbell Shoulder Press",
    pattern: "Push_Vertical",
    equipment: ["Dumbbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Anterior Deltoid", "Lateral Deltoid", "Triceps"],
    injury_conflict: ["shoulder_impingement"]
  },
  {
    id: "push_v_arnold_dumbbell",
    name: "Arnold Dumbbell Press",
    pattern: "Push_Vertical",
    equipment: ["Dumbbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Deltoids", "Triceps"],
    injury_conflict: ["shoulder_impingement"]
  },
  {
    id: "push_v_pike_pushup",
    name: "Pike Push-Up",
    pattern: "Push_Vertical",
    equipment: ["Bodyweight"],
    difficulty: "Intermediate",
    fatigue_cost: "Low",
    muscles_primary: ["Anterior Deltoid", "Triceps", "Upper Trapezius"],
    injury_conflict: ["wrist_pain"]
  },
  {
    id: "push_v_machine_press",
    name: "Machine Overhead Press",
    pattern: "Push_Vertical",
    equipment: ["Machine"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Anterior Deltoid", "Triceps"],
    injury_conflict: []
  },
  {
    id: "push_v_lateral_raise_dumbbell",
    name: "Dumbbell Lateral Raise",
    pattern: "Push_Vertical",
    equipment: ["Dumbbell"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Lateral Deltoid"],
    injury_conflict: []
  },
  {
    id: "push_v_lateral_raise_cable",
    name: "Cable Lateral Raise",
    pattern: "Push_Vertical",
    equipment: ["Cable"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Lateral Deltoid"],
    injury_conflict: []
  },

  // ==================== PULL HORIZONTAL ====================
  {
    id: "pull_h_row_barbell",
    name: "Barbell Bent-Over Row",
    pattern: "Pull_Horizontal",
    equipment: ["Barbell"],
    difficulty: "Advanced",
    fatigue_cost: "High",
    muscles_primary: ["Latissimus Dorsi", "Rhomboids", "Middle Trapezius"],
    injury_conflict: ["lower_back_load"]
  },
  {
    id: "pull_h_row_single_dumbbell",
    name: "Single-Arm Dumbbell Row",
    pattern: "Pull_Horizontal",
    equipment: ["Dumbbell"],
    difficulty: "Beginner",
    fatigue_cost: "Medium",
    muscles_primary: ["Latissimus Dorsi", "Rhomboids", "Biceps Brachii"],
    injury_conflict: []
  },
  {
    id: "pull_h_seated_cable_row",
    name: "Seated Cable Row",
    pattern: "Pull_Horizontal",
    equipment: ["Cable"],
    difficulty: "Beginner",
    fatigue_cost: "Medium",
    muscles_primary: ["Rhomboids", "Latissimus Dorsi", "Middle Trapezius"],
    injury_conflict: []
  },
  {
    id: "pull_h_chest_supported_row",
    name: "Chest-Supported Machine Row",
    pattern: "Pull_Horizontal",
    equipment: ["Machine"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Upper Back", "Latissimus Dorsi"],
    injury_conflict: []
  },
  {
    id: "pull_h_inverted_row_bodyweight",
    name: "Inverted Bodyweight Row",
    pattern: "Pull_Horizontal",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Rhomboids", "Latissimus Dorsi", "Biceps"],
    injury_conflict: []
  },
  {
    id: "pull_h_facepull_cable",
    name: "Cable Face Pull",
    pattern: "Pull_Horizontal",
    equipment: ["Cable"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Rear Deltoid", "Rotator Cuff", "Upper Trapezius"],
    injury_conflict: []
  },
  {
    id: "pull_h_band_pull_apart",
    name: "Resistance Band Pull-Apart",
    pattern: "Pull_Horizontal",
    equipment: ["Band"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Rear Deltoid", "Rhomboids"],
    injury_conflict: []
  },

  // ==================== PULL VERTICAL ====================
  {
    id: "pull_v_pullup_bodyweight",
    name: "Strict Pull-Up",
    pattern: "Pull_Vertical",
    equipment: ["Bodyweight"],
    difficulty: "Advanced",
    fatigue_cost: "High",
    muscles_primary: ["Latissimus Dorsi", "Biceps Brachii", "Teres Major"],
    injury_conflict: ["shoulder_impingement"]
  },
  {
    id: "pull_v_chinup_bodyweight",
    name: "Underhand Chin-Up",
    pattern: "Pull_Vertical",
    equipment: ["Bodyweight"],
    difficulty: "Intermediate",
    fatigue_cost: "Medium",
    muscles_primary: ["Latissimus Dorsi", "Biceps Brachii"],
    injury_conflict: []
  },
  {
    id: "pull_v_lat_pulldown_cable",
    name: "Wide-Grip Lat Pulldown",
    pattern: "Pull_Vertical",
    equipment: ["Cable", "Machine"],
    difficulty: "Beginner",
    fatigue_cost: "Medium",
    muscles_primary: ["Latissimus Dorsi", "Biceps Brachii"],
    injury_conflict: []
  },
  {
    id: "pull_v_single_arm_pulldown",
    name: "Single-Arm Half-Kneeling Lat Pulldown",
    pattern: "Pull_Vertical",
    equipment: ["Cable"],
    difficulty: "Intermediate",
    fatigue_cost: "Low",
    muscles_primary: ["Latissimus Dorsi"],
    injury_conflict: []
  },
  {
    id: "pull_v_band_pulldown",
    name: "Overhead Band Lat Pulldown",
    pattern: "Pull_Vertical",
    equipment: ["Band"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Latissimus Dorsi"],
    injury_conflict: []
  },

  // ==================== CORE PATTERN ====================
  {
    id: "core_hanging_leg_raise",
    name: "Hanging Leg Raise",
    pattern: "Core",
    equipment: ["Bodyweight"],
    difficulty: "Advanced",
    fatigue_cost: "Medium",
    muscles_primary: ["Rectus Abdominis", "Hip Flexors"],
    injury_conflict: ["lower_back_load"]
  },
  {
    id: "core_plank_bodyweight",
    name: "Forearm Plank",
    pattern: "Core",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Transverse Abdominis", "Rectus Abdominis"],
    injury_conflict: []
  },
  {
    id: "core_ab_wheel_rollout",
    name: "Ab Wheel Rollout",
    pattern: "Core",
    equipment: ["Bodyweight"],
    difficulty: "Advanced",
    fatigue_cost: "Medium",
    muscles_primary: ["Rectus Abdominis", "Latissimus Dorsi"],
    injury_conflict: ["lower_back_load"]
  },
  {
    id: "core_cable_woodchopper",
    name: "Cable Woodchopper",
    pattern: "Core",
    equipment: ["Cable"],
    difficulty: "Intermediate",
    fatigue_cost: "Low",
    muscles_primary: ["Obliques", "Rotational Core"],
    injury_conflict: []
  },
  {
    id: "core_pallof_press",
    name: "Cable / Band Pallof Press",
    pattern: "Core",
    equipment: ["Cable", "Band"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Anti-Rotational Core", "Obliques"],
    injury_conflict: []
  },
  {
    id: "core_dead_bug_bodyweight",
    name: "Dead Bug",
    pattern: "Core",
    equipment: ["Bodyweight"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Deep Core Stabilizers", "Rectus Abdominis"],
    injury_conflict: []
  },
  {
    id: "core_russian_twist",
    name: "Russian Twist",
    pattern: "Core",
    equipment: ["Bodyweight", "Dumbbell"],
    difficulty: "Beginner",
    fatigue_cost: "Low",
    muscles_primary: ["Obliques"],
    injury_conflict: ["lower_back_load"]
  },

  // ==================== CARRY PATTERN ====================
  {
    id: "carry_farmers_walk_dumbbell",
    name: "Dumbbell Farmer's Walk",
    pattern: "Carry",
    equipment: ["Dumbbell"],
    difficulty: "Beginner",
    fatigue_cost: "Medium",
    muscles_primary: ["Forearms / Grip", "Trapezius", "Core"],
    injury_conflict: []
  },
  {
    id: "carry_suitcase_single_dumbbell",
    name: "Suitcase Carry (Single-Side)",
    pattern: "Carry",
    equipment: ["Dumbbell"],
    difficulty: "Intermediate",
    fatigue_cost: "Low",
    muscles_primary: ["Obliques", "Grip", "Quadratus Lumborum"],
    injury_conflict: []
  },
  {
    id: "carry_waiters_walk_dumbbell",
    name: "Overhead Waiter's Walk",
    pattern: "Carry",
    equipment: ["Dumbbell"],
    difficulty: "Advanced",
    fatigue_cost: "Medium",
    muscles_primary: ["Shoulder Stabilizers", "Core", "Trapezius"],
    injury_conflict: ["shoulder_impingement"]
  }
];

export default exercises;
