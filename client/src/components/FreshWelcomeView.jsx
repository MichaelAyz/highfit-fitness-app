import { Dumbbell, ArrowRight, ShieldCheck, Zap, Target } from 'lucide-react';

export default function FreshWelcomeView({ onStartAssessment, onExploreSample }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '40px 16px 20px 16px',
      minHeight: '80vh',
      justifyContent: 'center'
    }}>
      {/* Brand Icon */}
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, var(--primary-orange), #FF8A50)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        boxShadow: 'var(--shadow-btn)',
        marginBottom: '20px'
      }}>
        <Dumbbell size={38} />
      </div>

      <h1 style={{
        fontSize: '26px',
        fontWeight: '800',
        letterSpacing: '-0.6px',
        color: 'var(--text-main)',
        marginBottom: '10px'
      }}>
        Welcome to High<span style={{ color: 'var(--primary-orange)' }}>Fit</span>
      </h1>

      <p style={{
        fontSize: '14px',
        color: 'var(--text-secondary)',
        lineHeight: 1.5,
        maxWidth: '340px',
        marginBottom: '32px'
      }}>
        Your personalized, science-backed workout and nutrition plan in under 2 minutes.
      </p>

      {/* Feature Value Props */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '360px',
        marginBottom: '36px',
        textAlign: 'left'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--primary-orange-light)',
            color: 'var(--primary-orange)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Target size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
              Built for Your Recovery
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Calibrates training volume to your sleep quality and stress levels.
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: '#E0F7F4',
            color: 'var(--accent-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
              Joint-Safe & Gear-Filtered
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Picks proven exercises from the equipment you actually own.
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: '#EDE7F6',
            color: 'var(--accent-purple)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <Zap size={18} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
              Live Guided Rest Timers
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              Track every set with audio countdowns and progression rules.
            </div>
          </div>
        </div>
      </div>

      {/* Main Call to Action */}
      <button
        className="btn-start-workout"
        style={{
          width: '100%',
          maxWidth: '360px',
          justifyContent: 'center',
          padding: '16px',
          fontSize: '15px',
          marginBottom: '12px'
        }}
        onClick={onStartAssessment}
      >
        Start Assessment <ArrowRight size={18} />
      </button>

      <button
        type="button"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          padding: '6px'
        }}
        onClick={onExploreSample}
      >
        Or preview sample workout first
      </button>
    </div>
  );
}
