import React from 'react';
import { Calendar, MapPin, Mail, Phone } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              I'm a Full-Stack Developer with 4+ years building apps using Next.js, Django/DRF, and Flutter; 
              proficient in PostgreSQL/MongoDB, DevOps, Linux security (Nmap, Wireshark, BurpSuite), Bootstrap, TailwindCSS; 
              in Python, C/C++, Java, Lua, x86, Arduino; ranked 337 in HackerRank Python; solved 100 LeetCode challenges.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start space-x-3">
                <Calendar className="flex-shrink-0 w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Education</h4>
                  <p className="text-gray-600 dark:text-gray-400">Computer Science (Expected 2027)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="flex-shrink-0 w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">Dehradun, India</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="flex-shrink-0 w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                  <p className="text-gray-600 dark:text-gray-400 break-all">sohardpratapsingh346@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="flex-shrink-0 w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">+91 9997697716</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://drive.google.com/file/d/1FBRt1H8V0rDy1B6x70S85B7W4qX701di/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition-all duration-300 transform hover:scale-105"
              >
                View Resume
              </a>
              <a 
                href="#contact" 
                className="px-6 py-2.5 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 font-medium rounded-full hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all duration-300"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-white dark:border-slate-700 shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-90"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white text-center p-4">
                <div>
                  <h3 className="text-3xl font-bold mb-2">Sohard Pratap Singh</h3>
                  <p className="text-lg">Full-Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;