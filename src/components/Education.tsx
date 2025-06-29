import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Award, Star, Brain } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  description?: string;
  status: 'completed' | 'ongoing';
  highlights?: string[];
  gpa?: string;
}

const Education: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
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

  const educationList: EducationItem[] = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'Uttaranchal University',
      period: '2023 - Expected 2027',
      location: 'Dehradun, India',
      status: 'ongoing',
      description: 'Pursuing comprehensive computer science education with focus on software engineering, algorithms, and emerging technologies.',
      highlights: ['Advanced Algorithms', 'Software Engineering', 'Cybersecurity', 'Machine Learning', 'Database Systems'],
      gpa: 'Current: 8.5/10'
    },
    {
      degree: 'Intermediate (12th Grade)',
      institution: 'DDPS Bijnor',
      period: '2020 - 2022',
      location: 'Bijnor, India',
      status: 'completed',
      description: 'Completed intermediate education with distinction in mathematics and computer science, building strong foundation for technical career.',
      highlights: ['Mathematics Excellence', 'Computer Science', 'Physics', 'Academic Distinction'],
      gpa: '85%'
    }
  ];

  return (
    <section ref={sectionRef} id="education" className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-blue-900/10 dark:to-indigo-900/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full filter blur-3xl floating"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl floating-delayed"></div>
        
        {/* Floating Academic Icons */}
        <div className="absolute top-40 right-40 floating">
          <BookOpen className="text-blue-400/30 dark:text-blue-500/30" size={48} />
        </div>
        <div className="absolute bottom-40 left-40 floating-delayed">
          <Brain className="text-indigo-400/30 dark:text-indigo-500/30" size={52} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
            Academic Excellence
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
            Building a strong foundation through continuous learning and academic achievement
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-12">
          {educationList.map((edu, index) => (
            <div 
              key={index} 
              className={`apple-transition ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <div 
                className={`group glass-card rounded-3xl overflow-hidden shadow-xl apple-hover apple-transition cursor-pointer ${
                  activeCard === index ? 'ring-2 ring-blue-500/50' : ''
                }`}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className="relative p-8 lg:p-12">
                  {/* Status Badge */}
                  <div className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-semibold ${
                    edu.status === 'ongoing' 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  }`}>
                    {edu.status === 'ongoing' ? 'In Progress' : 'Completed'}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Left: Icon and Visual */}
                    <div className="flex flex-col items-center lg:items-start">
                      <div className={`w-24 h-24 bg-gradient-to-r ${
                        edu.status === 'ongoing' 
                          ? 'from-emerald-500 to-teal-500' 
                          : 'from-blue-500 to-indigo-500'
                      } rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 apple-transition shadow-2xl`}>
                        <GraduationCap size={36} className="text-white" />
                      </div>
                      
                      {/* GPA/Score */}
                      {edu.gpa && (
                        <div className="glass-card rounded-2xl px-4 py-2 text-center">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Score</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{edu.gpa}</div>
                        </div>
                      )}
                    </div>

                    {/* Center: Main Content */}
                    <div className="lg:col-span-2">
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 apple-transition" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {edu.degree}
                      </h3>
                      
                      <div className="flex items-center mb-4">
                        <Award size={20} className="text-blue-600 dark:text-blue-400 mr-3" />
                        <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">{edu.institution}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-6 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          <span className="font-medium">{edu.period}</span>
                        </div>
                        {edu.location && (
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2" />
                            <span>{edu.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {edu.description && (
                        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                          {edu.description}
                        </p>
                      )}
                      
                      {/* Highlights */}
                      {edu.highlights && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Star size={18} className="mr-2 text-yellow-500" />
                            Key Subjects & Achievements
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {edu.highlights.map((highlight, i) => (
                              <span 
                                key={i} 
                                className="px-4 py-2 glass-button text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium apple-hover apple-transition"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Stats */}
        <div className={`mt-20 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, label: 'Years of Study', value: '6+', color: 'from-blue-500 to-indigo-500' },
              { icon: Award, label: 'Academic Excellence', value: '85%+', color: 'from-emerald-500 to-teal-500' },
              { icon: Brain, label: 'Technical Focus', value: 'CS', color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="group glass-card rounded-2xl p-8 text-center apple-hover apple-transition shadow-xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 apple-transition`}>
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {stat.value}
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

export default Education;