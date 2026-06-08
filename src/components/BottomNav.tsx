import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/', label: '心情', icon: '🌤️', activeIcon: '☀️' },
  { path: '/math', label: '数学', icon: '🌱', activeIcon: '🌻' },
  { path: '/code', label: '代码', icon: '✨', activeIcon: '💫' },
  { path: '/path', label: '方向', icon: '🧭', activeIcon: '⭐' },
  { path: '/safe', label: '树洞', icon: '🌳', activeIcon: '🏡' },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur-xl border-t border-earth-100/80 z-50 nav-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive =
            tab.path === '/'
              ? currentPath === '/'
              : currentPath.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all duration-200 min-w-[56px] ${
                isActive
                  ? 'text-calm-gold scale-105'
                  : 'text-earth-400 hover:text-earth-500'
              }`}
            >
              <span className="text-xl leading-none">
                {isActive ? tab.activeIcon : tab.icon}
              </span>
              <span className="text-[11px] font-medium leading-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0 w-8 h-0.5 bg-calm-gold/60 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
