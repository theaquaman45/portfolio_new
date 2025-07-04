import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Mail, Phone, Award, Coffee, Code2, GraduationCap, Star, Zap } from 'lucide-react';

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
    { number: "4+", label: "Years Coding", icon: Code2, color: "from-blue-500 to-cyan-500" },
    { number: "50+", label: "Projects Built", icon: Award, color: "from-purple-500 to-pink-500" },
    { number: "100+", label: "LeetCode Solved", icon: GraduationCap, color: "from-green-500 to-emerald-500" },
    { number: "∞", label: "Cups of Coffee", icon: Coffee, color: "from-yellow-500 to-orange-500" }
  ];

  const contactInfo = [
    { icon: Calendar, label: "Education", value: "Computer Science (2023-2027)", color: "from-blue-500 to-purple-500" },
    { icon: MapPin, label: "Location", value: "Dehradun, India", color: "from-green-500 to-teal-500" },
    { icon: Mail, label: "Email", value: "sohardpratapsingh346@gmail.com", color: "from-red-500 to-pink-500" },
    { icon: Phone, label: "Phone", value: "+91 9997697716", color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="flex items-center justify-center mb-4">
            <Star className="text-yellow-500 mr-2" size={20} />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Get to know me
            </span>
            <Star className="text-yellow-500 ml-2" size={20} />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passionate about technology and continuous learning, building the future one line of code at a time
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
                and building scalable applications that make a real impact in people's lives.
              </p>
            </div>
            
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {contactInfo.map((item, index) => (
                <div 
                  key={item.label}
                  className={`p-6 glass rounded-xl hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''} border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <item.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.label}</h4>
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
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover-lift smooth-transition shadow-lg hover:shadow-xl"
              >
                View Resume
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 glass text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover-lift smooth-transition border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          {/* Enhanced Visual Element */}
          <div className={`flex justify-center fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="relative">
              <div className="w-96 h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-white text-center p-8 hover-scale smooth-transition shadow-2xl relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                  <div className="absolute top-8 right-8 w-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-6 h-6 border border-white rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-3 h-3 bg-white rounded-full"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">Sohard Pratap Singh</h3>
                  <p className="text-xl mb-6 opacity-90">Computer Science Student</p>
                  <div className="flex justify-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  </div>
                  <div className="text-sm opacity-75">Building the future with code</div>
                </div>
              </div>
              
              {/* Enhanced Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl floating">
                <Code2 className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-xl floating-delayed">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg floating">
                <Zap className="text-white" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className={`mt-20 fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center p-8 glass rounded-xl hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''} border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold gradient-text mb-3">
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