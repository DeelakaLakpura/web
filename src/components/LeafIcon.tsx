import React from 'react';
import { motion } from 'framer-motion';
type LeafIconProps = {
  size?: number;
  className?: string;
  animate?: boolean;
};
export function LeafIcon({
  size = 80,
  className = '',
  animate = false
}: LeafIconProps) {
  const leafVariants = {
    initial: {
      opacity: 0,
      rotate: -10,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      rotate: 5,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate ?
  {
    variants: leafVariants,
    initial: 'initial',
    animate: 'animate'
  } :
  {};
  return (
    <Wrapper {...wrapperProps} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">

        {/* Main leaf shape */}
        <path
          d="M40 8C40 8 20 20 16 40C12 60 28 72 40 72C52 72 68 60 64 40C60 20 40 8 40 8Z"
          fill="#4CAF50" />

        {/* Leaf vein - center */}
        <path
          d="M40 16V64"
          stroke="#45A049"
          strokeWidth="2"
          strokeLinecap="round" />

        {/* Leaf veins - left */}
        <path
          d="M40 28L28 36"
          stroke="#45A049"
          strokeWidth="1.5"
          strokeLinecap="round" />

        <path
          d="M40 40L26 46"
          stroke="#45A049"
          strokeWidth="1.5"
          strokeLinecap="round" />

        <path
          d="M40 52L30 56"
          stroke="#45A049"
          strokeWidth="1.5"
          strokeLinecap="round" />

        {/* Leaf veins - right */}
        <path
          d="M40 28L52 36"
          stroke="#45A049"
          strokeWidth="1.5"
          strokeLinecap="round" />

        <path
          d="M40 40L54 46"
          stroke="#45A049"
          strokeWidth="1.5"
          strokeLinecap="round" />

        <path
          d="M40 52L50 56"
          stroke="#45A049"
          strokeWidth="1.5"
          strokeLinecap="round" />

        {/* Highlight */}
        <ellipse
          cx="32"
          cy="32"
          rx="6"
          ry="10"
          fill="#8BC34A"
          opacity="0.4"
          transform="rotate(-20 32 32)" />

      </svg>
    </Wrapper>);

}