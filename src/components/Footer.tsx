import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Code2, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ];

  const socialLinks = [
    { 
      href: "https://github.com/sohardpratap", 
      icon: Github, 
      label: "GitHub"
    },
    { 
      href: "https://linkedin.com/in/sohard-pratap-singh/", 
      icon: Linkedin, 
      label: "LinkedIn"
    },
    { 
      href: "https://leetcode.com/u/sohardpratapsingh346", 
      icon: Terminal, 
      label: "LeetCode"
    },
    { 
      href: "mailto:sohardpratapsingh346@gmail.com", 
      icon: Mail, 
      label: "Email"
    }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Sohard Pratap Singh
                </h3>
                <p className="text-blue-400 text-sm">Computer Science Student</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-4 max-w-sm">
              Passionate about building innovative solutions with modern technologies. 
              Always learning and growing in the field of software development.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass rounded-lg hover:bg-blue-600 smooth-transition"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-blue-400 smooth-transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Get In Touch</h4>
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="font-semibold">Email:</span><br />
                sohardpratapsingh346@gmail.com
              </p>
              <p className="text-gray-400">
                <span className="font-semibold">Location:</span><br />
                Dehradun, Uttarakhand, India
              </p>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 text-sm">Available for new projects</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Sohard Pratap Singh. All rights reserved.
            </p>
            
            <button 
              onClick={scrollToTop}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover-lift smooth-transition"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;