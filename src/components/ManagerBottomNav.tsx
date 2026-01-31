import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  BarChart3Icon,
  FileTextIcon,
  SettingsIcon } from
'lucide-react';
type NavItem = {
  icon: React.ReactNode;
  label: string;
  path: string;
};
export function ManagerBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems: NavItem[] = [
  {
    icon: <HomeIcon size={22} />,
    label: 'Home',
    path: '/manager'
  },
  {
    icon: <BarChart3Icon size={22} />,
    label: 'Charts',
    path: '/manager/charts'
  },
  {
    icon: <FileTextIcon size={22} />,
    label: 'Reports',
    path: '/manager/reports'
  },
  {
    icon: <SettingsIcon size={22} />,
    label: 'Settings',
    path: '/manager/settings'
  }];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors ${isActive ? 'text-[#4CAF50]' : 'text-gray-400'}`}
              whileTap={{
                scale: 0.95
              }}>

              <div className="relative">
                {item.icon}
                {isActive &&
                <motion.div
                  layoutId="managerActiveTab"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#4CAF50] rounded-full"
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30
                  }} />

                }
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </motion.button>);

        })}
      </div>
    </div>);

}