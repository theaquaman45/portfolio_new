import React, { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink, Trophy, Star, Medal, Crown, Zap, Target } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
  category: 'technical' | 'platform' | 'academic';
}

interface Achievement {
  title: string;
  description: string;
  link?: string;
  metric?: string;
  icon: any;
}

const Certifications: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('certifications');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

  const certifications: Certification[] = [
    {
      title: 'Rest API (Intermediate)',
      issuer: 'HackerRank',
      date: '2023',
      link: 'https://www.hackerrank.com/certificates/iframe/622e8237ebec',
      category: 'technical'
    },
    {
      title: 'Software Engineer',
      issuer: 'HackerRank',
      date: '2025',
      link: 'https://www.hackerrank.com/certificates/iframe/e0c96b2d8e58',
      category: 'platform'
    },
    {
      title: 'SQL (Intermediate)',
      issuer: 'HackerRank',
      date: '2025',
      link: 'https://www.hackerrank.com/certificates/iframe/0ed1852a45af',
      category: 'technical'
    },
    {
      title: 'Problem Solving (Intermediate)',
      issuer: 'HackerRank',
      date: '2025',
      link: 'https://www.hackerrank.com/certificates/iframe/b00153df24ac',
      category: 'platform'
    },
    {
      title: 'Software Engineer Intern',
      issuer: 'HackerRank',
      date: '2025',
      link: 'https://www.hackerrank.com/certificates/iframe/f49f9cdf5dff',
      category: 'platform'
    },
    {
      title: 'JavaScript',
      issuer: 'HackerRank',
      date: '2023',
      link: 'https://www.hackerrank.com/certificates/iframe/a2b94ccb4bfe',
      category: 'technical'
    },
    {
      title: 'Python Essentials 2',
      issuer: 'Cisco',
      date: '2023',
      link: 'https://www.credly.com/badges/0bd157d7-f2b4-4331-b23e-9dfb842e9ebc/print',
      category: 'academic'
    },
    {
      title: 'Introduction to Data Science',
      issuer: 'Cisco',
      date: '2025',
      link: 'https://www.credly.com/badges/22956d7b-f5ac-49a6-800e-e6f68ab93e2a',
      category: 'academic'
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      date: '2024',
      link: 'https://www.credly.com/badges/d9e2cc08-0a5b-4b6d-b294-02856bec858f/print',
      category: 'academic'
    }
  ];

  const achievements: Achievement[] = [
    {
      title: '100+ LeetCode DSA Solutions',
      description: 'Demonstrating problem-solving and algorithmic efficiency skills across data structures and algorithms',
      link: 'https://leetcode.com/u/sohardpratapsingh346',
      metric: '100+',
      icon: Target
    },
    {
      title: 'Global Rank #337 in HackerRank Python',
      description: 'Showcasing algorithmic efficiency and coding expertise in competitive programming',
      link: 'https://www.linkedin.com/posts/sohard-pratap-singh_hackerrank-projecteuler-rank337-activity-7117137189389414400-7VJr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnc6FcBOyj_Hi3Kouaanw0eF1s06ZCw4z4',
      metric: '#337',
      icon: Crown
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'from-blue-500 to-cyan-500';
      case 'platform': return 'from-purple-500 to-pink-500';
      case 'academic': return 'from-emerald-500 to-teal-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return Zap;
      case 'platform': return Trophy;
      case 'academic': return Medal;
      default: return Award;
    }
  };

  return (
    <section ref={sectionRef} id="certifications" className="py-20 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 dark:from-slate-900 dark:via-amber-900/10 dark:to-orange-900/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full filter blur-3xl floating"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-full filter blur-3xl floating-delayed"></div>
        
        {/* Floating Achievement Icons */}
        <div className="absolute top-40 left-40 floating">
          <Trophy className="text-amber-400/20 dark:text-amber-500/20" size={64} />
        </div>
        <div className="absolute bottom-40 right-40 floating-delayed">
          <Crown className="text-orange-400/20 dark:text-orange-500/20" size={56} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
            Achievements & Recognition
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
            Professional certifications and noteworthy achievements that showcase expertise and dedication
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="glass-card rounded-2xl p-2">
            <div className="flex space-x-2">
              {[
                { id: 'certifications', label: 'Certifications', icon: Award },
                { id: 'achievements', label: 'Achievements', icon: Trophy }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold apple-transition ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 glass-button'
                  }`}
                >
                  <tab.icon size={18} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {activeTab === 'certifications' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {certifications.map((cert, index) => {
                const CategoryIcon = getCategoryIcon(cert.category);
                return (
                  <div 
                    key={index} 
                    className={`group glass-card rounded-2xl p-6 apple-hover apple-transition shadow-xl cursor-pointer ${
                      hoveredCard === index ? 'ring-2 ring-amber-500/50' : ''
                    }`}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(cert.category)} rounded-xl flex items-center justify-center group-hover:scale-110 apple-transition`}>
                        <CategoryIcon size={20} className="text-white" />
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(cert.category)} text-white rounded-full text-xs font-semibold`}>
                        {cert.category}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 apple-transition">
                      {cert.title}
                    </h4>
                    <p className="text-amber-600 dark:text-amber-400 font-semibold mb-1">{cert.issuer}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{cert.date}</p>
                    
                    <a 
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-orange-600 dark:hover:text-orange-400 apple-transition group-hover:translate-x-1"
                    >
                      View Certificate
                      <ExternalLink size={14} className="ml-2" />
                    </a>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="group glass-card rounded-3xl p-8 apple-hover apple-transition shadow-xl"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-start space-x-6">
                    {/* Icon & Metric */}
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 apple-transition shadow-2xl">
                        <achievement.icon size={32} className="text-white" />
                      </div>
                      {achievement.metric && (
                        <div className="text-center">
                          <div className="text-2xl font-black text-gradient bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            {achievement.metric}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 apple-transition" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {achievement.title}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {achievement.description}
                      </p>
                      {achievement.link && (
                        <a 
                          href={achievement.link} 
                          className="inline-flex items-center font-medium text-amber-600 dark:text-amber-400 hover:text-orange-600 dark:hover:text-orange-400 apple-transition group-hover:translate-x-1"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Achievement
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 apple-transition">
                    <Star className="text-amber-400" size={24} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, label: 'Certifications', value: '9', color: 'from-blue-500 to-cyan-500' },
              { icon: Trophy, label: 'Major Achievements', value: '2', color: 'from-amber-500 to-orange-500' },
              { icon: Star, label: 'Recognition Level', value: 'Global', color: 'from-purple-500 to-pink-500' }
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

export default Certifications;