'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  className = '',
}) => {
  return (
    <label className={`checkbox-container ${className}`}>
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="checkbox-input"
        />
        <motion.div
          animate={{
            backgroundColor: checked ? 'var(--primary)' : 'transparent',
            borderColor: checked ? 'var(--primary)' : 'var(--border)',
          }}
          className="checkbox-box"
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <Check size={14} color="white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && <span className="checkbox-label">{label}</span>}
    </label>
  );
};

export default Checkbox;
