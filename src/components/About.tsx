import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Mail, Phone, Award, Coffee, Heart, Zap } from 'lucide-react';

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
    { number: "4+", label: "Years Experience", icon: Calendar },
    { number: "50+", label: "Projects Completed", icon: Award },
    { number: "100+", label: "LeetCode Solved", icon: Zap },
    { number: "∞", label: "Cups of Coffee", icon: Coffee }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/10 dark:to-pink-900/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full filter blur-xl floating"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full filter blur-xl floating-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient-exotic" style={{ fontFamily: 'Playfair Display, serif' }}>
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Passionate developer with a love for creating digital magic
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`order-2 lg:order-1 apple-transition ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                I'm a <span className="text-gradient font-semibold">Full-Stack Developer</span> with 4+ years of experience 
                building exceptional digital experiences. My journey spans across modern web technologies, mobile development, 
                and cybersecurity, with a passion for creating solutions that make a real impact.
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Proficient in <span className="text-purple-600 dark:text-purple-400 font-semibold">Next.js, Django/DRF, and Flutter</span>, 
                I specialize in building scalable applications with <span className="text-pink-600 dark:text-pink-400 font-semibold">PostgreSQL/MongoDB</span> 
                backends. My expertise extends to DevOps, Linux security tools, and modern frontend frameworks.
              </p>
            </div>
            
            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                { icon: Calendar, label: "Education", value: "Computer Science (Expected 2027)", color: "text-purple-500" },
                { icon: MapPin, label: "Location", value: "Dehradun, India", color: "text-pink-500" },
                { icon: Mail, label: "Email", value: "sohardpratapsingh346@gmail.com", color: "text-cyan-500" },
                { icon: Phone, label: "Phone", value: "+91 9997697716", color: "text-blue-500" }
              ].map((item, index) => (
                <div 
                  key={item.label}
                  className="group p-4 glass-card rounded-2xl apple-hover apple-transition shadow-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center ${item.color} group-hover:scale-110 apple-transition`}>
                      <item.icon size={20} />
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
                className="group px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full apple-transition apple-hover shadow-xl"
              >
                <span className="flex items-center">
                  View Resume
                  <Heart size={18} className="ml-2 group-hover:scale-110 apple-transition" />
                </span>
              </a>
              <a 
                href="#contact" 
                className="px-8 py-3 glass-card text-purple-600 dark:text-purple-400 font-semibold rounded-full apple-hover apple-transition"
              >
                Contact Me
              </a>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className={`order-1 lg:order-2 flex justify-center apple-transition ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              {/* Main Avatar */}
              <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-2xl apple-hover apple-transition group glass-card">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
                  <div>
                    <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Sohard Pratap Singh
                    </h3>
                    <p className="text-xl mb-6">Full-Stack Developer</p>
                    <div className="flex justify-center space-x-4">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-2000"></div>
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse animation-delay-4000"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 apple-transition"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-xl floating glass-card">
                <Zap className="text-white" size={24} />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-xl floating-delayed glass-card">
                <Heart className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="group text-center p-6 glass-card rounded-2xl apple-hover apple-transition shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 apple-transition">
                    <stat.icon size={24} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gradient-exotic mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
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