import { Dumbbell, Shield, Sparkles, Home } from 'lucide-react';

export default function PopularCollections({ onSelectCollection }) {
  const collections = [
    {
      id: 'home',
      title: 'Home Workout',
      exercises: '12 Exercises',
      gradient: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
      icon: Home,
      tag: 'Bodyweight & Dumbbell'
    },
    {
      id: 'chest_abs',
      title: 'Chest & Abdominal',
      exercises: '15 Exercises',
      gradient: 'linear-gradient(135deg, #F6D365, #FDA085)',
      icon: Sparkles,
      tag: 'Horizontal Push & Core'
    },
    {
      id: 'posterior',
      title: 'Posterior & Hinge',
      exercises: '14 Exercises',
      gradient: 'linear-gradient(135deg, #A18CD1, #FBC2EB)',
      icon: Dumbbell,
      tag: 'Spinal Sparing'
    },
    {
      id: 'athletic',
      title: 'Power & Carry',
      exercises: '10 Exercises',
      gradient: 'linear-gradient(135deg, #48C6EF, #6F86D6)',
      icon: Shield,
      tag: 'Full Body Density'
    }
  ];

  return (
    <div style={{ marginBottom: '24px' }}>
      <div className="section-header">
        <h2 className="section-title">Workout Collections</h2>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600' }}>Curated Curriculums</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {collections.map((col) => {
          const IconComp = col.icon;
          return (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col)}
              style={{
                background: col.gradient,
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '125px',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  fontSize: '10px',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}>
                  {col.exercises}
                </span>
                <IconComp size={18} color="#FFF" />
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', lineHeight: 1.2, marginBottom: '2px' }}>
                  {col.title}
                </div>
                <div style={{ fontSize: '10px', opacity: 0.9, fontWeight: '500' }}>
                  {col.tag}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
