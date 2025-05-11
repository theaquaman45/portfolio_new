import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Sohard Pratap Singh</h3>
            <p className="mb-4">Full-Stack Developer & Security Enthusiast</p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/sohardpratap" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/sohard-pratap-singh/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:sohardpratapsingh346@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-indigo-400 transition-colors">Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <address className="not-italic space-y-2">
              <p>Dehradun, Uttarakhand, India</p>
              <p>
                <a href="mailto:sohardpratapsingh346@gmail.com" className="hover:text-indigo-400 transition-colors">
                  sohardpratapsingh346@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+919997697716" className="hover:text-indigo-400 transition-colors">
                  +91 9997697716
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sohard Pratap Singh. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;