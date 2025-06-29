import React, { useEffect, useRef, useState } from 'react';

interface PhysicsObject {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  color: string;
  trail: { x: number; y: number; opacity: number }[];
  type: 'particle' | 'attractor' | 'repulsor';
  energy: number;
  maxEnergy: number;
}

const PhysicsEngine: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const objectsRef = useRef<PhysicsObject[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const timeRef = useRef(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Physics constants
    const GRAVITY = 0.0001;
    const FRICTION = 0.999;
    const BOUNCE_DAMPING = 0.8;
    const ATTRACTION_STRENGTH = 50;
    const REPULSION_STRENGTH = 100;

    // Create physics object
    const createPhysicsObject = (
      x: number, 
      y: number, 
      type: 'particle' | 'attractor' | 'repulsor' = 'particle'
    ): PhysicsObject => {
      const colors = {
        particle: ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'],
        attractor: ['#10B981', '#06B6D4'],
        repulsor: ['#EF4444', '#F97316']
      };
      
      return {
        id: Math.random(),
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius: type === 'particle' ? Math.random() * 8 + 4 : Math.random() * 12 + 8,
        mass: type === 'particle' ? Math.random() * 2 + 1 : Math.random() * 5 + 3,
        color: colors[type][Math.floor(Math.random() * colors[type].length)],
        trail: [],
        type,
        energy: Math.random() * 100 + 50,
        maxEnergy: 150
      };
    };

    // Initialize physics objects
    const initPhysics = () => {
      objectsRef.current = [];
      
      // Create particles
      for (let i = 0; i < 25; i++) {
        objectsRef.current.push(createPhysicsObject(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          'particle'
        ));
      }
      
      // Create attractors
      for (let i = 0; i < 3; i++) {
        objectsRef.current.push(createPhysicsObject(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          'attractor'
        ));
      }
      
      // Create repulsors
      for (let i = 0; i < 2; i++) {
        objectsRef.current.push(createPhysicsObject(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          'repulsor'
        ));
      }
    };

    // Apply forces between objects
    const applyForces = (obj1: PhysicsObject, obj2: PhysicsObject) => {
      const dx = obj2.x - obj1.x;
      const dy = obj2.y - obj1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance === 0) return;
      
      const normalizedDx = dx / distance;
      const normalizedDy = dy / distance;
      
      // Gravitational attraction between particles
      if (obj1.type === 'particle' && obj2.type === 'particle') {
        const force = (GRAVITY * obj1.mass * obj2.mass) / (distance * distance);
        obj1.vx += normalizedDx * force / obj1.mass;
        obj1.vy += normalizedDy * force / obj1.mass;
      }
      
      // Attractor forces
      if (obj1.type === 'particle' && obj2.type === 'attractor') {
        const force = ATTRACTION_STRENGTH / (distance * distance + 1);
        obj1.vx += normalizedDx * force / obj1.mass;
        obj1.vy += normalizedDy * force / obj1.mass;
      }
      
      // Repulsor forces
      if (obj1.type === 'particle' && obj2.type === 'repulsor') {
        const force = REPULSION_STRENGTH / (distance * distance + 1);
        obj1.vx -= normalizedDx * force / obj1.mass;
        obj1.vy -= normalizedDy * force / obj1.mass;
      }
      
      // Collision detection and response
      if (distance < obj1.radius + obj2.radius) {
        const overlap = obj1.radius + obj2.radius - distance;
        const separationX = normalizedDx * overlap * 0.5;
        const separationY = normalizedDy * overlap * 0.5;
        
        obj1.x -= separationX;
        obj1.y -= separationY;
        obj2.x += separationX;
        obj2.y += separationY;
        
        // Elastic collision
        const relativeVx = obj1.vx - obj2.vx;
        const relativeVy = obj1.vy - obj2.vy;
        const relativeSpeed = relativeVx * normalizedDx + relativeVy * normalizedDy;
        
        if (relativeSpeed > 0) return;
        
        const impulse = 2 * relativeSpeed / (obj1.mass + obj2.mass);
        obj1.vx -= impulse * obj2.mass * normalizedDx * BOUNCE_DAMPING;
        obj1.vy -= impulse * obj2.mass * normalizedDy * BOUNCE_DAMPING;
        obj2.vx += impulse * obj1.mass * normalizedDx * BOUNCE_DAMPING;
        obj2.vy += impulse * obj1.mass * normalizedDy * BOUNCE_DAMPING;
        
        // Energy transfer
        obj1.energy = Math.min(obj1.maxEnergy, obj1.energy + 10);
        obj2.energy = Math.min(obj2.maxEnergy, obj2.energy + 10);
      }
    };

    // Update physics object
    const updateObject = (obj: PhysicsObject, time: number) => {
      // Apply friction
      obj.vx *= FRICTION;
      obj.vy *= FRICTION;
      
      // Mouse interaction
      const mouseDistance = Math.sqrt(
        (mouseRef.current.x - obj.x) ** 2 + (mouseRef.current.y - obj.y) ** 2
      );
      
      if (mouseDistance < 150 && mouseRef.current.isDown) {
        const force = (150 - mouseDistance) / 150;
        const dx = mouseRef.current.x - obj.x;
        const dy = mouseRef.current.y - obj.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          obj.vx += (dx / distance) * force * 2;
          obj.vy += (dy / distance) * force * 2;
          obj.energy = Math.min(obj.maxEnergy, obj.energy + 20);
        }
      }
      
      // Special behaviors for different types
      if (obj.type === 'attractor') {
        obj.x += Math.sin(time * 0.001 + obj.id) * 0.5;
        obj.y += Math.cos(time * 0.001 + obj.id) * 0.5;
      } else if (obj.type === 'repulsor') {
        obj.x += Math.sin(time * 0.002 + obj.id) * 1;
        obj.y += Math.cos(time * 0.002 + obj.id) * 1;
      } else {
        // Apply position updates for particles
        obj.x += obj.vx;
        obj.y += obj.vy;
      }
      
      // Boundary conditions with energy loss
      if (obj.x < obj.radius) {
        obj.x = obj.radius;
        obj.vx *= -BOUNCE_DAMPING;
        obj.energy *= 0.9;
      }
      if (obj.x > canvas.width - obj.radius) {
        obj.x = canvas.width - obj.radius;
        obj.vx *= -BOUNCE_DAMPING;
        obj.energy *= 0.9;
      }
      if (obj.y < obj.radius) {
        obj.y = obj.radius;
        obj.vy *= -BOUNCE_DAMPING;
        obj.energy *= 0.9;
      }
      if (obj.y > canvas.height - obj.radius) {
        obj.y = canvas.height - obj.radius;
        obj.vy *= -BOUNCE_DAMPING;
        obj.energy *= 0.9;
      }
      
      // Update trail
      obj.trail.push({ x: obj.x, y: obj.y, opacity: 1 });
      if (obj.trail.length > 15) {
        obj.trail.shift();
      }
      
      // Update trail opacity
      obj.trail.forEach((point, index) => {
        point.opacity = index / obj.trail.length;
      });
      
      // Energy decay
      obj.energy = Math.max(0, obj.energy - 0.5);
    };

    // Draw physics object
    const drawObject = (ctx: CanvasRenderingContext2D, obj: PhysicsObject) => {
      ctx.save();
      
      // Draw trail
      if (obj.trail.length > 1) {
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        for (let i = 1; i < obj.trail.length; i++) {
          const prev = obj.trail[i - 1];
          const curr = obj.trail[i];
          
          ctx.globalAlpha = curr.opacity * 0.3;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.stroke();
        }
      }
      
      // Draw main object
      ctx.globalAlpha = 1;
      
      // Energy-based glow
      const glowIntensity = obj.energy / obj.maxEnergy;
      const glowRadius = obj.radius * (1 + glowIntensity);
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        obj.x, obj.y, 0,
        obj.x, obj.y, glowRadius * 2
      );
      gradient.addColorStop(0, obj.color + '80');
      gradient.addColorStop(0.5, obj.color + '40');
      gradient.addColorStop(1, obj.color + '00');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, glowRadius * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Main body
      ctx.fillStyle = obj.color;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner highlight
      const highlightGradient = ctx.createRadialGradient(
        obj.x - obj.radius * 0.3, obj.y - obj.radius * 0.3, 0,
        obj.x, obj.y, obj.radius
      );
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Type-specific effects
      if (obj.type === 'attractor') {
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.radius * 2, 0, Math.PI * 2);
        ctx.stroke();
      } else if (obj.type === 'repulsor') {
        ctx.strokeStyle = obj.color;
        ctx.lineWidth = 3;
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.moveTo(obj.x - obj.radius, obj.y);
        ctx.lineTo(obj.x + obj.radius, obj.y);
        ctx.moveTo(obj.x, obj.y - obj.radius);
        ctx.lineTo(obj.x, obj.y + obj.radius);
        ctx.stroke();
      }
      
      ctx.restore();
    };

    // Draw connections between nearby objects
    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      
      for (let i = 0; i < objectsRef.current.length; i++) {
        for (let j = i + 1; j < objectsRef.current.length; j++) {
          const obj1 = objectsRef.current[i];
          const obj2 = objectsRef.current[j];
          
          if (obj1.type !== 'particle' || obj2.type !== 'particle') continue;
          
          const distance = Math.sqrt(
            (obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2
          );
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(obj1.x, obj1.y);
            ctx.lineTo(obj2.x, obj2.y);
            ctx.stroke();
          }
        }
      }
      
      ctx.restore();
    };

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = () => {
      mouseRef.current.isDown = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Add new particle at click location
      objectsRef.current.push(createPhysicsObject(x, y, 'particle'));
      
      // Limit total particles
      if (objectsRef.current.filter(obj => obj.type === 'particle').length > 30) {
        const particleIndex = objectsRef.current.findIndex(obj => obj.type === 'particle');
        if (particleIndex !== -1) {
          objectsRef.current.splice(particleIndex, 1);
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!isActive) return;
      
      timeRef.current += 16;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update physics
      for (let i = 0; i < objectsRef.current.length; i++) {
        const obj1 = objectsRef.current[i];
        updateObject(obj1, timeRef.current);
        
        // Apply forces between objects
        for (let j = i + 1; j < objectsRef.current.length; j++) {
          const obj2 = objectsRef.current[j];
          applyForces(obj1, obj2);
        }
      }
      
      // Draw connections
      drawConnections(ctx);
      
      // Draw objects
      objectsRef.current.forEach(obj => {
        drawObject(ctx, obj);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);
    
    // Initialize and start
    initPhysics();
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isActive]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-auto opacity-70 dark:opacity-90"
        style={{ zIndex: 2 }}
      />
      
      {/* Physics Controls */}
      <div className="fixed top-24 right-4 z-50 glass-card rounded-2xl p-4 space-y-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`w-full px-4 py-2 rounded-xl font-semibold apple-transition ${
            isActive 
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
          }`}
        >
          {isActive ? 'Pause Physics' : 'Start Physics'}
        </button>
        
        <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
          Click to add particles<br/>
          Drag to interact
        </div>
      </div>
    </>
  );
};

export default PhysicsEngine;