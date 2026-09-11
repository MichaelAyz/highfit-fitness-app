import { useState } from 'react';
import { Play, AlertCircle } from 'lucide-react';
import SlotCard from '../components/SlotCard';

export default function PlanTab({ plan, onStartWorkout, onOpenAlternatives, onOpenOnboarding }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const days = plan?.days || [];
  const currentDay = days[selectedDayIndex] || days[0];

  return (
    <div>
      <div className="section-header" style={{ marginTop: '0' }}>
        <div>
          <h2 className="section-title">Your Custom Routine</h2>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Personalized to your schedule and recovery
          </span>
        </div>

        <button 
          className="btn-slot-alt" 
          onClick={onOpenOnboarding}
          style={{ color: 'var(--primary-orange)', borderColor: 'var(--primary-orange)', fontWeight: '700' }}
        >
          Recalibrate
        </button>
      </div>

      {/* Day Switcher Pill Group */}
      <div className="pill-group" style={{ marginBottom: '16px' }}>
        {days.map((dayObj, idx) => (
          <button
            key={idx}
            className={`pill-item ${selectedDayIndex === idx ? 'active' : ''}`}
            onClick={() => setSelectedDayIndex(idx)}
          >
            Day {idx + 1}
          </button>
        ))}
      </div>

      {/* Current Day Header Card */}
      {currentDay && (
        <div style={{
          background: 'var(--bg-surface-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-main)' }}>
              {currentDay.day}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              {currentDay.slots?.length || 0} Targeted Movement Slots
            </span>
          </div>

          <button 
            className="btn-start-workout"
            style={{ padding: '8px 14px', fontSize: '12px' }}
            onClick={() => onStartWorkout(currentDay)}
          >
            <Play size={13} fill="#FFF" />
            Start
          </button>
        </div>
      )}

      {/* Slots List */}
      <div style={{ marginBottom: '24px' }}>
        {currentDay?.slots?.map((slot, idx) => (
          <SlotCard
            key={idx}
            slot={slot}
            index={idx}
            onOpenAlternatives={() => onOpenAlternatives(slot, idx, selectedDayIndex)}
          />
        ))}
      </div>

      <div style={{
        background: '#FFF9F0',
        border: '1px solid #FFE0B2',
        borderRadius: 'var(--radius-sm)',
        padding: '12px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        marginBottom: '20px'
      }}>
        <AlertCircle size={16} color="#F57C00" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span style={{ fontSize: '11px', color: '#B26A00', lineHeight: 1.4 }}>
          <strong>Safety Rules:</strong> All exercises were selected from your equipment profile and vetted against joint strain and fatigue budget limits.
        </span>
      </div>
    </div>
  );
}
