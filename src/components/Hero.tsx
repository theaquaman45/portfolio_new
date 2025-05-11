import React, { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Code } from 'lucide-react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval: number | null = null;
    
    const startAnimation = () => {
      let iteration = 0;
      const originalText = "SOHARD PRATAP SINGH";
      
      if (titleRef.current) {
        clearInterval(interval as number);
        
        interval = setInterval(() => {
          if (titleRef.current) {
            titleRef.current.innerText = originalText
              .split("")
              .map((letter, index) => {
                if (letter === " ") return " ";
                if (index < iteration) {
                  return originalText[index];
                }
                return letters[Math.floor(Math.random() * 26)];
              })
              .join("");
          }
          
          if (iteration >= originalText.length) {
            clearInterval(interval as number);
          }
          
          iteration += 1 / 3;
        }, 30);
      }
    };
    
    startAnimation();
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-4 bg-gradient-to-br from-white to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-36 -left-36 w-96 h-96 bg-indigo-300 dark:bg-indigo-700 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-60 -right-20 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-24 left-24 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="text-center max-w-5xl mx-auto z-10">
        <h1 
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
        >
          SOHARD PRATAP SINGH
        </h1>
        
        <h2 className="text-xl md:text-2xl font-medium mb-8 text-gray-700 dark:text-gray-300">
          Full-Stack Developer & Security Enthusiast
        </h2>
        
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
          Building exceptional digital experiences with Next.js, Django, and Flutter.
          Passionate about creating scalable, secure, and user-friendly applications.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a 
            href="#contact" 
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get in Touch
          </a>
          <a 
            href="#projects" 
            className="px-8 py-3 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 font-medium rounded-full hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View Projects
          </a>
        </div>
        
        <div className="flex justify-center gap-6 mb-16">
          <a 
            href="https://github.com/sohardpratap" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a 
            href="https://linkedin.com/in/sohard-pratap-singh/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a 
            href="https://leetcode.com/u/sohardpratapsingh346" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
            aria-label="LeetCode"
          >
            <Code size={24} />
          </a>
        </div>
        
        <div className="animate-bounce">
          <a 
            href="#about"
            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
          >
            <ArrowDown size={24} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;