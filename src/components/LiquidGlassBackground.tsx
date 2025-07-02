import React, { useEffect, useRef } from 'react';

const LiquidGlassBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

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

    // Liquid glass orbs
    class LiquidOrb {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      opacity: number;
      pulsePhase: number;
      morphPhase: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 150 + 50;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.morphPhase = Math.random() * Math.PI * 2;
        
        // Apple-inspired color palette
        const colors = [
          'rgba(99, 102, 241, ',    // Indigo
          'rgba(139, 92, 246, ',    // Purple
          'rgba(59, 130, 246, ',    // Blue
          'rgba(16, 185, 129, ',    // Emerald
          'rgba(245, 158, 11, ',    // Amber
          'rgba(236, 72, 153, ',    // Pink
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(time: number, mouseX: number, mouseY: number) {
        // Gentle floating motion
        this.x += this.vx + Math.sin(time * 0.001 + this.pulsePhase) * 0.2;
        this.y += this.vy + Math.cos(time * 0.001 + this.pulsePhase) * 0.2;

        // Mouse interaction - subtle attraction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 300) {
          const force = (300 - distance) / 300 * 0.02;
          this.vx += (dx / distance) * force;
          this.vy += (dy / distance) * force;
        }

        // Boundary wrapping
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;

        // Apply friction
        this.vx *= 0.995;
        this.vy *= 0.995;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.save();

        // Dynamic pulsing
        const pulse = 1 + Math.sin(time * 0.002 + this.pulsePhase) * 0.1;
        const currentRadius = this.radius * pulse;

        // Liquid morphing effect
        const morph1 = Math.sin(time * 0.003 + this.morphPhase) * 0.3;
        const morph2 = Math.cos(time * 0.004 + this.morphPhase) * 0.2;

        // Create liquid glass gradient
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, currentRadius * 1.5
        );
        
        gradient.addColorStop(0, this.color + (this.opacity * 0.8) + ')');
        gradient.addColorStop(0.4, this.color + (this.opacity * 0.4) + ')');
        gradient.addColorStop(0.7, this.color + (this.opacity * 0.1) + ')');
        gradient.addColorStop(1, this.color + '0)');

        // Draw morphing liquid shape
        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        const points = 8;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const radiusVariation = 1 + 
            Math.sin(angle * 3 + time * 0.005 + this.morphPhase) * morph1 +
            Math.cos(angle * 5 + time * 0.003 + this.morphPhase) * morph2;
          
          const x = this.x + Math.cos(angle) * currentRadius * radiusVariation;
          const y = this.y + Math.sin(angle) * currentRadius * radiusVariation;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.closePath();
        ctx.fill();

        // Add inner highlight for glass effect
        const highlightGradient = ctx.createRadialGradient(
          this.x - currentRadius * 0.3, this.y - currentRadius * 0.3, 0,
          this.x, this.y, currentRadius * 0.8
        );
        
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, ' + (this.opacity * 0.6) + ')');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = highlightGradient;
        ctx.fill();

        ctx.restore();
      }
    }

    // Create orbs
    const orbs: LiquidOrb[] = [];
    for (let i = 0; i < 6; i++) {
      orbs.push(new LiquidOrb());
    }

    // Flowing liquid waves
    const drawLiquidWaves = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.save();
      
      // Top wave
      const topGradient = ctx.createLinearGradient(0, 0, 0, 300);
      topGradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
      topGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.04)');
      topGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      
      ctx.fillStyle = topGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      
      for (let x = 0; x <= canvas.width; x += 20) {
        const y = 150 + 
          Math.sin((x + time * 2) * 0.01) * 40 +
          Math.sin((x + time * 3) * 0.005) * 20 +
          Math.sin((x + time * 1.5) * 0.008) * 15;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, 0);
      ctx.closePath();
      ctx.fill();

      // Bottom wave
      const bottomGradient = ctx.createLinearGradient(0, canvas.height - 300, 0, canvas.height);
      bottomGradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
      bottomGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)');
      bottomGradient.addColorStop(1, 'rgba(139, 92, 246, 0.08)');
      
      ctx.fillStyle = bottomGradient;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let x = 0; x <= canvas.width; x += 20) {
        const y = canvas.height - 150 + 
          Math.sin((x - time * 2.5) * 0.008) * 35 +
          Math.sin((x - time * 1.8) * 0.012) * 25 +
          Math.sin((x - time * 3.2) * 0.006) * 18;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Floating particles
    const drawFloatingParticles = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.save();
      
      for (let i = 0; i < 20; i++) {
        const x = (i * 100 + time * 0.5) % (canvas.width + 100);
        const y = 100 + Math.sin(time * 0.001 + i) * 50 + Math.sin(x * 0.01) * 30;
        const size = 2 + Math.sin(time * 0.003 + i) * 1;
        const opacity = 0.3 + Math.sin(time * 0.002 + i) * 0.2;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 16;
      
      // Clear with subtle background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw liquid waves
      drawLiquidWaves(ctx, timeRef.current);
      
      // Update and draw orbs
      orbs.forEach(orb => {
        orb.update(timeRef.current, mouseRef.current.x, mouseRef.current.y);
        orb.draw(ctx, timeRef.current);
      });
      
      // Draw floating particles
      drawFloatingParticles(ctx, timeRef.current);
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60 dark:opacity-40"
      style={{ zIndex: 1 }}
    />
  );
};

export default LiquidGlassBackground;