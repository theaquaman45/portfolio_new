import React, { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Code2, Terminal } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl floating-delayed"></div>
      </div>
      
      <div className={`text-center max-w-4xl mx-auto z-10 fade-in ${isVisible ? 'visible' : ''}`}>
        {/* Main Content */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white">
            Hi, I'm <span className="gradient-text">Sohard</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium mb-6 text-gray-600 dark:text-gray-400">
            Computer Science Student & Full-Stack Developer
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Passionate about building innovative solutions with modern technologies. 
            Currently pursuing Computer Science while creating impactful digital experiences.
          </p>
        </div>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['Next.js', 'Django', 'Flutter', 'Python', 'JavaScript'].map((tech, index) => (
            <span 
              key={tech}
              className={`px-4 py-2 glass rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 fade-in ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* CTA Buttons */}
        <div className={`flex flex-wrap justify-center gap-6 mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <a 
            href="#contact" 
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover-lift smooth-transition shadow-lg"
          >
            <span className="flex items-center">
              <Mail size={20} className="mr-2" />
              Get In Touch
            </span>
          </a>
          
          <a 
            href="#projects" 
            className="px-8 py-4 glass text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover-lift smooth-transition"
          >
            <span className="flex items-center">
              <Code2 size={20} className="mr-2" />
              View Projects
            </span>
          </a>
          
          <a 
            href="https://drive.google.com/file/d/1FBRt1H8V0rDy1B6x70S85B7W4qX701di/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition"
          >
            <span className="flex items-center">
              <Download size={20} className="mr-2" />
              Resume
            </span>
          </a>
        </div>
        
        {/* Social Links */}
        <div className={`flex justify-center gap-6 mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          {[
            { href: "https://github.com/sohardpratap", icon: Github, label: "GitHub" },
            { href: "https://linkedin.com/in/sohard-pratap-singh/", icon: Linkedin, label: "LinkedIn" },
            { href: "https://leetcode.com/u/sohardpratapsingh346", icon: Terminal, label: "LeetCode" }
          ].map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 glass rounded-lg hover-scale smooth-transition fade-in ${isVisible ? 'visible' : ''}`}
              aria-label={social.label}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <social.icon size={24} className="text-gray-600 dark:text-gray-400" />
            </a>
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <a 
            href="#about"
            className="inline-flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition"
          >
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <ArrowDown size={24} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;