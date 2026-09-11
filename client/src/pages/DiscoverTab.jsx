import { useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function DiscoverTab({ exercises = [], searchQuery = '', setSearchQuery }) {
  const [selectedPattern, setSelectedPattern] = useState('All');

  const patterns = [
    'All',
    'Squat',
    'Lunge',
    'Hinge',
    'Push_Horizontal',
    'Push_Vertical',
    'Pull_Horizontal',
    'Pull_Vertical',
    'Core',
    'Carry'
  ];

  const filtered = exercises.filter((ex) => {
    const matchesPattern = selectedPattern === 'All' || ex.pattern === selectedPattern;
    const matchesSearch = !searchQuery || 
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.equipment.some(eq => eq.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPattern && matchesSearch;
  });

  return (
    <div>
      <div className="section-header" style={{ marginTop: '0' }}>
        <h2 className="section-title">Exercise Library</h2>
      </div>

      {/* Pattern Filter Pills */}
      <div className="pill-group" style={{ marginBottom: '16px' }}>
        {patterns.map((pat) => (
          <button
            key={pat}
            className={`pill-item ${selectedPattern === pat ? 'active' : ''}`}
            onClick={() => setSelectedPattern(pat)}
          >
            {pat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Exercise Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((ex) => (
          <div
            key={ex.id}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div>
                <span className="slot-pattern-badge" style={{ marginBottom: '4px', display: 'inline-block' }}>
                  {ex.pattern.replace('_', ' ')}
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                  {ex.name}
                </h4>
              </div>

              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                padding: '2px 7px',
                borderRadius: '9999px',
                background: ex.fatigue_cost === 'High' ? '#FFEBEE' : ex.fatigue_cost === 'Medium' ? '#FFF8E1' : '#E8F5E9',
                color: ex.fatigue_cost === 'High' ? '#C62828' : ex.fatigue_cost === 'Medium' ? '#F57F17' : '#2E7D32'
              }}>
                {ex.fatigue_cost} Fatigue
              </span>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <strong>Equipment:</strong> {ex.equipment?.join(', ')} · <strong>Difficulty:</strong> {ex.difficulty}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {ex.muscles_primary?.map((m) => (
                <span
                  key={m}
                  style={{
                    background: 'var(--bg-surface-subtle)',
                    border: '1px solid var(--border-subtle)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {m}
                </span>
              ))}

              {ex.injury_conflict?.length > 0 && (
                <span
                  style={{
                    background: '#FFF3E0',
                    color: '#E65100',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <ShieldAlert size={10} />
                  {ex.injury_conflict.join(', ')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
