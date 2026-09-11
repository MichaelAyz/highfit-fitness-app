import { TrendingUp } from 'lucide-react';

export default function OverallStatCard({ 
  userWeight = 70, 
  weightUnit = 'kg', 
  targetDays = 3, 
  completedSessions = 0 
}) {
  const displayWeight = weightUnit === 'lbs'
    ? `${Math.round(userWeight * 2.20462)} lbs`
    : `${userWeight} kg`;

  // Weekly days
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Calculate which days have completed sessions
  const activeDayCount = Math.min(completedSessions, 7);

  const weeklyBars = daysOfWeek.map((day, idx) => {
    const isCompleted = idx < activeDayCount;
    return {
      label: day,
      height: isCompleted ? 75 : 28,
      completed: isCompleted,
      tag: isCompleted ? 'Done' : null
    };
  });

  return (
    <div style={{
      background: '#11141A',
      color: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: 'var(--shadow-md)',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#8E98A8', fontWeight: '600', textTransform: 'uppercase' }}>
            Current Body Weight
          </div>
          <div style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            {displayWeight}
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: '#1E232E',
          padding: '6px 12px',
          borderRadius: '9999px',
          fontSize: '11px',
          fontWeight: '700',
          color: completedSessions >= targetDays ? '#10E57A' : '#FF6433'
        }}>
          {completedSessions}/{targetDays} Days Complete
        </div>
      </div>

      {/* Bar Chart Visualization for the Week */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '110px',
        padding: '12px 6px 0 6px',
        borderBottom: '1px solid #1E232E',
        marginBottom: '14px'
      }}>
        {weeklyBars.map((bar) => (
          <div 
            key={bar.label} 
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
          >
            {bar.completed && (
              <span style={{
                fontSize: '9px',
                fontWeight: '800',
                color: '#11141A',
                background: '#10E57A',
                padding: '1px 5px',
                borderRadius: '9999px',
                marginBottom: '-2px'
              }}>
                ✓
              </span>
            )}
            <div 
              style={{
                width: '22px',
                height: `${bar.height}px`,
                borderRadius: '12px',
                background: bar.completed ? '#10E57A' : '#2A303C',
                transition: 'all 0.3s ease'
              }}
            />
            <span style={{ 
              fontSize: '11px', 
              color: bar.completed ? '#FFF' : '#657084', 
              fontWeight: bar.completed ? '700' : '500' 
            }}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>

      {/* Status Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: completedSessions > 0 ? '#10E57A' : '#8E98A8', fontWeight: '700' }}>
          <TrendingUp size={15} />
          <span>
            {completedSessions === 0 
              ? 'Complete first workout to start weekly streak' 
              : `Active Streak: ${completedSessions} session${completedSessions > 1 ? 's' : ''} logged`}
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#8E98A8' }}>
          This Week
        </span>
      </div>
    </div>
  );
}
