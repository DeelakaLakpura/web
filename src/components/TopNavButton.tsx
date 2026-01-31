import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from 'lucide-react';
type TopNavButtonProps = {
  label: string;
  to: string;
  icon?: React.ReactNode;
};
export function TopNavButton({ label, to, icon }: TopNavButtonProps) {
  const navigate = useNavigate();
  return (
    <motion.button
      onClick={() => navigate(to)}
      className="w-full flex items-center justify-between bg-[#E8F5E9] text-[#2E7D32] px-4 py-3 rounded-xl font-medium text-sm"
      whileTap={{
        scale: 0.98
      }}>

      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <ChevronRightIcon size={18} />
    </motion.button>);

}