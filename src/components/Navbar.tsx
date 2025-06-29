import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Terminal, Sparkles, Zap, Code2, User, Briefcase, Mail } from 'lucide-react';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { href: '#about', label: 'About', icon: User, color: 'from-purple-500 to-pink-500' },
    { href: '#skills', label: 'Skills', icon: Code2, color: 'from-cyan-500 to-blue-500' },
    { href: '#experience', label: 'Experience', icon: Briefcase, color: 'from-emerald-500 to-teal-500' },
    { href: '#projects', label: 'Projects', icon: Zap, color: 'from-orange-500 to-red-500' },
    { href: '#contact', label: 'Contact', icon: Mail, color: 'from-indigo-500 to-purple-500' }
  ];

  return (
    <>
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 apple-transition ${
          isScrolled 
            ? 'premium-glass-navbar py-2 shadow-2xl backdrop-blur-3xl' 
            : 'bg-transparent py-4'
        }`}
        style={{
          background: isScrolled 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
            : 'transparent'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Enhanced Logo */}
            <div className="flex-shrink-0">
              <a 
                href="#hero" 
                className="flex items-center space-x-4 group apple-transition"
              >
                <div className="relative">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 apple-transition"></div>
                  
                  {/* Main logo container */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 apple-transition shadow-xl">
                    <Terminal 
                      size={24} 
                      className="text-white group-hover:rotate-12 apple-transition" 
                    />
                    
                    {/* Floating sparkles */}
                    <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 apple-transition">
                      <Sparkles size={12} className="text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-xl font-black text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text apple-transition">
                    Sohard Pratap Singh
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold tracking-wider uppercase">
                    Full Stack Developer
                  </span>
                </div>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-2">
                {/* Navigation Pills Container */}
                <div className="flex items-center space-x-1 p-2 premium-glass-pill rounded-2xl">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.href.slice(1);
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`relative group px-4 py-2.5 rounded-xl font-semibold apple-transition flex items-center space-x-2 ${
                          isActive
                            ? `text-white bg-gradient-to-r ${item.color} shadow-lg scale-105`
                            : 'text-gray-800 dark:text-gray-200 hover:text-white'
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* Icon */}
                        <item.icon 
                          size={16} 
                          className={`${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'} group-hover:scale-110 apple-transition`} 
                        />
                        
                        {/* Label */}
                        <span className="text-sm">{item.label}</span>
                        
                        {/* Hover background */}
                        {!isActive && (
                          <span className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 apple-transition`}></span>
                        )}
                        
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                        )}
                      </a>
                    );
                  })}
                </div>
                
                {/* Dark Mode Indicator (No Toggle) */}
                <div className="ml-4 relative">
                  <div className="group relative p-3 premium-glass-button rounded-2xl overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-20 rounded-2xl"></div>
                    
                    {/* Icon container */}
                    <div className="relative z-10">
                      <Moon size={20} className="text-indigo-400 animate-pulse" />
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl shadow-lg shadow-indigo-500/25"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mobile Controls */}
            <div className="md:hidden flex items-center space-x-3">
              {/* Mobile Dark Mode Indicator */}
              <div className="group p-2.5 premium-glass-button rounded-xl">
                <div className="relative">
                  <Moon size={18} className="text-indigo-400 animate-pulse" />
                </div>
              </div>
              
              {/* Enhanced Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group relative p-2.5 premium-glass-button rounded-xl apple-hover apple-transition overflow-hidden"
                aria-expanded={isMenuOpen}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 apple-transition rounded-xl"></div>
                
                {/* Menu icons with smooth transition */}
                <div className="relative w-6 h-6">
                  <Menu 
                    size={20} 
                    className={`absolute inset-0 apple-transition text-gray-800 dark:text-gray-200 ${
                      isMenuOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                    }`} 
                  />
                  <X 
                    size={20} 
                    className={`absolute inset-0 apple-transition text-gray-800 dark:text-gray-200 ${
                      isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
                    }`} 
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`md:hidden apple-transition overflow-hidden ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-3 premium-glass-card mt-3 mx-4 rounded-3xl shadow-2xl">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center space-x-4 px-4 py-3.5 rounded-2xl font-semibold apple-transition apple-hover ${
                    isActive
                      ? `text-white bg-gradient-to-r ${item.color} shadow-lg`
                      : 'text-gray-800 dark:text-gray-200 premium-glass-button hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon with enhanced styling */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600'
                  } group-hover:scale-110 apple-transition`}>
                    <item.icon 
                      size={18} 
                      className={isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'} 
                    />
                  </div>
                  
                  {/* Label */}
                  <span className="flex-1">{item.label}</span>
                  
                  {/* Arrow indicator */}
                  <div className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-white' : 'bg-gray-400 dark:bg-gray-500'
                  } group-hover:scale-125 apple-transition`}></div>
                </a>
              );
            })}
            
            {/* Mobile menu footer */}
            <div className="pt-4 mt-4 border-t border-gray-200/20 dark:border-gray-700/20">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Sparkles size={14} className="text-purple-500" />
                <span>Always Dark Mode</span>
                <Moon size={14} className="text-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar Backdrop Blur Enhancement */}
      {isScrolled && (
        <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/10 to-transparent dark:from-black/10 backdrop-blur-sm z-40 pointer-events-none"></div>
      )}
    </>
  );
};

export default Navbar;