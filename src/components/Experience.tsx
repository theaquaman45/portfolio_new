import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, Award, Users, Code } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  companyLink?: string;
  type: 'founder' | 'developer' | 'senior';
}

const Experience: React.FC = () => {
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

  const experiences: ExperienceItem[] = [
    {
      title: 'Founder & Full Stack Developer',
      company: 'SPSLabs',
      period: 'Jan 2025 – Present',
      location: 'Remote',
      companyLink: 'https://spslabs.vercel.app',
      type: 'founder',
      description: [
        'Founded SPSLabs, a technology solutions provider specializing in full-stack development',
        'Led development of 8+ SaaS products using React.js, Django, Flutter, and Python',
        'Managed end-to-end project lifecycles from conception to deployment',
        'Implemented CI/CD pipelines and automated testing processes'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Spelll',
      period: 'Jan 2023 – Dec 2024',
      location: 'Remote',
      type: 'developer',
      description: [
        'Developed and deployed 50+ full-stack applications using modern technologies',
        'Built responsive frontends, RESTful APIs, and scalable backend systems',
        'Optimized database performance and integrated third-party services',
        'Collaborated with cross-functional teams to deliver user-focused solutions'
      ]
    },
    {
      title: 'Founder & Backend Developer',
      company: 'SPS Creators',
      period: 'Jan 2022 – Dec 2022',
      location: 'Remote',
      type: 'founder',
      description: [
        'Founded SPSCreators, delivering Django backend solutions for academic projects',
        'Designed and developed RESTful APIs and database models using Django and Python',
        'Built scalable backend systems with focus on clean code and efficient architecture',
        'Helped 100+ students with their academic projects and technical challenges'
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className={`fade-in ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="glass rounded-lg p-8 hover-lift smooth-transition">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    
                    <div className="flex items-center mb-4">
                      <Briefcase size={18} className="text-blue-600 dark:text-blue-400 mr-2" />
                      {exp.companyLink ? (
                        <a 
                          href={exp.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center"
                        >
                          {exp.company}
                          <ExternalLink size={14} className="ml-1" />
                        </a>
                      ) : (
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{exp.company}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    exp.type === 'founder' 
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  }`}>
                    {exp.type === 'founder' ? 'Founder' : 'Developer'}
                  </div>
                </div>
                
                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    <span className="font-medium">{exp.period}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2" />
                    <span>{exp.location}</span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-3">
                  {exp.description.map((item, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 mr-4"></div>
                      <p className="text-gray-700 dark:text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className={`mt-20 fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, label: 'Companies Founded', value: '2' },
              { icon: Users, label: 'Years Experience', value: '4+' },
              { icon: Code, label: 'Projects Delivered', value: '50+' }
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

export default Experience;