import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import SmoothScroll from './components/SmoothScroll';
import PerformanceOptimizer from './components/PerformanceOptimizer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
      "jobTitle": "Computer Science Student & Full Stack Developer",
      "description": "Computer Science student specializing in Next.js, Django, Flutter, and security",
      "url": "https://sohardpratapsingh.netlify.app",
      "sameAs": [
        "https://github.com/sohardpratap",
        "https://linkedin.com/in/sohard-pratap-singh/",
        "https://leetcode.com/u/sohardpratapsingh346"
      ],
      "knowsAbout": [
        "Web Development",
        "Mobile App Development",
        "Computer Science",
        "Full Stack Development",
        "Next.js",
        "Django",
        "Flutter"
      ]
    });
    document.head.appendChild(schemaScript);

    // Performance optimization: Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'style';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(preloadLink);
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
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 smooth-transition relative overflow-x-hidden">
      {/* Performance optimizations */}
      <PerformanceOptimizer />
      <SmoothScroll />
      
      <Navbar 
        toggleTheme={toggleTheme} 
        isDarkMode={isDarkMode}
      />
      
      <main className="scroll-section">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;