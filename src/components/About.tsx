import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Mail, Phone, Award, Coffee, Code2, GraduationCap } from 'lucide-react';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "4+", label: "Years Coding", icon: Code2 },
    { number: "50+", label: "Projects Built", icon: Award },
    { number: "100+", label: "LeetCode Solved", icon: GraduationCap },
    { number: "∞", label: "Cups of Coffee", icon: Coffee }
  ];

  const contactInfo = [
    { icon: Calendar, label: "Education", value: "Computer Science (2023-2027)" },
    { icon: MapPin, label: "Location", value: "Dehradun, India" },
    { icon: Mail, label: "Email", value: "sohardpratapsingh346@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9997697716" }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Passionate about technology and continuous learning
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                I'm a Computer Science student with a passion for full-stack development and cybersecurity. 
                Currently pursuing my degree at Uttaranchal University, I've been coding for over 4 years 
                and have built numerous projects using modern technologies.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                My expertise spans across <span className="text-blue-600 dark:text-blue-400 font-semibold">Next.js, Django, and Flutter</span>, 
                with a strong foundation in algorithms and data structures. I enjoy solving complex problems 
                and building scalable applications that make a real impact.
              </p>
            </div>
            
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item, index) => (
                <div 
                  key={item.label}
                  className={`p-4 glass rounded-lg hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <item.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.label}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm break-all">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://drive.google.com/file/d/1FBRt1H8V0rDy1B6x70S85B7W4qX701di/view?usp=sharing" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover-lift smooth-transition"
              >
                View Resume
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 glass text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover-lift smooth-transition"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className={`flex justify-center fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-center p-8 hover-scale smooth-transition shadow-2xl">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Sohard Pratap Singh</h3>
                  <p className="text-lg mb-6">Computer Science Student</p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg floating">
                <Code2 className="text-white" size={20} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center shadow-lg floating-delayed">
                <GraduationCap className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center p-6 glass rounded-lg hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <stat.icon size={20} className="text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;