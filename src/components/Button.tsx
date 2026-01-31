import React from 'react';
import { motion } from 'framer-motion';
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
};
export function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button'
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`w-full py-4 px-6 rounded-xl font-semibold text-base transition-colors ${isPrimary ? 'bg-[#4CAF50] text-white hover:bg-[#45A049]' : 'bg-[#C5E1A5] text-[#2E2E2E] hover:bg-[#8BC34A]'}`}
      whileHover={{
        y: -2,
        boxShadow: '0 8px 20px rgba(76, 175, 80, 0.3)'
      }}
      whileTap={{
        scale: 0.98
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 17
      }}>

      {children}
    </motion.button>);

}