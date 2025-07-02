import React, { useEffect, useRef } from 'react';

interface LiquidGlassElementsProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'card' | 'button' | 'input' | 'navbar';
  intensity?: 'subtle' | 'medium' | 'strong';
}

const LiquidGlassElements: React.FC<LiquidGlassElementsProps> = ({ 
  children, 
  className = '', 
  variant = 'card',
  intensity = 'medium'
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Subtle liquid morphing animation
      const morph1 = Math.sin(time * 2) * 2;
      const morph2 = Math.cos(time * 1.5) * 1.5;
      const morph3 = Math.sin(time * 3) * 1;
      
      // Apply liquid border radius morphing
      element.style.borderRadius = `
        ${20 + morph1}px 
        ${25 + morph2}px 
        ${22 + morph3}px 
        ${24 + morph1 * 0.5}px / 
        ${23 + morph2 * 0.8}px 
        ${21 + morph3 * 1.2}px 
        ${26 + morph1 * 0.6}px 
        ${20 + morph2 * 0.4}px
      `;
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const getVariantClasses = () => {
    const baseClasses = 'liquid-glass-element apple-transition';
    
    switch (variant) {
      case 'card':
        return `${baseClasses} liquid-glass-card`;
      case 'button':
        return `${baseClasses} liquid-glass-button`;
      case 'input':
        return `${baseClasses} liquid-glass-input`;
      case 'navbar':
        return `${baseClasses} liquid-glass-navbar`;
      default:
        return baseClasses;
    }
  };

  const getIntensityClasses = () => {
    switch (intensity) {
      case 'subtle':
        return 'liquid-glass-subtle';
      case 'strong':
        return 'liquid-glass-strong';
      default:
        return 'liquid-glass-medium';
    }
  };

  return (
    <div 
      ref={elementRef}
      className={`${getVariantClasses()} ${getIntensityClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

export default LiquidGlassElements;