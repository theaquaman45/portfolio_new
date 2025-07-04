import React, { useState, useEffect } from 'react';
import { Code2, Sparkles, Zap, Heart, Star, Flame } from 'lucide-react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  const phases = [
    { text: "Awakening the magic...", duration: 700, icon: Sparkles },
    { text: "Crafting perfection...", duration: 600, icon: Heart },
    { text: "Igniting creativity...", duration: 500, icon: Flame },
    { text: "Polishing brilliance...", duration: 400, icon: Star },
    { text: "Ready to mesmerize...", duration: 300, icon: Zap }
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let phaseTimeout: NodeJS.Timeout;
    let pulseInterval: NodeJS.Timeout;
    
    const startLoading = () => {
      // Ultra-smooth progress animation with acceleration
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsComplete(true);
              setTimeout(onComplete, 1000);
            }, 600);
            return 100;
          }
          // Accelerating progress for faster feel
          const acceleration = prev < 50 ? 2 : prev < 80 ? 3 : 4;
          return prev + Math.random() * acceleration + 1.5;
        });
      }, 40);

      // Dynamic pulse intensity
      pulseInterval = setInterval(() => {
        setPulseIntensity(prev => prev === 1 ? 1.3 : 1);
      }, 800);

      // Phase transitions with icons
      let currentPhaseIndex = 0;
      const nextPhase = () => {
        if (currentPhaseIndex < phases.length - 1) {
          currentPhaseIndex++;
          setCurrentPhase(currentPhaseIndex);
          phaseTimeout = setTimeout(nextPhase, phases[currentPhaseIndex].duration);
        }
      };
      
      phaseTimeout = setTimeout(nextPhase, phases[0].duration);
    };

    startLoading();

    return () => {
      clearInterval(progressInterval);
      clearInterval(pulseInterval);
      clearTimeout(phaseTimeout);
    };
  }, [onComplete]);

  const CurrentPhaseIcon = phases[currentPhase]?.icon || Sparkles;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
      isComplete ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
    }`} style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      {/* Ultra-dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 via-pink-900 to-rose-900 animate-gradient-shift"></div>
      
      {/* Mesmerizing particle system */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              background: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: Math.random() * 0.8 + 0.2,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Hypnotic rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute border rounded-full animate-spin-slow opacity-20`}
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              borderColor: `hsl(${240 + i * 30}, 70%, 60%)`,
              borderWidth: '2px',
              animationDuration: `${8 + i * 2}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          />
        ))}
      </div>

      {/* Pulsating energy orbs */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full animate-pulse-glow"
            style={{
              left: `${20 + (i * 60) % 80}%`,
              top: `${20 + (i * 40) % 80}%`,
              background: `radial-gradient(circle, hsl(${i * 30}, 80%, 70%), transparent)`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s',
              filter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      {/* Main loading content - Perfectly centered */}
      <div className="relative z-10 text-center max-w-lg mx-auto px-8" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        maxWidth: '90vw'
      }}>
        {/* Spectacular logo with multiple effects */}
        <div className="mb-8 relative">
          <div 
            className="w-28 h-28 mx-auto bg-gradient-to-br from-cyan-400 via-blue-500 via-purple-600 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden transform transition-transform duration-300"
            style={{ 
              transform: `scale(${pulseIntensity})`,
              filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.8))'
            }}
          >
            {/* Animated liquid background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 via-purple-600 to-pink-500 opacity-90 animate-gradient-shift"></div>
            
            {/* Rotating energy rings */}
            <div className="absolute inset-2 border-2 border-white/40 rounded-2xl animate-spin" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-4 border border-white/30 rounded-xl animate-spin" style={{ animationDuration: '6s', animationDirection: 'reverse' }}></div>
            
            {/* Central icon with breathing effect */}
            <Code2 size={36} className="text-white relative z-10 animate-pulse" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.8))' }} />
            
            {/* Floating sparkles */}
            <Sparkles 
              size={18} 
              className="absolute top-2 right-2 text-yellow-300 animate-bounce" 
              style={{ animationDelay: '0.5s', filter: 'drop-shadow(0 0 5px rgba(255,255,0,0.8))' }}
            />
            <Heart 
              size={14} 
              className="absolute bottom-2 left-2 text-pink-300 animate-pulse" 
              style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 5px rgba(255,192,203,0.8))' }}
            />
            <Star 
              size={16} 
              className="absolute top-2 left-2 text-cyan-300 animate-spin" 
              style={{ animationDelay: '1.5s', animationDuration: '3s', filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.8))' }}
            />
          </div>
          
          {/* Hypnotic pulsing aura */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-36 border-2 border-cyan-400/40 rounded-full animate-ping"></div>
            <div className="absolute w-44 h-44 border border-purple-400/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute w-52 h-52 border border-pink-400/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Seductive brand name */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 relative">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-shift">
            Sohard
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse"></div>
        </h1>
        <p className="text-gray-200 mb-8 text-lg md:text-xl font-light tracking-wide">Portfolio Experience</p>

        {/* Mesmerizing progress section */}
        <div className="mb-6">
          {/* Progress bar with liquid effect */}
          <div className="w-full h-2.5 bg-gray-800/50 rounded-full overflow-hidden shadow-inner mb-4 backdrop-blur-sm border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Liquid shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
              
              {/* Flowing highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-1/2 animate-flow"></div>
              
              {/* Pulsing glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-600 to-pink-500 blur-sm opacity-50 animate-pulse"></div>
            </div>
          </div>
          
          {/* Progress info with style */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-cyan-300 font-semibold">{Math.round(progress)}%</span>
            <span className="text-pink-300 font-semibold">Loading Magic...</span>
          </div>
        </div>

        {/* Dynamic phase indicator */}
        <div className="h-10 flex items-center justify-center mb-6">
          <div className="flex items-center space-x-3 bg-black/20 backdrop-blur-sm rounded-full px-5 py-2 border border-white/10">
            <CurrentPhaseIcon 
              size={18} 
              className="text-cyan-400 animate-pulse" 
              style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,255,0.8))' }}
            />
            <p className="text-gray-200 text-sm font-medium animate-pulse">
              {phases[currentPhase]?.text}
            </p>
          </div>
        </div>

        {/* Seductive animated dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full animate-bounce-sexy"
              style={{ 
                background: `hsl(${180 + i * 40}, 70%, 60%)`,
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1.2s',
                filter: `drop-shadow(0 0 5px hsl(${180 + i * 40}, 70%, 60%))`
              }}
            />
          ))}
        </div>
      </div>

      {/* Elegant corner decorations with glow - Adjusted for mobile */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-400/50 rounded-tl-2xl animate-pulse" style={{ filter: 'drop-shadow(0 0 10px rgba(0,255,255,0.5))' }}></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-purple-400/50 rounded-tr-2xl animate-pulse" style={{ animationDelay: '0.5s', filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.5))' }}></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-pink-400/50 rounded-bl-2xl animate-pulse" style={{ animationDelay: '1s', filter: 'drop-shadow(0 0 10px rgba(236,72,153,0.5))' }}></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-blue-400/50 rounded-br-2xl animate-pulse" style={{ animationDelay: '1.5s', filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.5))' }}></div>

      {/* Custom ultra-smooth animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes flow {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(400%); }
        }
        
        @keyframes bounce-sexy {
          0%, 100% { 
            transform: translateY(0) scale(1); 
            opacity: 0.7;
          }
          50% { 
            transform: translateY(-12px) scale(1.2); 
            opacity: 1;
          }
        }
        
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-20px) translateX(10px) rotate(120deg); }
          66% { transform: translateY(10px) translateX(-10px) rotate(240deg); }
        }
        
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(15px) translateX(-15px) rotate(-120deg); }
          66% { transform: translateY(-10px) translateX(15px) rotate(-240deg); }
        }
        
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(-25px) translateX(20px) rotate(180deg); }
        }
        
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          50% { transform: translateY(20px) translateX(-25px) rotate(-180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1);
          }
          50% { 
            opacity: 1; 
            transform: scale(1.5);
          }
        }
        
        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
        
        .animate-flow {
          animation: flow 3s infinite linear;
        }
        
        .animate-bounce-sexy {
          animation: bounce-sexy 1.2s infinite;
        }
        
        .animate-float-0 { animation: float-0 4s infinite ease-in-out; }
        .animate-float-1 { animation: float-1 5s infinite ease-in-out; }
        .animate-float-2 { animation: float-2 3s infinite ease-in-out; }
        .animate-float-3 { animation: float-3 6s infinite ease-in-out; }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;