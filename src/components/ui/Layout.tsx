/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion';
import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  key?: React.Key;
  duration?: number;
}

export const FadeIn = ({ children, delay = 0, direction = 'up', className = '', duration = 0.8 }: FadeInProps) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: directions[direction].y, 
        x: directions[direction].x,
        filter: 'blur(10px)'
      }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const TextReveal = ({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <div className={`overflow-hidden flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.05,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export const MagneticButton = ({ children, className = '', onClick, attachToRef = true }: { children: ReactNode; className?: string; onClick?: () => void; attachToRef?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current && attachToRef) return;
    const { clientX, clientY } = e;
    
    let centerX, centerY;
    if (attachToRef && ref.current) {
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      centerX = left + width / 2;
      centerY = top + height / 2;
    } else {
      // If not attached to ref, use page center or just raw mouse delta (less common for "magnetic")
      // But usually magnetic means it attracts to the element it wraps.
      const { left, top, width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect();
      centerX = left + width / 2;
      centerY = top + height / 2;
    }
    
    mouseX.set((clientX - centerX) * 0.35);
    mouseY.set((clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: dx, y: dy }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export const Counter = ({ value, duration = 2, delay = 0 }: { value: string; duration?: number; delay?: number }) => {
  const ref = useRef(null);
  const isVisible = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (isVisible) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setDisplayValue(Math.floor(progress * numericValue));
        if (progress < 1) requestAnimationFrame(animate);
      };
      
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay * 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isVisible, numericValue, duration, delay]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`glass-card hover:border-white/20 transition-all duration-500 p-8 ${className}`}>
    {children}
  </div>
);

export const Badge = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-bold bg-white/10 text-white tracking-[0.15em] uppercase border border-white/5">
    {children}
  </span>
);

export const Section = ({ id, children, className = '', title, subtitle }: { id?: string; children: ReactNode; className?: string; title?: string; subtitle?: string }) => (
  <section id={id} className={`py-32 px-6 md:px-12 max-w-[1200px] mx-auto ${className}`}>
    {(title || subtitle) && (
      <div className="mb-20">
        {subtitle && <Badge>{subtitle}</Badge>}
        {title && (
          <motion.h2 
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-semibold mt-6 tracking-tight text-white leading-tight"
          >
            {title}
          </motion.h2>
        )}
      </div>
    )}
    {children}
  </section>
);
