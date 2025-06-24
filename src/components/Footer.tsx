import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Code, Coffee, Zap, Star, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('#footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    { href: '#about', label: 'About', icon: '👨‍💻' },
    { href: '#skills', label: 'Skills', icon: '🚀' },
    { href: '#experience', label: 'Experience', icon: '💼' },
    { href: '#projects', label: 'Projects', icon: '🎯' },
    { href: '#contact', label: 'Contact', icon: '📧' }
  ];

  const socialLinks = [
    { 
      href: "https://github.com/sohardpratap", 
      icon: Github, 
      label: "GitHub",
      color: "hover:text-gray-300",
      bgColor: "hover:bg-gray-700"
    },
    { 
      href: "https://linkedin.com/in/sohard-pratap-singh/", 
      icon: Linkedin, 
      label: "LinkedIn",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-600"
    },
    { 
      href: "mailto:sohardpratapsingh346@gmail.com", 
      icon: Mail, 
      label: "Email",
      color: "hover:text-red-400",
      bgColor: "hover:bg-red-600"
    }
  ];

  const stats = [
    { icon: Code, label: 'Lines of Code', value: '50K+' },
    { icon: Coffee, label: 'Cups of Tea', value: '∞' },
    { icon: Star, label: 'GitHub Stars', value: '100+' },
    { icon: Zap, label: 'Projects Built', value: '50+' }
  ];

  return (
    <footer id="footer" className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-gray-300 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-full filter blur-3xl"></div>
        
        {/* Floating Code Elements */}
        <div className="absolute top-40 right-40 floating opacity-20">
          <Terminal size={48} className="text-indigo-400" />
        </div>
        <div className="absolute bottom-40 left-40 floating-delayed opacity-20">
          <Code size={52} className="text-cyan-400" />
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Terminal size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Sohard Pratap Singh
                    </h3>
                    <p className="text-indigo-400 font-medium">Full-Stack Developer & Security Enthusiast</p>
                  </div>
                </div>
                
                <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                  Crafting exceptional digital experiences with cutting-edge technologies. 
                  Passionate about building scalable, secure, and beautiful applications that make a difference.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-3 bg-gray-800 rounded-xl ${social.color} ${social.bgColor} transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl`}
                      aria-label={social.label}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <social.icon size={20} />
                      <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {social.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <Zap size={18} className="mr-2 text-indigo-400" />
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={link.href}>
                      <a 
                        href={link.href} 
                        className="group flex items-center text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="mr-3 text-lg">{link.icon}</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                  <Mail size={18} className="mr-2 text-indigo-400" />
                  Get In Touch
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <a 
                      href="mailto:sohardpratapsingh346@gmail.com" 
                      className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 break-all"
                    >
                      sohardpratapsingh346@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Phone</p>
                    <a 
                      href="tel:+919997697716" 
                      className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                    >
                      +91 9997697716
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="text-gray-300">Dehradun, Uttarakhand, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className={`mb-16 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={stat.label}
                    className="group text-center p-6 glass-effect rounded-2xl hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon size={20} className="text-white" />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className={`flex flex-col md:flex-row justify-between items-center transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <div className="flex items-center mb-4 md:mb-0">
                <p className="text-gray-400 text-sm">
                  &copy; {currentYear} Sohard Pratap Singh.
                </p>
                <Heart size={16} className="mx-2 text-red-500 animate-pulse" />
                <p className="text-gray-400 text-sm">
                
                </p>
                <Coffee size={16} className="mx-2 text-amber-500" />
              </div>
              
              <div className="flex items-center space-x-4">
                
                
                <button 
                  onClick={scrollToTop}
                  className="group p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  aria-label="Scroll to top"
                >
                  <ArrowUp size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;