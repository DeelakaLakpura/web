import React, { useState } from 'react';
import { motion } from 'framer-motion';
type InputProps = {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};
export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;
  return (
    <div className="relative w-full">
      <motion.label
        className="absolute left-4 pointer-events-none text-[#BCAAA4] transition-colors"
        animate={{
          top: isActive ? '8px' : '50%',
          y: isActive ? '0%' : '-50%',
          fontSize: isActive ? '12px' : '16px',
          color: isFocused ? '#4CAF50' : '#BCAAA4'
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}>

        {label}
      </motion.label>
      <motion.input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isActive ? placeholder : ''}
        className="w-full pt-6 pb-3 px-4 bg-white border-2 border-[#E0E0E0] rounded-xl text-[#2E2E2E] text-base outline-none transition-colors"
        animate={{
          borderColor: isFocused ? '#4CAF50' : '#E0E0E0',
          scale: isFocused ? 1.01 : 1
        }}
        transition={{
          duration: 0.2
        }} />

    </div>);

}