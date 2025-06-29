import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Terminal, Zap, Eye, EyeOff } from 'lucide-react';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
  physicsMode?: 'liquid' | 'physics' | 'particles';
  onPhysicsModeChange?: (mode: 'liquid' | 'physics' | 'particles') => void;
  showConnections?: boolean;
  onToggleConnections?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  toggleTheme, 
  isDarkMode, 
  physicsMode = 'liquid',
  onPhysicsModeChange,
  showConnections = true,
  onToggleConnections
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showPhysicsMenu, setShowPhysicsMenu] = useState(false);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  const physicsOptions = [
    { mode: 'liquid', label: '🌊', title: 'Liquid Flow' },
    { mode: 'physics', label: '⚛️', title: 'Physics Engine' },
    { mode: 'particles', label: '✨', title: 'Interactive Particles' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 apple-transition ${
        isScrolled 
          ? 'glass-navbar py-2 shadow-2xl' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#hero" 
              className="flex items-center space-x-3 group apple-transition"
            >
              <div className="relative">
                <Terminal 
                  size={32} 
                  className="text-indigo-600 dark:text-indigo-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 apple-transition" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Sohard Pratap Singh
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Full Stack Developer
                </span>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full font-medium apple-transition group ${
                    activeSection === item.href.slice(1)
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                      : 'text-gray-800 dark:text-gray-200 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection !== item.href.slice(1) && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 apple-transition"></span>
                  )}
                </a>
              ))}
              
              {/* Physics Mode Selector */}
              <div className="relative ml-4">
                <button
                  onClick={() => setShowPhysicsMenu(!showPhysicsMenu)}
                  className="p-3 rounded-full glass-button apple-hover apple-transition group flex items-center space-x-2"
                  title="Physics Mode"
                >
                  <Zap size={18} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-lg">
                    {physicsOptions.find(opt => opt.mode === physicsMode)?.label}
                  </span>
                </button>
                
                {/* Physics Dropdown */}
                {showPhysicsMenu && (
                  <div className="absolute top-full right-0 mt-2 glass-card rounded-2xl p-3 shadow-2xl min-w-[200px]">
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">
                      Background Effects
                    </div>
                    <div className="space-y-2">
                      {physicsOptions.map((option) => (
                        <button
                          key={option.mode}
                          onClick={() => {
                            onPhysicsModeChange?.(option.mode as any);
                            setShowPhysicsMenu(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl apple-transition apple-hover ${
                            physicsMode === option.mode
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                              : 'glass-button text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className="text-lg">{option.label}</span>
                          <span className="text-sm font-medium">{option.title}</span>
                        </button>
                      ))}
                    </div>
                    
                    {/* Connection Toggle for Particles Mode */}
                    {physicsMode === 'particles' && (
                      <>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                        <button
                          onClick={() => {
                            onToggleConnections?.();
                            setShowPhysicsMenu(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl apple-transition apple-hover ${
                            showConnections
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                              : 'glass-button text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {showConnections ? <Eye size={16} /> : <EyeOff size={16} />}
                          <span className="text-sm font-medium">
                            {showConnections ? 'Hide Connections' : 'Show Connections'}
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="ml-4 p-3 rounded-full glass-button apple-hover apple-transition group"
                aria-label="Toggle theme"
              >
                <div className="relative">
                  {isDarkMode ? (
                    <Sun size={20} className="text-yellow-500 group-hover:rotate-180 apple-transition" />
                  ) : (
                    <Moon size={20} className="text-indigo-600 group-hover:rotate-12 apple-transition" />
                  )}
                </div>
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Physics Toggle */}
            <button
              onClick={() => setShowPhysicsMenu(!showPhysicsMenu)}
              className="p-2 rounded-full glass-button apple-hover apple-transition"
              title="Physics Mode"
            >
              <span className="text-lg">
                {physicsOptions.find(opt => opt.mode === physicsMode)?.label}
              </span>
            </button>
            
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full glass-button apple-hover apple-transition"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun size={18} className="text-yellow-500" />
              ) : (
                <Moon size={18} className="text-indigo-600" />
              )}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full glass-button apple-hover apple-transition"
              aria-expanded="false"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute inset-0 apple-transition text-gray-800 dark:text-gray-200 ${
                    isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  size={24} 
                  className={`absolute inset-0 apple-transition text-gray-800 dark:text-gray-200 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden apple-transition ${
        isMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-2 glass-card mt-2 mx-4 rounded-2xl">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-xl font-medium apple-transition apple-hover ${
                activeSection === item.href.slice(1)
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg'
                  : 'text-gray-800 dark:text-gray-200 glass-button hover:text-white'
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile Physics Controls */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
          <div className="px-4 py-2">
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">
              Background Effects
            </div>
            <div className="space-y-2">
              {physicsOptions.map((option) => (
                <button
                  key={option.mode}
                  onClick={() => {
                    onPhysicsModeChange?.(option.mode as any);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl apple-transition apple-hover ${
                    physicsMode === option.mode
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'glass-button text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg">{option.label}</span>
                  <span className="text-sm font-medium">{option.title}</span>
                </button>
              ))}
            </div>
            
            {/* Mobile Connection Toggle */}
            {physicsMode === 'particles' && (
              <button
                onClick={() => {
                  onToggleConnections?.();
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl apple-transition apple-hover mt-2 ${
                  showConnections
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'glass-button text-gray-700 dark:text-gray-300'
                }`}
              >
                {showConnections ? <Eye size={16} /> : <EyeOff size={16} />}
                <span className="text-sm font-medium">
                  {showConnections ? 'Hide Connections' : 'Show Connections'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Physics Dropdown */}
      {showPhysicsMenu && (
        <div className="md:hidden fixed top-20 right-4 glass-card rounded-2xl p-3 shadow-2xl min-w-[200px] z-50">
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-3 font-semibold">
            Background Effects
          </div>
          <div className="space-y-2">
            {physicsOptions.map((option) => (
              <button
                key={option.mode}
                onClick={() => {
                  onPhysicsModeChange?.(option.mode as any);
                  setShowPhysicsMenu(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl apple-transition apple-hover ${
                  physicsMode === option.mode
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'glass-button text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg">{option.label}</span>
                <span className="text-sm font-medium">{option.title}</span>
              </button>
            ))}
          </div>
          
          {physicsMode === 'particles' && (
            <>
              <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
              <button
                onClick={() => {
                  onToggleConnections?.();
                  setShowPhysicsMenu(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl apple-transition apple-hover ${
                  showConnections
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : 'glass-button text-gray-700 dark:text-gray-300'
                }`}
              >
                {showConnections ? <Eye size={16} /> : <EyeOff size={16} />}
                <span className="text-sm font-medium">
                  {showConnections ? 'Hide Connections' : 'Show Connections'}
                </span>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;