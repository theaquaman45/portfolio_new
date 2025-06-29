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

function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Always start with dark mode

  useEffect(() => {
    // Force dark mode always
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');

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
    // Keep dark mode always - no actual toggle
    setIsDarkMode(true);
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };

  return (
    <div className="min-h-screen bg-white/80 dark:bg-slate-900/80 text-gray-800 dark:text-gray-200 apple-transition relative overflow-x-hidden">
      <LiquidFlowEffect />
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