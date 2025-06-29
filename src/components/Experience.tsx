import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, Award, TrendingUp, Users, Code } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  companyLink?: string;
  type: 'founder' | 'developer' | 'senior';
  achievements?: string[];
}

const Experience: React.FC = () => {
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

  const experiences: ExperienceItem[] = [
    {
      title: 'Founder & Full Stack Developer',
      company: 'SPSLabs',
      period: 'Jan 2025 – Present',
      location: 'Remote',
      companyLink: 'https://spslabs.vercel.app',
      type: 'founder',
      achievements: ['Founded tech startup', '8+ products launched', 'SaaS revenue model'],
      description: [
        'Founded SPSLabs, a technology solutions provider specializing in full-stack web and mobile application development.',
        'Led the design and development of SaaS products and custom applications using React.js, Django, Flutter, and Python.',
        'Managed end-to-end project lifecycles, including requirement analysis, architecture design, development, deployment, and maintenance.',
        'Deployed applications on scalable cloud infrastructure, ensuring high availability and performance.',
        'Implemented CI/CD pipelines and automated testing to streamline development processes.',
        'Oversaw business operations, including client acquisition, project management, and team coordination.'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Spelll',
      period: 'Jan 2023 – Dec 2024',
      location: 'Remote',
      type: 'developer',
      achievements: ['50+ projects delivered', 'API optimization', 'Performance boost 40%'],
      description: [
        'Developed and deployed full-stack applications using React.js, Django, Flutter, and Python.',
        'Built responsive frontends, RESTful APIs, and scalable backend systems.',
        'Integrated third-party services and optimized database performance.',
        'Managed full development lifecycle: planning, coding, testing, deployment, and maintenance.',
        'Collaborated with product managers and designers to deliver user-focused solutions.',
        'Followed best practices in version control (Git), testing, and documentation.'
      ]
    },
    {
      title: 'Founder & Backend Developer',
      company: 'SPS Creators',
      period: 'Jan 2022 – Dec 2022',
      location: 'Remote',
      type: 'founder',
      achievements: ['Academic solutions', 'Django expertise', '100+ students helped'],
      description: [
        'Founded and managed SPSCreators, delivering Django backend solutions and academic project support.',
        'Designed and developed RESTful APIs, database models, and server-side logic using Django and Python.',
        'Built scalable backend systems for web applications, focusing on clean code and efficient architecture.',
        'Collaborated with clients (students and academic groups) to understand project requirements and deliver customized solutions.',
        'Deployed Django applications to production environments with proper security and performance optimizations.'
      ]
    },
    {
      title: 'Senior Developer',
      company: 'SGN Designer',
      period: 'Apr 2020 – Dec 2021',
      location: 'Remote',
      type: 'senior',
      achievements: ['Team leadership', 'Agile methodology', 'Code quality improvement'],
      description: [
        'Led the development of full-stack projects using React.js, Django, Flutter, and Python.',
        'Designed and implemented scalable web and mobile applications.',
        'Architected backend services with REST APIs, authentication systems, and database management.',
        'Improved code quality through peer reviews, testing, and clean architecture practices.',
        'Mentored junior developers and collaborated with cross-functional teams to drive project success.',
        'Ensured on-time delivery of high-quality products following Agile and Scrum methodologies.'
      ]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'founder': return Award;
      case 'senior': return TrendingUp;
      default: return Code;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'founder': return 'from-yellow-500 to-orange-500';
      case 'senior': return 'from-blue-500 to-purple-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };

  return (
    <section ref={sectionRef} id="experience" className="py-20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-slate-900 dark:via-indigo-900/10 dark:to-purple-900/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full filter blur-3xl floating"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full filter blur-3xl floating-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
            Professional Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
            Building innovative solutions and leading teams across diverse technology landscapes
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 rounded-full"></div>
          
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const TypeIcon = getTypeIcon(exp.type);
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={index} 
                  className={`relative apple-transition ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Timeline Node */}
                  <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getTypeColor(exp.type)} rounded-2xl flex items-center justify-center shadow-2xl apple-hover apple-transition`}>
                      <TypeIcon size={24} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Experience Card */}
                  <div className={`lg:w-5/12 ${isLeft ? 'lg:mr-auto lg:pr-16' : 'lg:ml-auto lg:pl-16'}`}>
                    <div 
                      className={`group glass-card rounded-3xl p-8 shadow-xl apple-hover apple-transition cursor-pointer ${
                        activeCard === index ? 'ring-2 ring-indigo-500/50' : ''
                      }`}
                      onMouseEnter={() => setActiveCard(index)}
                      onMouseLeave={() => setActiveCard(null)}
                    >
                      {/* Card Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className={`lg:hidden w-10 h-10 bg-gradient-to-r ${getTypeColor(exp.type)} rounded-xl flex items-center justify-center mr-3`}>
                              <TypeIcon size={18} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 apple-transition" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {exp.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center mb-4">
                            <Briefcase size={18} className="text-indigo-600 dark:text-indigo-400 mr-2" />
                            {exp.companyLink ? (
                              <a 
                                href={exp.companyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:text-purple-600 dark:hover:text-purple-400 apple-transition flex items-center"
                              >
                                {exp.company}
                                <ExternalLink size={14} className="ml-1" />
                              </a>
                            ) : (
                              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{exp.company}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className={`px-4 py-2 bg-gradient-to-r ${getTypeColor(exp.type)} text-white rounded-full text-sm font-semibold`}>
                          {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
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
                      
                      {/* Achievements */}
                      {exp.achievements && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {exp.achievements.map((achievement, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1 glass-button text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Description */}
                      <div className="space-y-3">
                        {exp.description.map((item, i) => (
                          <div key={i} className="flex items-start">
                            <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2 mr-4"></div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 apple-transition ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, label: 'Companies Founded', value: '2', color: 'from-yellow-500 to-orange-500' },
              { icon: Users, label: 'Years Experience', value: '4+', color: 'from-blue-500 to-purple-500' },
              { icon: TrendingUp, label: 'Projects Delivered', value: '50+', color: 'from-blue-500 to-indigo-500' }
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

export default Experience;