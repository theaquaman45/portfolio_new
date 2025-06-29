import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Education from './components/Education';
import Certifications from './components/Certifications';
import LiquidFlowEffect from './components/LiquidFlowEffect';
import PhysicsEngine from './components/PhysicsEngine';
import FloatingElements from './components/FloatingElements';
import InteractiveParticles from './components/InteractiveParticles';
import DraggableControl from './components/DraggableControl';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [physicsMode, setPhysicsMode] = useState<'liquid' | 'physics' | 'particles'>('liquid');

  useEffect(() => {
    // Check user's preference from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Add schema markup for SEO
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Sohard Pratap Singh",
      "jobTitle": "Full Stack Developer",
      "description": "Full Stack Developer specializing in Next.js, Django, Flutter, and security",
      "url": "https://sohardpratapsingh.netlify.app",
      "sameAs": [
        "https://github.com/sohardpratap",
        "https://linkedin.com/in/sohard-pratap-singh/",
        "https://leetcode.com/u/sohardpratapsingh346"
      ],
      "knowsAbout": [
        "Web Development",
        "Mobile App Development",
        "Cybersecurity",
        "Full Stack Development",
        "Next.js",
        "Django",
        "Flutter"
      ]
    });
    document.head.appendChild(schemaScript);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-gray-200 apple-transition relative overflow-x-hidden">
      {/* Background Effects */}
      {physicsMode === 'liquid' && <LiquidFlowEffect />}
      {physicsMode === 'physics' && <PhysicsEngine />}
      {physicsMode === 'particles' && <InteractiveParticles />}
      <FloatingElements />
      
      {/* Draggable Physics Mode Switcher */}
      <DraggableControl 
        initialPosition={{ x: window.innerWidth - 200, y: 100 }}
        className="glass-card rounded-2xl p-4"
      >
        <div className="flex flex-col space-y-2">
          <div className="text-xs text-gray-600 dark:text-gray-400 text-center mb-2 flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2"></div>
            Physics Mode
          </div>
          {[
            { mode: 'liquid', label: '🌊 Liquid', desc: 'Liquid Flow' },
            { mode: 'physics', label: '⚛️ Physics', desc: 'Physics Engine' },
            { mode: 'particles', label: '✨ Particles', desc: 'Interactive Particles' }
          ].map(({ mode, label, desc }) => (
            <button
              key={mode}
              onClick={() => setPhysicsMode(mode as any)}
              className={`px-3 py-2 rounded-xl text-sm font-semibold apple-transition apple-hover ${
                physicsMode === mode
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'glass-button text-gray-700 dark:text-gray-300'
              }`}
              title={desc}
            >
              {label}
            </button>
          ))}
        </div>
      </DraggableControl>
      
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;