import { ArrowRight, CheckCircle2, Dumbbell } from 'lucide-react';

export default function LatestActivityList({ activities = [], onSelectWorkout }) {
  const hasActivities = activities && activities.length > 0;

  return (
    <div style={{ marginBottom: '24px' }}>
      <div className="section-header">
        <h2 className="section-title">Latest Activity</h2>
        {hasActivities && (
          <button className="section-action-link" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            See more <ArrowRight size={13} />
          </button>
        )}
      </div>

      {!hasActivities ? (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '24px 16px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '9999px',
            background: 'var(--primary-orange-light)',
            color: 'var(--primary-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}>
            <Dumbbell size={22} />
          </div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '4px' }}>
            No workouts logged yet
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
            Complete your first session today to start tracking your sets, weight progression, and consistency.
          </p>
          <button
            className="btn-start-workout"
            style={{ margin: '0 auto', padding: '8px 16px', fontSize: '12px' }}
            onClick={onSelectWorkout}
          >
            Start Workout
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activities.map((act) => (
            <div
              key={act.id}
              onClick={onSelectWorkout}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'border-color 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-sm)',
                  background: `${act.color || '#FF6433'}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: act.color || '#FF6433'
                }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {act.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {act.category} · <span style={{ fontWeight: '600' }}>{act.reps}</span>
                  </div>
                </div>
              </div>

              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>
                {act.date}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
