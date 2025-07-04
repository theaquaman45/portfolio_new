import React, { useState, useEffect, useRef } from 'react';
import { Code, Database, PenTool as Tool, Shield, Zap, Globe } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  category: string;
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
    { name: 'JavaScript', level: 90, category: 'Languages' },
    { name: 'Python', level: 85, category: 'Languages' },
    { name: 'HTML/CSS', level: 95, category: 'Languages' },
    { name: 'Java', level: 65, category: 'Languages' },
    { name: 'C/C++', level: 80, category: 'Languages' },
    { name: 'Dart', level: 75, category: 'Languages' },
    
    // Frameworks
    { name: 'Next.js', level: 90, category: 'Frameworks' },
    { name: 'React.js', level: 90, category: 'Frameworks' },
    { name: 'Django', level: 85, category: 'Frameworks' },
    { name: 'Flutter', level: 80, category: 'Frameworks' },
    { name: 'TailwindCSS', level: 95, category: 'Frameworks' },
    { name: 'FastAPI', level: 70, category: 'Frameworks' },
    
    // Databases
    { name: 'PostgreSQL', level: 85, category: 'Databases' },
    { name: 'MongoDB', level: 80, category: 'Databases' },
    { name: 'MySQL', level: 75, category: 'Databases' },
    { name: 'SQLite', level: 90, category: 'Databases' },
    
    // Tools
    { name: 'Git/GitHub', level: 90, category: 'Tools' },
    { name: 'AWS', level: 70, category: 'Tools' },
    { name: 'Docker', level: 75, category: 'Tools' },
    { name: 'Linux', level: 85, category: 'Tools' },
    
    // Security
    { name: 'Nmap', level: 75, category: 'Security' },
    { name: 'Burp Suite', level: 75, category: 'Security' },
    { name: 'Wireshark', level: 75, category: 'Security' },
    { name: 'Penetration Testing', level: 70, category: 'Security' },
  ];

  const categories = [
    { name: 'Languages', icon: Code },
    { name: 'Frameworks', icon: Globe },
    { name: 'Databases', icon: Database },
    { name: 'Tools', icon: Tool },
    { name: 'Security', icon: Shield }
  ];

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </div>

        {/* Category Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 fade-in ${isVisible ? 'visible' : ''}`}>
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`px-6 py-3 rounded-lg font-semibold smooth-transition ${
                activeCategory === category.name
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="flex items-center">
                <category.icon size={18} className="mr-2" />
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div 
                key={skill.name}
                className={`p-6 glass rounded-lg hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {skill.name}
                  </h4>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                    {skill.level}%
                  </span>
                </div>
                
                <div className="relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full smooth-transition"
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className={`mt-20 fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 glass rounded-lg hover-lift smooth-transition">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    100+ LeetCode Solutions
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Strong problem-solving skills with expertise in algorithms and data structures
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-8 glass rounded-lg hover-lift smooth-transition">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Security Enthusiast
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Passionate about cybersecurity with hands-on experience in penetration testing
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