
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, BarChart2, Home, Settings, Utensils } from 'lucide-react';

const AppNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg rounded-t-2xl overflow-hidden z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <NavItem 
          to="/" 
          icon={<Home size={24} />} 
          label="Home" 
          isActive={location.pathname === '/'}
        />
        <NavItem 
          to="/calendar" 
          icon={<CalendarDays size={24} />} 
          label="Calendar" 
          isActive={location.pathname === '/calendar'}
        />
        <NavItem 
          to="/food" 
          icon={<Utensils size={24} />} 
          label="Food" 
          isActive={location.pathname === '/food'}
        />
        <NavItem 
          to="/insights" 
          icon={<BarChart2 size={24} />} 
          label="Insights" 
          isActive={location.pathname === '/insights'}
        />
        <NavItem 
          to="/settings" 
          icon={<Settings size={24} />} 
          label="Settings" 
          isActive={location.pathname === '/settings'}
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
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-16 ${
        isActive 
          ? 'text-primary' 
          : 'text-gray-500 dark:text-gray-400'
      }`}
    >
      <div className="mb-1">{icon}</div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
};

export default AppNavbar;
