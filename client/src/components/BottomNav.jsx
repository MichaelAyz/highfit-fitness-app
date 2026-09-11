import { Home, Calendar, BarChart2, Compass, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'plan', label: 'Routine', icon: Calendar },
    { id: 'stats', label: 'Analytics', icon: BarChart2 },
    { id: 'discover', label: 'Exercises', icon: Compass },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
          >
            <IconComponent size={22} strokeWidth={isActive ? 2.5 : 2} />
            {isActive && <span className="nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
}
