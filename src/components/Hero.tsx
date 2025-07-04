import React, { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download, Code2, Terminal, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-20 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full filter blur-3xl floating"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full filter blur-3xl floating-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full filter blur-3xl floating"></div>
        
        {/* Animated particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className={`text-center max-w-5xl mx-auto z-10 fade-in ${isVisible ? 'visible' : ''}`}>
        {/* Enhanced Main Content */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="text-yellow-500 mr-2 animate-pulse" size={24} />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Welcome to my portfolio
            </span>
            <Sparkles className="text-yellow-500 ml-2 animate-pulse" size={24} />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
            Hi, I'm <span className="gradient-text relative">
              Sohard
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-lg rounded-lg"></div>
            </span>
          </h1>
          
          <h2 className="text-2xl md:text-4xl font-medium mb-8 text-gray-600 dark:text-gray-400">
            Computer Science Student & 
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-bold">
              Full-Stack Developer
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Passionate about building innovative solutions with modern technologies. 
            Currently pursuing Computer Science while creating impactful digital experiences 
            that solve real-world problems.
          </p>
        </div>
        
        {/* Enhanced Tech Stack */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { name: 'Next.js', color: 'from-gray-700 to-black' },
            { name: 'Django', color: 'from-green-600 to-green-700' },
            { name: 'Flutter', color: 'from-blue-500 to-blue-600' },
            { name: 'Python', color: 'from-yellow-500 to-yellow-600' },
            { name: 'JavaScript', color: 'from-yellow-400 to-orange-500' }
          ].map((tech, index) => (
            <span 
              key={tech.name}
              className={`px-6 py-3 glass rounded-full text-sm font-semibold text-white bg-gradient-to-r ${tech.color} hover-scale smooth-transition fade-in ${isVisible ? 'visible' : ''} shadow-lg`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {tech.name}
            </span>
          ))}
        </div>
        
        {/* Enhanced CTA Buttons */}
        <div className={`flex flex-wrap justify-center gap-6 mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <a 
            href="#contact" 
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover-lift smooth-transition shadow-xl hover:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 smooth-transition"></div>
            <span className="flex items-center relative z-10">
              <Mail size={20} className="mr-2" />
              Get In Touch
            </span>
          </a>
          
          <a 
            href="#projects" 
            className="px-8 py-4 glass text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover-lift smooth-transition shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700"
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
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition hover-lift shadow-lg"
          >
            <span className="flex items-center">
              <Download size={20} className="mr-2" />
              Resume
            </span>
          </a>
        </div>
        
        {/* Enhanced Social Links */}
        <div className={`flex justify-center gap-6 mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          {[
            { href: "https://github.com/sohardpratap", icon: Github, label: "GitHub", color: "hover:bg-gray-700" },
            { href: "https://linkedin.com/in/sohard-pratap-singh/", icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-600" },
            { href: "https://leetcode.com/u/sohardpratapsingh346", icon: Terminal, label: "LeetCode", color: "hover:bg-yellow-600" }
          ].map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 glass rounded-xl hover-scale smooth-transition fade-in ${isVisible ? 'visible' : ''} ${social.color} shadow-lg hover:shadow-xl group`}
              aria-label={social.label}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <social.icon size={24} className="text-gray-600 dark:text-gray-400 group-hover:text-white smooth-transition" />
            </a>
          ))}
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <a 
            href="#about"
            className="inline-flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition group"
          >
            <span className="text-sm font-medium mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              Scroll to explore
            </span>
            <div className="p-2 glass rounded-full group-hover:bg-blue-600 group-hover:text-white smooth-transition">
              <ArrowDown size={20} className="animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;