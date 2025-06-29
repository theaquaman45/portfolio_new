import React, { useEffect, useRef } from 'react';
import { Code, Zap, Star, Heart, Sparkles, Target } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  icon: React.ComponentType<any>;
  color: string;
  physics: {
    mass: number;
    bounce: number;
    gravity: number;
  };
}

const FloatingElements: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const icons = [Code, Zap, Star, Heart, Sparkles, Target];
    const colors = [
      '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', 
      '#10B981', '#EF4444', '#6366F1', '#8B5A2B'
    ];

    // Create floating elements
    const createElement = (): FloatingElement => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      icon: icons[Math.floor(Math.random() * icons.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      physics: {
        mass: Math.random() * 2 + 1,
        bounce: Math.random() * 0.3 + 0.7,
        gravity: Math.random() * 0.02 + 0.01
      }
    });

    // Initialize elements
    for (let i = 0; i < 15; i++) {
      elementsRef.current.push(createElement());
    }

    // Physics simulation
    const updatePhysics = () => {
      elementsRef.current.forEach(element => {
        // Apply gravity
        element.vy += element.physics.gravity;
        
        // Mouse interaction
        const mouseDistance = Math.sqrt(
          (mouseRef.current.x - element.x) ** 2 + 
          (mouseRef.current.y - element.y) ** 2
        );
        
        if (mouseDistance < 100) {
          const force = (100 - mouseDistance) / 100;
          const dx = element.x - mouseRef.current.x;
          const dy = element.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 0) {
            element.vx += (dx / distance) * force * 0.5;
            element.vy += (dy / distance) * force * 0.5;
          }
        }
        
        // Update position
        element.x += element.vx;
        element.y += element.vy;
        element.rotation += element.rotationSpeed;
        
        // Boundary collisions
        if (element.x < 0 || element.x > window.innerWidth) {
          element.vx *= -element.physics.bounce;
          element.x = Math.max(0, Math.min(window.innerWidth, element.x));
        }
        
        if (element.y < 0 || element.y > window.innerHeight) {
          element.vy *= -element.physics.bounce;
          element.y = Math.max(0, Math.min(window.innerHeight, element.y));
        }
        
        // Apply friction
        element.vx *= 0.999;
        element.vy *= 0.999;
      });
    };

    // Render elements
    const render = () => {
      if (!container) return;
      
      // Clear previous elements
      container.innerHTML = '';
      
      elementsRef.current.forEach(element => {
        const IconComponent = element.icon;
        const elementDiv = document.createElement('div');
        elementDiv.className = 'absolute pointer-events-none apple-transition';
        elementDiv.style.cssText = `
          left: ${element.x}px;
          top: ${element.y}px;
          transform: translate(-50%, -50%) rotate(${element.rotation}deg) scale(${element.scale});
          opacity: ${element.opacity};
          color: ${element.color};
          filter: drop-shadow(0 0 10px ${element.color}40);
          z-index: 10;
        `;
        
        // Create icon using a simple approach
        elementDiv.innerHTML = `
          <div style="
            width: 24px; 
            height: 24px; 
            background: ${element.color}; 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center;
            box-shadow: 0 0 20px ${element.color}60;
          ">
            <div style="
              width: 12px; 
              height: 12px; 
              background: white; 
              border-radius: 50%;
              opacity: 0.8;
            "></div>
          </div>
        `;
        
        container.appendChild(elementDiv);
      });
    };

    // Animation loop
    const animate = () => {
      updatePhysics();
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Click to add new element
    const handleClick = (e: MouseEvent) => {
      const newElement = createElement();
      newElement.x = e.clientX;
      newElement.y = e.clientY;
      newElement.vx = (Math.random() - 0.5) * 10;
      newElement.vy = (Math.random() - 0.5) * 10;
      
      elementsRef.current.push(newElement);
      
      // Limit total elements
      if (elementsRef.current.length > 20) {
        elementsRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
};

export default FloatingElements;