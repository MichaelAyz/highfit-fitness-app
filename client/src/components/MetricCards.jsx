import { Activity, Flame, ShieldCheck } from 'lucide-react';

export default function MetricCards({ lifestyleScores, nutrition, strategy }) {
  const recovery = lifestyleScores?.recovery_capacity ?? 80;
  const targetCalories = nutrition?.target_calories ?? 2450;
  const proteinTarget = nutrition?.protein_target ?? 150;

  // Calculate SVG stroke offset for recovery arc
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (recovery / 100) * circumference;

  return (
    <div>
      <div className="section-header" style={{ marginTop: '4px' }}>
        <h2 className="section-title">Your Metrics</h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
          Personalized Targets
        </span>
      </div>

      <div className="metrics-grid">
        {/* Metric Card 1: Circular Recovery Ring */}
        <div className="metric-card">
          <div className="metric-top">
            <div className="circular-gauge">
              <svg width="48" height="48">
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="var(--border-light)"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r={radius}
                  stroke="var(--primary-orange)"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="metric-center-icon">
                <Activity size={16} />
              </div>
            </div>
            <span style={{ 
              fontSize: '10px', 
              fontWeight: '700', 
              color: recovery >= 70 ? 'var(--accent-teal)' : '#FF9800',
              background: recovery >= 70 ? 'var(--accent-teal-light)' : '#FFF3E0',
              padding: '2px 6px',
              borderRadius: '9999px'
            }}>
              {recovery >= 70 ? 'OPTIMAL' : 'MODERATE'}
            </span>
          </div>

          <div>
            <div className="metric-value">
              {recovery}<span className="metric-unit">%</span>
            </div>
            <div className="metric-footer">Recovery Capacity</div>
          </div>
        </div>

        {/* Metric Card 2: Soundwave Equalizer Calories */}
        <div className="metric-card">
          <div className="metric-top">
            <div className="soundwave-visualizer">
              <div className="soundwave-bar" style={{ height: '22px', animationDelay: '0.1s' }} />
              <div className="soundwave-bar" style={{ height: '34px', animationDelay: '0.3s' }} />
              <div className="soundwave-bar" style={{ height: '16px', animationDelay: '0.5s' }} />
              <div className="soundwave-bar" style={{ height: '38px', animationDelay: '0.2s' }} />
              <div className="soundwave-bar" style={{ height: '26px', animationDelay: '0.4s' }} />
              <div className="soundwave-bar" style={{ height: '18px', animationDelay: '0.6s' }} />
            </div>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '9999px',
              background: 'var(--primary-orange-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-orange)'
            }}>
              <Flame size={15} />
            </div>
          </div>

          <div>
            <div className="metric-value">
              {targetCalories.toLocaleString()}<span className="metric-unit">kcal</span>
            </div>
            <div className="metric-footer">Target Energy ({proteinTarget}g Protein)</div>
          </div>
        </div>
      </div>

      {/* Strategy Anchor Badge */}
      <div style={{
        background: 'var(--bg-surface-subtle)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="var(--primary-orange)" />
          <div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-main)' }}>
              Schedule: {strategy?.volume_tier === 'Med' ? 'Mid' : strategy?.volume_tier || 'Mid'} Volume · {strategy?.intensity_tier === 'Med' ? 'Mid' : strategy?.intensity_tier || 'Mid'} Intensity
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Capped at {strategy?.frequency_cap || 3} Days/Week for safe recovery
            </div>
          </div>
        </div>
        <span style={{
          fontSize: '11px',
          fontWeight: '700',
          color: 'var(--primary-orange)',
          background: 'var(--primary-orange-light)',
          padding: '3px 8px',
          borderRadius: '9999px'
        }}>
          ACTIVE
        </span>
      </div>
    </div>
  );
}
