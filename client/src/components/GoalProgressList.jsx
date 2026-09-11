import { Target, Award, Flame } from 'lucide-react';

export default function GoalProgressList({ 
  goal = 'MuscleGain', 
  targetCalories = 2450, 
  completedSessions = 0, 
  targetFrequency = 3 
}) {
  // 1. Weekly workout adherence percentage
  const weeklyPercent = targetFrequency > 0 
    ? Math.min(100, Math.round((completedSessions / targetFrequency) * 100)) 
    : 0;

  // 2. Nutrition / Calorie goal adherence
  const nutritionPercent = completedSessions > 0 ? 80 : 0;

  // 3. Double progression mastery
  const progressionPercent = completedSessions > 0 
    ? Math.min(100, completedSessions * 30) 
    : 0;

  const dynamicGoals = [
    {
      id: 1,
      title: goal === 'FatLoss' ? 'Safe Calorie Deficit Target' : 'Hypertrophy Volume Target',
      description: goal === 'FatLoss' 
        ? `${targetCalories} kcal/day target` 
        : `Progressive overload stimulus`,
      percent: nutritionPercent,
      color: '#00BFA5',
      icon: Target
    },
    {
      id: 2,
      title: 'Weekly Routine Consistency',
      description: `${completedSessions} of ${targetFrequency} workouts completed this week`,
      percent: weeklyPercent,
      color: '#FF6433',
      icon: Flame
    },
    {
      id: 3,
      title: 'Double Progression Mastery',
      description: 'Increments load once top rep range reached',
      percent: progressionPercent,
      color: '#7C4DFF',
      icon: Award
    },
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <div className="section-header">
        <h2 className="section-title">Your Goals</h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
          Personalized Targets
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {dynamicGoals.map((g) => {
          const radius = 16;
          const circ = 2 * Math.PI * radius;
          const offset = circ - (g.percent / 100) * circ;
          const IconComp = g.icon;

          return (
            <div
              key={g.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: g.color
                }}>
                  <IconComp size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {g.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {g.description}
                  </div>
                </div>
              </div>

              {/* Progress Ring */}
              <div style={{ position: 'relative', width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="42" height="42" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="21"
                    cy="21"
                    r={radius}
                    stroke="var(--border-light)"
                    strokeWidth="3.5"
                    fill="transparent"
                  />
                  <circle
                    cx="21"
                    cy="21"
                    r={radius}
                    stroke={g.color}
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray={circ}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ position: 'absolute', fontSize: '10px', fontWeight: '800', color: 'var(--text-main)' }}>
                  {g.percent}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
