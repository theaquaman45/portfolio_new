import React, { useState, useEffect } from 'react';
import { Code2, Sparkles, Zap } from 'lucide-react';

interface LoadingAnimationProps {
  onComplete: () => void;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const phases = [
    { text: "Initializing...", duration: 800 },
    { text: "Loading Assets...", duration: 600 },
    { text: "Optimizing Performance...", duration: 500 },
    { text: "Almost Ready...", duration: 400 },
    { text: "Welcome!", duration: 300 }
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let phaseTimeout: NodeJS.Timeout;
    
    const startLoading = () => {
      // Smooth progress animation
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsComplete(true);
              setTimeout(onComplete, 800);
            }, 500);
            return 100;
          }
          return prev + Math.random() * 3 + 1;
        });
      }, 50);

      // Phase transitions
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
      clearTimeout(phaseTimeout);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-opacity duration-800 ${
      isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse floating"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-xl animate-pulse floating-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse floating"></div>
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-8">
        {/* Logo/Icon with pulsing effect */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-75 animate-pulse"></div>
            
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-white/30 animate-spin" style={{ animationDuration: '3s' }}></div>
            
            {/* Icon */}
            <Code2 size={32} className="text-white relative z-10 animate-pulse" />
            
            {/* Sparkle effects */}
            <Sparkles 
              size={16} 
              className="absolute top-2 right-2 text-yellow-400 animate-pulse" 
              style={{ animationDelay: '0.5s' }}
            />
            <Zap 
              size={14} 
              className="absolute bottom-2 left-2 text-cyan-400 animate-pulse" 
              style={{ animationDelay: '1s' }}
            />
          </div>
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-2 border-blue-500/30 rounded-full animate-ping"></div>
            <div className="absolute w-40 h-40 border border-purple-500/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        {/* Brand name with typewriter effect */}
        <h1 className="text-4xl font-bold text-white mb-2">
          <span className="gradient-text">Sohard</span>
        </h1>
        <p className="text-gray-300 mb-8 text-lg">Portfolio</p>

        {/* Loading progress */}
        <div className="mb-6">
          {/* Progress bar container */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner mb-4">
            {/* Animated progress bar */}
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              
              {/* Moving highlight */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/3 animate-pulse" 
                   style={{ 
                     transform: 'translateX(-100%)',
                     animation: 'slide 2s infinite linear'
                   }}></div>
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{Math.round(progress)}%</span>
            <span className="text-gray-400">Loading...</span>
          </div>
        </div>

        {/* Loading phase text */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-gray-300 text-sm animate-pulse">
            {phases[currentPhase]?.text}
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-blue-500/30 rounded-tl-lg"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-purple-500/30 rounded-tr-lg"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-pink-500/30 rounded-bl-lg"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30 rounded-br-lg"></div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        
        .floating {
          animation: floating 4s ease-in-out infinite;
        }
        
        .floating-delayed {
          animation: floating 4s ease-in-out infinite;
          animation-delay: -2s;
        }
        
        @keyframes floating {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;