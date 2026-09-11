import { Menu, Bell, Dumbbell } from 'lucide-react';

export default function Header({ onOpenMenu, onOpenProfile, notificationCount = 0 }) {
  return (
    <header className="top-header">
      <button 
        className="header-btn" 
        aria-label="Open Navigation Menu"
        onClick={onOpenMenu}
        title="Menu"
      >
        <Menu size={20} />
      </button>

      <div className="brand-badge">
        <div className="brand-logo-icon">
          <Dumbbell size={18} />
        </div>
        <div className="brand-title">
          High<span>Fit</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button 
          className="header-btn" 
          style={{ position: 'relative' }}
          aria-label="Notifications"
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              background: 'var(--primary-orange)',
              color: '#FFF',
              fontSize: '10px',
              fontWeight: '800',
              borderRadius: '9999px',
              padding: '1px 5px',
              lineHeight: '12px'
            }}>
              {notificationCount}
            </span>
          )}
        </button>
        
        <div 
          onClick={onOpenProfile}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '9999px',
            background: '#1A1D24',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
          title="User Profile"
        >
          HF
        </div>
      </div>
    </header>
  );
}
