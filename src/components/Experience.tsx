import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  companyLink?: string;
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: 'Founder & Full Stack Developer',
      company: 'SPSLabs',
      period: 'Jan 2025 – Present',
      location: 'Remote',
      companyLink: 'https://spslabs.vercel.app',
      description: [
        'Co-founded SPSLabs, a technology solutions provider specializing in full-stack web and mobile application development.',
        'Led the design and development of SaaS products and custom applications using React.js, Django, Flutter, and Python.',
        'Managed end-to-end project lifecycles, including requirement analysis, architecture design, development, deployment, and maintenance.',
        'Deployed applications on scalable cloud infrastructure, ensuring high availability and performance.',
        'Implemented CI/CD pipelines and automated testing to streamline development processes.',
        'Oversaw business operations, including client acquisition, project management, and team coordination.'
      ]
    },
    {
      title: 'Full Stack Developer',
      company: 'Spelll.in',
      period: 'Jan 2023 – Dec 2024',
      location: 'Remote',
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
      company: 'SPSCreators',
      period: 'Jan 2022 – Dec 2022',
      location: 'Remote',
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

  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Professional Experience
          </h2>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey and the impact I've made along the way.
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{exp.title}</h3>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                      <Briefcase size={18} className="mr-2" />
                      {exp.companyLink ? (
                        <a 
                          href={exp.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar size={18} className="mr-2" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {exp.location}
                    </div>
                  </div>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-gray-700 dark:text-gray-300 pl-6 relative">
                      <div className="absolute left-0 top-2 w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;