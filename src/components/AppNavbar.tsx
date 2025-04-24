
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, BarChart2, Home, Settings, Utensils } from 'lucide-react';

const AppNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg rounded-t-2xl overflow-hidden z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <NavItem 
          to="/" 
          icon={<Home size={24} className="transition-all duration-300 hover:stroke-[2.5px]" color="#1A1F2C" />} 
          label="Home" 
          isActive={location.pathname === '/'}
          activeColor="text-bloom-500 drop-shadow-[0_0_3px_rgba(236,72,153,0.5)]"
        />
        <NavItem 
          to="/calendar" 
          icon={<CalendarDays size={24} className="transition-all duration-300 hover:stroke-[2.5px]" color="#221F26" />} 
          label="Calendar" 
          isActive={location.pathname === '/calendar'}
          activeColor="text-lavender-500 drop-shadow-[0_0_3px_rgba(139,92,246,0.5)]"
        />
        <NavItem 
          to="/food" 
          icon={<Utensils size={24} className="transition-all duration-300 hover:stroke-[2.5px]" color="#222222" />} 
          label="Food" 
          isActive={location.pathname === '/food'}
          activeColor="text-mint-500 drop-shadow-[0_0_3px_rgba(34,197,94,0.5)]"
        />
        <NavItem 
          to="/insights" 
          icon={<BarChart2 size={24} className="transition-all duration-300 hover:stroke-[2.5px]" color="#333333" />} 
          label="Insights" 
          isActive={location.pathname === '/insights'}
          activeColor="text-sky-500 drop-shadow-[0_0_3px_rgba(14,165,233,0.5)]"
        />
        <NavItem 
          to="/settings" 
          icon={<Settings size={24} className="transition-all duration-300 hover:stroke-[2.5px] animate-pulse" />} 
          label="Settings" 
          isActive={location.pathname === '/settings'}
          activeColor="text-amber-500 drop-shadow-[0_0_3px_rgba(245,158,11,0.5)]"
        />
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  activeColor?: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive, activeColor = "text-primary" }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-16 transition-transform hover:scale-110 active:scale-95 ${
        isActive 
          ? activeColor 
          : 'text-muted-foreground hover:text-foreground transition-colors'
      }`}
    >
      <div className={`mb-1 ${isActive ? 'scale-110' : ''} transition-transform`}>{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default AppNavbar;
