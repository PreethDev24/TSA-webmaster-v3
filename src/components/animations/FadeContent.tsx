'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface FadeContentProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeContent({ children, className = '', delay = 0 }: FadeContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
