import React, { useEffect, useRef } from 'react';

const LiquidFlowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

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

    // Liquid particle class
    class LiquidParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      life: number;
      maxLife: number;
      type: 'bubble' | 'flow' | 'wave';

      constructor(x: number, y: number, type: 'bubble' | 'flow' | 'wave' = 'flow') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 8 + 2;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.life = 0;
        this.maxLife = Math.random() * 300 + 200;
        this.type = type;
        
        // Color based on type
        const colors = {
          bubble: ['rgba(79, 70, 229, ', 'rgba(139, 92, 246, ', 'rgba(168, 85, 247, '],
          flow: ['rgba(6, 182, 212, ', 'rgba(14, 165, 233, ', 'rgba(59, 130, 246, '],
          wave: ['rgba(16, 185, 129, ', 'rgba(34, 197, 94, ', 'rgba(101, 163, 13, ']
        };
        
        this.color = colors[type][Math.floor(Math.random() * colors[type].length)];
      }

      update(mouseX: number, mouseY: number, time: number) {
        this.life++;
        
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < 150) {
          const force = (150 - distance) / 150;
          this.vx += (dx / distance) * force * 0.5;
          this.vy += (dy / distance) * force * 0.5;
        }

        // Different behaviors based on type
        switch (this.type) {
          case 'bubble':
            this.vy -= 0.02; // Float upward
            this.vx += Math.sin(time * 0.01 + this.x * 0.01) * 0.02;
            break;
          case 'flow':
            this.vx += Math.sin(time * 0.005 + this.y * 0.01) * 0.03;
            this.vy += Math.cos(time * 0.005 + this.x * 0.01) * 0.02;
            break;
          case 'wave':
            this.vx += Math.sin(time * 0.008 + this.y * 0.005) * 0.04;
            this.vy += Math.sin(time * 0.006 + this.x * 0.005) * 0.03;
            break;
        }

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Friction
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Boundary wrapping
        if (this.x < -this.size) this.x = canvas!.width + this.size;
        if (this.x > canvas!.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas!.height + this.size;
        if (this.y > canvas!.height + this.size) this.y = -this.size;

        // Life cycle
        const lifeRatio = this.life / this.maxLife;
        this.opacity = Math.sin(lifeRatio * Math.PI) * 0.8;
        
        return this.life < this.maxLife;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.save();
        
        // Liquid glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        
        gradient.addColorStop(0, this.color + this.opacity + ')');
        gradient.addColorStop(0.5, this.color + (this.opacity * 0.5) + ')');
        gradient.addColorStop(1, this.color + '0)');
        
        ctx.fillStyle = gradient;
        
        // Pulsing effect
        const pulse = 1 + Math.sin(time * 0.01 + this.x * 0.01) * 0.2;
        const size = this.size * pulse;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner highlight
        ctx.fillStyle = this.color + (this.opacity * 0.3) + ')';
        ctx.beginPath();
        ctx.arc(this.x - size * 0.3, this.y - size * 0.3, size * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      
      // Create different types of particles
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const type = Math.random() < 0.4 ? 'bubble' : Math.random() < 0.7 ? 'flow' : 'wave';
        particlesRef.current.push(new LiquidParticle(x, y, type));
      }
    };

    // Liquid flow lines
    const drawFlowLines = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.save();
      
      // Create flowing lines across the screen
      for (let i = 0; i < 5; i++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, 'rgba(79, 70, 229, 0)');
        gradient.addColorStop(0.3, 'rgba(139, 92, 246, 0.1)');
        gradient.addColorStop(0.7, 'rgba(168, 85, 247, 0.1)');
        gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        
        const offsetY = (i * canvas.height / 5) + Math.sin(time * 0.002 + i) * 100;
        const waveHeight = 50 + Math.sin(time * 0.003 + i) * 30;
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = offsetY + Math.sin((x + time * 2) * 0.01 + i) * waveHeight;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      }
      
      ctx.restore();
    };

    // Liquid waves
    const drawLiquidWaves = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.save();
      
      // Bottom wave
      const gradient1 = ctx.createLinearGradient(0, canvas.height - 200, 0, canvas.height);
      gradient1.addColorStop(0, 'rgba(6, 182, 212, 0.05)');
      gradient1.addColorStop(1, 'rgba(14, 165, 233, 0.15)');
      
      ctx.fillStyle = gradient1;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let x = 0; x <= canvas.width; x += 20) {
        const y = canvas.height - 100 + Math.sin((x + time * 3) * 0.01) * 50;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fill();
      
      // Top wave
      const gradient2 = ctx.createLinearGradient(0, 0, 0, 200);
      gradient2.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      gradient2.addColorStop(1, 'rgba(34, 197, 94, 0.05)');
      
      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      
      for (let x = 0; x <= canvas.width; x += 20) {
        const y = 100 + Math.sin((x - time * 2) * 0.008) * 40;
        ctx.lineTo(x, y);
      }
      
      ctx.lineTo(canvas.width, 0);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    };

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      
      // Add particles at mouse position
      if (Math.random() < 0.3) {
        const type = Math.random() < 0.5 ? 'bubble' : 'flow';
        particlesRef.current.push(new LiquidParticle(
          mouseRef.current.x + (Math.random() - 0.5) * 50,
          mouseRef.current.y + (Math.random() - 0.5) * 50,
          type
        ));
      }
    };

    // Scroll-based particle generation
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      
      // Generate particles based on scroll
      if (Math.random() < 0.2) {
        const x = Math.random() * canvas.width;
        const y = scrollPercent * canvas.height;
        particlesRef.current.push(new LiquidParticle(x, y, 'wave'));
      }
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 1;
      
      // Clear canvas with subtle background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw liquid waves
      drawLiquidWaves(ctx, timeRef.current);
      
      // Draw flow lines
      drawFlowLines(ctx, timeRef.current);
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        const alive = particle.update(mouseRef.current.x, mouseRef.current.y, timeRef.current);
        if (alive) {
          particle.draw(ctx, timeRef.current);
        }
        return alive;
      });
      
      // Maintain particle count
      while (particlesRef.current.length < 60) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const type = Math.random() < 0.4 ? 'bubble' : Math.random() < 0.7 ? 'flow' : 'wave';
        particlesRef.current.push(new LiquidParticle(x, y, type));
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Initialize and start animation
    initParticles();
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-60 dark:opacity-80"
      style={{ zIndex: 1 }}
    />
  );
};

export default LiquidFlowEffect;