import { useState } from 'react';
import { User, Star, Users, Moon, Clock, ShieldCheck, RefreshCw, RotateCcw, ChevronRight } from 'lucide-react';

export default function ProfileTab({ 
  userData, 
  lifestyleScores, 
  nutrition, 
  trainingStrategy, 
  onOpenOnboarding,
  onResetToFreshUser 
}) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const userWeightDisplay = userData?.weightUnit === 'lbs' 
    ? `${Math.round(userData.weightKg * 2.20462)} lbs` 
    : `${userData?.weightKg || 70} kg`;

  const userHeightDisplay = userData?.heightUnit === 'ft'
    ? `${Math.floor(userData.heightCm / 30.48)}' ${Math.round((userData.heightCm % 30.48) / 2.54)}"`
    : `${userData?.heightCm || 175} cm`;

  return (
    <div>
      {/* Profile Header Card */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '9999px',
          background: 'linear-gradient(135deg, var(--primary-orange), #FF8A50)',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: '800'
        }}>
          {userData?.gender === 'Female' ? 'F' : 'HF'}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-main)' }}>
            HighFit Member
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            {userWeightDisplay} · {userHeightDisplay} · {userData?.goal === 'MuscleGain' ? 'Build Muscle' : 'Lose Fat'}
          </span>
        </div>

        {/* Time Spending Stat Chip */}
        <div style={{
          background: 'var(--bg-surface-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 12px',
          textAlign: 'right'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '800', color: 'var(--primary-orange)' }}>
            <Clock size={13} />
            0 h 45 m
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
            Time Active
          </div>
        </div>
      </div>

      {/* Plan Rules & Constraints Panel */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-light)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        marginBottom: '20px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={18} color="var(--primary-orange)" />
            <span style={{ fontSize: '13px', fontWeight: '800' }}>Active Training Rules</span>
          </div>
          <button
            onClick={onOpenOnboarding}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary-orange)',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '3px'
            }}
          >
            <RefreshCw size={11} /> Recalibrate
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>RECOVERY CAPACITY</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
              {lifestyleScores?.recovery_capacity}%
            </div>
          </div>
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>WORKOUT DAYS</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary-orange)' }}>
              {trainingStrategy?.frequency_cap} Days / wk
            </div>
          </div>
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>TARGET ENERGY</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
              {nutrition?.target_calories} kcal
            </div>
          </div>
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '10px' }}>PROTEIN GOAL</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
              {nutrition?.protein_target}g / day
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {[
          { id: 'edit', label: 'Edit Profile & Biometrics', icon: User, action: onOpenOnboarding },
          { id: 'goal', label: 'Set My Goals & Equipment', icon: Star, action: onOpenOnboarding },
          { id: 'invite', label: 'Invite Friends', icon: Users, action: () => { if (navigator.clipboard) navigator.clipboard.writeText(window.location.href); } },
          { id: 'dark', label: 'Dark Mode', icon: Moon, action: toggleDarkMode, isToggle: true },
        ].map((opt) => {
          const IconComp = opt.icon;
          return (
            <div
              key={opt.id}
              onClick={opt.action}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-main)'
                }}>
                  <IconComp size={18} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
                  {opt.label}
                </span>
              </div>

              {opt.isToggle ? (
                <div style={{
                  width: '38px',
                  height: '22px',
                  borderRadius: '9999px',
                  background: darkMode ? 'var(--primary-orange)' : '#E2E8F0',
                  position: 'relative',
                  transition: 'background 0.2s'
                }}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '9999px',
                    background: '#FFF',
                    position: 'absolute',
                    top: '2px',
                    left: darkMode ? '18px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </div>
              ) : (
                <ChevronRight size={18} color="var(--text-muted)" />
              )}
            </div>
          );
        })}

        {/* Reset to Fresh User */}
        <div
          onClick={() => {
            if (confirm('Start fresh as a new user? This will reset all workout data and take you to the first-time setup.')) {
              onResetToFreshUser();
            }
          }}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid #FFCDD2',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              background: '#FFEBEE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D32F2F'
            }}>
              <RotateCcw size={18} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#D32F2F' }}>
                Reset to Fresh User
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Wipe data & restart as first-time user
              </div>
            </div>
          </div>
          <ChevronRight size={18} color="#D32F2F" />
        </div>
      </div>
    </div>
  );
}
