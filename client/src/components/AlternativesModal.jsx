import { X, Check } from 'lucide-react';

export default function AlternativesModal({ slot, allExercises = [], onSelectAlternative, onClose }) {
  if (!slot) return null;

  // Filter exercises by the slot's pattern
  const validOptions = allExercises.filter(e => e.pattern === slot.pattern);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>
              Select Alternative Exercise
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Movement Pattern: <strong>{slot.pattern.replace('_', ' ')}</strong>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="header-btn"
            style={{ width: '32px', height: '32px' }}
          >
            <X size={16} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '60vh', overflowY: 'auto' }}>
          {validOptions.map((opt) => {
            const isCurrent = (slot.selected_exercise_id === opt.id) || (slot.selected_exercise_name === opt.name);

            return (
              <div
                key={opt.id}
                onClick={() => {
                  onSelectAlternative(opt);
                  onClose();
                }}
                style={{
                  background: isCurrent ? 'var(--primary-orange-light)' : 'var(--bg-card)',
                  border: `1px solid ${isCurrent ? 'var(--primary-orange)' : 'var(--border-light)'}`,
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)' }}>
                    {opt.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {opt.equipment?.join(', ')} · Difficulty: {opt.difficulty} · Fatigue: {opt.fatigue_cost}
                  </div>
                </div>

                {isCurrent && (
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '9999px',
                    background: 'var(--primary-orange)',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Check size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
