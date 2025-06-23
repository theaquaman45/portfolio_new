import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Code, Download, Mail, Sparkles, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
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
    
    const timer = setTimeout(startAnimation, 1000);
    
    return () => {
      if (interval) clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full filter blur-3xl opacity-20 animate-blob floating"></div>
        <div className="absolute top-60 -right-32 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000 floating-delayed"></div>
        <div className="absolute bottom-32 left-32 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000 floating"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      </div>
      
      <div className={`text-center max-w-6xl mx-auto z-10 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Floating Icons */}
        <div className="absolute -top-20 left-10 floating">
          <Sparkles className="text-purple-400 opacity-60" size={24} />
        </div>
        <div className="absolute -top-16 right-16 floating-delayed">
          <Zap className="text-pink-400 opacity-60" size={20} />
        </div>
        <div className="absolute top-20 -left-8 floating">
          <Code className="text-cyan-400 opacity-60" size={28} />
        </div>
        
        {/* Main Title */}
        <div className="relative mb-8">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-8xl font-black mb-4 text-gradient-exotic tracking-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            SOHARD PRATAP SINGH
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 blur-2xl -z-10 animate-pulse"></div>
        </div>
        
        {/* Subtitle with Typewriter Effect */}
        <div className="relative mb-8">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            <span className="text-gradient">Full-Stack Developer</span>
            <span className="mx-4 text-purple-500">&</span>
            <span className="text-gradient-exotic">Security Enthusiast</span>
          </h2>
          <div className="flex justify-center items-center space-x-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full">Next.js</span>
            <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 rounded-full">Django</span>
            <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">Flutter</span>
          </div>
        </div>
        
        {/* Description */}
        <p className={`text-lg md:text-xl lg:text-2xl mb-12 max-w-4xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          Crafting <span className="text-gradient font-semibold">exceptional digital experiences</span> with cutting-edge technologies.
          Passionate about building <span className="text-gradient-exotic font-semibold">scalable, secure, and beautiful</span> applications 
          that make a difference.
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-wrap justify-center gap-6 mb-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <a 
            href="#contact" 
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
          >
            <span className="relative z-10 flex items-center">
              <Mail size={20} className="mr-2" />
              Let's Connect
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          
          <a 
            href="#projects" 
            className="group px-8 py-4 glass-effect text-purple-600 dark:text-purple-400 font-bold rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <span className="flex items-center">
              <Code size={20} className="mr-2" />
              View Projects
            </span>
          </a>
          
          <a 
            href="https://drive.google.com/file/d/1FBRt1H8V0rDy1B6x70S85B7W4qX701di/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-emerald-500/25"
          >
            <span className="flex items-center">
              <Download size={20} className="mr-2" />
              Resume
            </span>
          </a>
        </div>
        
        {/* Social Links */}
        <div className={`flex justify-center gap-8 mb-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          {[
            { href: "https://github.com/sohardpratap", icon: Github, label: "GitHub", color: "hover:text-gray-800 dark:hover:text-white" },
            { href: "https://linkedin.com/in/sohard-pratap-singh/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-600" },
            { href: "https://leetcode.com/u/sohardpratapsingh346", icon: Code, label: "LeetCode", color: "hover:text-yellow-600" }
          ].map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-4 glass-effect rounded-full ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-xl`}
              aria-label={social.label}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <social.icon size={24} />
              <span className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {social.label}
              </span>
            </a>
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <div className={`transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <a 
            href="#about"
            className="group inline-flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
          >
            <span className="text-sm font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Discover More
            </span>
            <div className="animate-bounce">
              <ArrowDown size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;