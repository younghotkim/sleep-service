'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'outline' | 'solid';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  animate?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  padding = 'md',
  className = '',
  onClick,
  animate = true,
}) => {
  const styles = {
    glass: 'glass-card',
    outline: 'outline-card',
    solid: 'solid-card',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    whileHover: onClick ? { translateY: -4, borderColor: 'rgba(255, 255, 255, 0.2)' } : {},
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  } : {};

  return (
    <Component
      className={`${styles[variant]} ${paddingStyles[padding]} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      {...animationProps}
    >
      {children}
    </Component>
  );
};

export default Card;
