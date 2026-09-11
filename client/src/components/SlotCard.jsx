import { Shuffle, Info } from 'lucide-react';

export default function SlotCard({ slot, index, onOpenAlternatives }) {
  const isCompleted = slot.completed;

  return (
    <div className="slot-card" style={{ borderColor: isCompleted ? '#10E57A' : 'var(--border-light)' }}>
      <div className="slot-card-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="slot-pattern-badge">
            {slot.pattern.replace('_', ' ')}
          </span>
          <span className="slot-priority-badge">
            Slot {index + 1} · {slot.priority || 'Primary'}
          </span>
        </div>

        {slot.equipment && (
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>
            {slot.equipment.join(' / ')}
          </span>
        )}
      </div>

      <div className="slot-title">
        {slot.selected_exercise_name || slot.selected_exercise_id}
      </div>

      {slot.prescription && (
        <div className="slot-prescription">
          <div><strong>Sets:</strong> {slot.prescription.sets}</div>
          <div><strong>Reps:</strong> {slot.prescription.reps}</div>
          <div><strong>Load:</strong> {slot.prescription.rpe}</div>
          <div><strong>Rest:</strong> {slot.prescription.rest}</div>
        </div>
      )}

      {slot.reason && (
        <div className="slot-reason">
          <Info size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px', color: 'var(--primary-orange)' }} />
          {slot.reason}
        </div>
      )}

      <div className="slot-actions">
        {onOpenAlternatives && (
          <button 
            className="btn-slot-alt"
            onClick={() => onOpenAlternatives(slot, index)}
          >
            <Shuffle size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Swap Exercise
          </button>
        )}
      </div>
    </div>
  );
}
