import React, { useState, useEffect, useRef } from 'react';
import { Award, ExternalLink, Trophy, Star, Medal, Crown } from 'lucide-react';

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
      icon: Trophy
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

  return (
    <section ref={sectionRef} id="certifications" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Achievements & <span className="gradient-text">Certifications</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications and noteworthy achievements
          </p>
        </div>

        {/* Tab Navigation */}
        <div className={`flex justify-center mb-12 fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="glass rounded-lg p-2">
            <div className="flex space-x-2">
              {[
                { id: 'certifications', label: 'Certifications', icon: Award },
                { id: 'achievements', label: 'Achievements', icon: Trophy }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold smooth-transition ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          {activeTab === 'certifications' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className={`glass rounded-lg p-6 hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(cert.category)} rounded-lg flex items-center justify-center`}>
                      <Award size={18} className="text-white" />
                    </div>
                    <span className={`px-3 py-1 bg-gradient-to-r ${getCategoryColor(cert.category)} text-white rounded-full text-xs font-semibold`}>
                      {cert.category}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">{cert.issuer}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{cert.date}</p>
                  
                  <a 
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 smooth-transition"
                  >
                    View Certificate
                    <ExternalLink size={14} className="ml-2" />
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`glass rounded-lg p-8 hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-start space-x-6">
                    {/* Icon & Metric */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                        <achievement.icon size={24} className="text-white" />
                      </div>
                      {achievement.metric && (
                        <div className="text-center">
                          <div className="text-xl font-bold gradient-text">
                            {achievement.metric}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {achievement.description}
                      </p>
                      {achievement.link && (
                        <a 
                          href={achievement.link} 
                          className="inline-flex items-center font-medium text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 smooth-transition"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Achievement
                          <ExternalLink size={16} className="ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, label: 'Certifications', value: '9' },
              { icon: Trophy, label: 'Major Achievements', value: '2' },
              { icon: Star, label: 'Recognition Level', value: 'Global' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center p-6 glass rounded-lg hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={20} className="text-white" />
                </div>
                <div className="text-2xl font-bold gradient-text mb-2">
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