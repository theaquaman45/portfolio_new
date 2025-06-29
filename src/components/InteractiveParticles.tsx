import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  life: number;
  maxLife: number;
  connections: number[];
}

const InteractiveParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false });
  const [showConnections, setShowConnections] = useState(true);

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

    const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

    // Create particle
    const createParticle = (x?: number, y?: number): Particle => ({
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 200,
      connections: []
    });

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 50; i++) {
        particlesRef.current.push(createParticle());
      }
    };

    // Update particle
    const updateParticle = (particle: Particle, index: number) => {
      particle.life++;
      
      // Mouse attraction
      const mouseDistance = Math.sqrt(
        (mouseRef.current.x - particle.x) ** 2 + 
        (mouseRef.current.y - particle.y) ** 2
      );
      
      if (mouseDistance < 150) {
        const force = (150 - mouseDistance) / 150;
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
          if (mouseRef.current.isPressed) {
            // Attract to mouse when pressed
            particle.vx += (dx / distance) * force * 0.3;
            particle.vy += (dy / distance) * force * 0.3;
          } else {
            // Gentle orbital motion
            particle.vx += (-dy / distance) * force * 0.1;
            particle.vy += (dx / distance) * force * 0.1;
          }
        }
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Find connections
      particle.connections = [];
      if (showConnections) {
        particlesRef.current.forEach((other, otherIndex) => {
          if (index !== otherIndex) {
            const distance = Math.sqrt(
              (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
            );
            if (distance < 100) {
              particle.connections.push(otherIndex);
            }
          }
        });
      }
      
      return particle.life < particle.maxLife;
    };

    // Draw particle
    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      
      // Particle glow
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.radius * 3
      );
      gradient.addColorStop(0, particle.color + 'FF');
      gradient.addColorStop(0.5, particle.color + '80');
      gradient.addColorStop(1, particle.color + '00');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Particle core
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(
        particle.x - particle.radius * 0.3, 
        particle.y - particle.radius * 0.3, 
        particle.radius * 0.4, 
        0, Math.PI * 2
      );
      ctx.fill();
      
      ctx.restore();
    };

    // Draw connections
    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      if (!showConnections) return;
      
      ctx.save();
      
      particlesRef.current.forEach((particle, index) => {
        particle.connections.forEach(connectionIndex => {
          if (connectionIndex > index) { // Avoid drawing twice
            const other = particlesRef.current[connectionIndex];
            const distance = Math.sqrt(
              (particle.x - other.x) ** 2 + (particle.y - other.y) ** 2
            );
            
            const opacity = (100 - distance) / 100;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });
      
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update particles
      particlesRef.current = particlesRef.current.filter((particle, index) => 
        updateParticle(particle, index)
      );
      
      // Add new particles if needed
      while (particlesRef.current.length < 50) {
        particlesRef.current.push(createParticle());
      }
      
      // Draw connections
      drawConnections(ctx);
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        drawParticle(ctx, particle);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseDown = () => {
      mouseRef.current.isPressed = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create burst of particles
      for (let i = 0; i < 5; i++) {
        const particle = createParticle(
          x + (Math.random() - 0.5) * 20,
          y + (Math.random() - 0.5) * 20
        );
        particle.vx = (Math.random() - 0.5) * 8;
        particle.vy = (Math.random() - 0.5) * 8;
        particlesRef.current.push(particle);
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('click', handleClick);
    
    initParticles();
    animate();

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
  }, [showConnections]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-auto opacity-60 dark:opacity-80"
        style={{ zIndex: 1 }}
      />
      
      <div className="fixed top-24 left-4 z-50 glass-card rounded-2xl p-4">
        <button
          onClick={() => setShowConnections(!showConnections)}
          className={`px-4 py-2 rounded-xl font-semibold apple-transition ${
            showConnections 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
              : 'glass-button text-gray-700 dark:text-gray-300'
          }`}
        >
          {showConnections ? 'Hide Connections' : 'Show Connections'}
        </button>
      </div>
    </>
  );
};

export default InteractiveParticles;