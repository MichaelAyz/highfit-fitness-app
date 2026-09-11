import { X, Home, Calendar, BarChart2, Compass, User, RefreshCw, RotateCcw, Dumbbell, Shield } from 'lucide-react';

export default function SideDrawer({ isOpen, onClose, activeTab, setActiveTab, onOpenOnboarding, onResetToFreshUser }) {
  if (!isOpen) return null;

  const navItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home },
    { id: 'plan', label: 'Workout Routine', icon: Calendar },
    { id: 'stats', label: 'Analytics & Stats', icon: BarChart2 },
    { id: 'discover', label: 'Exercise Library', icon: Compass },
    { id: 'profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{ justifyContent: 'flex-start' }}
    >
      <div 
        style={{
          width: '80%',
          maxWidth: '320px',
          height: '100%',
          background: '#FFFFFF',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
          animation: 'slideInLeft 0.25s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
            <div className="brand-badge">
              <div className="brand-logo-icon">
                <Dumbbell size={18} />
              </div>
              <div className="brand-title">
                High<span>Fit</span>
              </div>
            </div>
            <button onClick={onClose} className="header-btn" style={{ width: '32px', height: '32px' }}>
              <X size={16} />
            </button>
          </div>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'var(--primary-orange-light)' : 'transparent',
                    color: isActive ? 'var(--primary-orange)' : 'var(--text-main)',
                    fontWeight: isActive ? '700' : '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <IconComp size={18} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>

          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Quick Actions
            </div>

            <button
              className="btn-slot-alt"
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                marginBottom: '8px',
                color: 'var(--text-main)'
              }}
              onClick={() => {
                onClose();
                onOpenOnboarding();
              }}
            >
              <RefreshCw size={14} color="var(--primary-orange)" />
              <span>Update Assessment</span>
            </button>

            <button
              className="btn-slot-alt"
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 12px',
                color: '#D32F2F',
                borderColor: '#FFCDD2'
              }}
              onClick={() => {
                if (confirm('Start completely fresh as a new user? This will reset your current plan.')) {
                  onClose();
                  onResetToFreshUser();
                }
              }}
            >
              <RotateCcw size={14} />
              <span>Reset to Fresh User</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Shield size={12} color="var(--accent-teal)" />
            <strong>Deterministic Training Engine</strong>
          </div>
          v1.0 · Fresh Science-Backed Splits
        </div>
      </div>
    </div>
  );
}
