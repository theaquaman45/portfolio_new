import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, PenTool as Tool, Palette, Shield, Zap } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Languages');
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

  const skills: Skill[] = [
    // Languages
    { name: 'JavaScript', level: 90, category: 'Languages', icon: '🟨' },
    { name: 'Python', level: 85, category: 'Languages', icon: '🐍' },
    { name: 'HTML/CSS', level: 95, category: 'Languages', icon: '🎨' },
    { name: 'Java', level: 65, category: 'Languages', icon: '☕' },
    { name: 'C/C++', level: 80, category: 'Languages', icon: '⚡' },
    { name: 'Dart', level: 75, category: 'Languages', icon: '🎯' },
    { name: 'Lua', level: 70, category: 'Languages', icon: '🌙' },
    { name: 'Arduino', level: 75, category: 'Languages', icon: '🔧' },
    
    // Frameworks
    { name: 'Next.js', level: 90, category: 'Frameworks', icon: '⚛️' },
    { name: 'React.js', level: 90, category: 'Frameworks', icon: '⚛️' },
    { name: 'Django', level: 85, category: 'Frameworks', icon: '🎸' },
    { name: 'Flutter', level: 80, category: 'Frameworks', icon: '💙' },
    { name: 'TailwindCSS', level: 95, category: 'Frameworks', icon: '💨' },
    { name: 'Bootstrap', level: 90, category: 'Frameworks', icon: '🅱️' },
    { name: 'FastAPI', level: 70, category: 'Frameworks', icon: '⚡' },
    { name: 'TensorFlow', level: 80, category: 'Frameworks', icon: '🧠' },
    
    // Databases
    { name: 'PostgreSQL', level: 85, category: 'Databases', icon: '🐘' },
    { name: 'MongoDB', level: 80, category: 'Databases', icon: '🍃' },
    { name: 'MySQL', level: 75, category: 'Databases', icon: '🐬' },
    { name: 'SQLite', level: 90, category: 'Databases', icon: '💎' },
    
    // Tools
    { name: 'Git/GitHub', level: 90, category: 'Tools', icon: '🐙' },
    { name: 'AWS', level: 70, category: 'Tools', icon: '☁️' },
    { name: 'Docker', level: 75, category: 'Tools', icon: '🐳' },
    { name: 'Linux', level: 85, category: 'Tools', icon: '🐧' },
    { name: 'DevOps', level: 80, category: 'Tools', icon: '🔄' },
    { name: 'Bolt', level: 95, category: 'Tools', icon: '⚡' },
    
    // Security
    { name: 'Nmap', level: 75, category: 'Security', icon: '🔍' },
    { name: 'Burp Suite', level: 75, category: 'Security', icon: '🛡️' },
    { name: 'Wireshark', level: 75, category: 'Security', icon: '🦈' },
    { name: 'John the Ripper', level: 75, category: 'Security', icon: '🔓' },
  ];

  const categories = [
    { name: 'Languages', icon: Code, color: 'from-purple-500 to-pink-500' },
    { name: 'Frameworks', icon: Zap, color: 'from-cyan-500 to-blue-500' },
    { name: 'Databases', icon: Database, color: 'from-emerald-500 to-teal-500' },
    { name: 'Tools', icon: Tool, color: 'from-orange-500 to-red-500' },
    { name: 'Security', icon: Shield, color: 'from-indigo-500 to-purple-500' }
  ];

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-gradient-to-br from-gray-50 via-purple-50/50 to-pink-50/50 dark:from-slate-800 dark:via-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl floating"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full filter blur-3xl floating-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient-exotic" style={{ fontFamily: 'Playfair Display, serif' }}>
            Technical Arsenal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Mastering the tools and technologies that power modern digital experiences
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white shadow-xl`
                  : 'glass-effect text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="flex items-center">
                <category.icon size={20} className="mr-2" />
                {category.name}
              </span>
              {activeCategory !== category.name && (
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              )}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.name}
                className="group glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {skill.name}
                    </h4>
                  </div>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                    {skill.level}%
                  </span>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out transform origin-left"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Cards */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group glass-effect rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  🏆
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    100+ LeetCode Solutions
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Demonstrating algorithmic thinking and problem-solving expertise across data structures and algorithms
                  </p>
                </div>
              </div>
            </div>
            
            <div className="group glass-effect rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  🥇
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Global Rank #337 HackerRank
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Achieved top-tier ranking in Python programming challenges, showcasing coding efficiency and expertise
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;