import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Terminal } from 'lucide-react';

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

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
                      : 'text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {item.label}
                  {activeSection !== item.href.slice(1) && (
                    <span className="absolute inset-0 rounded-full glass-button opacity-0 group-hover:opacity-100 apple-transition"></span>
                  )}
                </a>
              ))}
              
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
                  : 'text-gray-800 dark:text-gray-200 glass-button'
              }`}
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;