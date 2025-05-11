import React from 'react';
import { Award, ExternalLink } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
}

interface Achievement {
  title: string;
  description: string;
  link?: string;
}

const Certifications: React.FC = () => {
  const certifications: Certification[] = [
    {
      title: 'Rest API (Intermediate)',
      issuer: 'HackerRank',
      date: '2023',
      link: 'https://www.hackerrank.com/certificates/iframe/622e8237ebec'
    },
    {
      title: 'Software Engineer',
      issuer: 'HackerRank',
      date: '2025',
      link: 'https://www.hackerrank.com/certificates/iframe/e0c96b2d8e58'
    },
    {
      title: 'SQL (Intermediate)',
      issuer: 'HackerRank',
      date: '2025',
      link: 'https://www.hackerrank.com/certificates/iframe/0ed1852a45af'
    },
    {
      title: 'Problem Solving (Intermediate)',
      issuer: 'HackerRank',
      date: '2025',
      link: 'https://www.hackerrank.com/certificates/iframe/b00153df24ac'
    },
    {
      title: 'Software Engineer Intern',
      issuer: 'HackerRank',
      date: '2025',
      link: 'https://www.hackerrank.com/certificates/iframe/f49f9cdf5dff'
    },
    {
      title: 'JavaScript',
      issuer: 'HackerRank',
      date: '2023',
      link: 'https://www.hackerrank.com/certificates/iframe/a2b94ccb4bfe'
    },
    {
      title: 'Python Essentials 2',
      issuer: 'Cisco',
      date: '2023',
      link: 'https://www.credly.com/badges/0bd157d7-f2b4-4331-b23e-9dfb842e9ebc/print'
    },
    {
      title: 'Introduction to Data Science',
      issuer: 'Cisco',
      date: '2025',
      link: 'https://www.credly.com/badges/22956d7b-f5ac-49a6-800e-e6f68ab93e2a'
    },
    {
      title: 'Introduction to Cybersecurity',
      issuer: 'Cisco',
      date: '2024',
      link: 'https://www.credly.com/badges/d9e2cc08-0a5b-4b6d-b294-02856bec858f/print'
    }
  ];

  const achievements: Achievement[] = [
    {
      title: '100+ LeetCode DSA Solutions',
      description: 'Demonstrating problem-solving and algorithmic efficiency skills',
      link: 'https://leetcode.com/u/sohardpratapsingh346'
    },
    {
      title: 'Global Rank #337 in HackerRank Python',
      description: 'Showcasing algorithmic efficiency and coding expertise',
      link: 'https://www.linkedin.com/posts/sohard-pratap-singh_hackerrank-projecteuler-rank337-activity-7117137189389414400-7VJr?utm_source=share&utm_medium=member_desktop&rcm=ACoAADnc6FcBOyj_Hi3Kouaanw0eF1s06ZCw4z4'
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Certifications & Achievements
          </h2>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Professional certifications and noteworthy achievements that highlight my expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
              <Award className="mr-3 text-indigo-600 dark:text-indigo-400" size={24} />
              Certifications
            </h3>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="group bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-600 dark:border-indigo-500"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{cert.title}</h4>
                      <p className="text-indigo-600 dark:text-indigo-400">{cert.issuer}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{cert.date}</p>
                      <a 
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                      >
                        View Certificate
                        <ExternalLink size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
              <Award className="mr-3 text-indigo-600 dark:text-indigo-400" size={24} />
              Achievements
            </h3>

            <div className="space-y-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{achievement.title}</h4>
                      <p className="text-gray-700 dark:text-gray-300">{achievement.description}</p>
                      {achievement.link && (
                        <a 
                          href={achievement.link} 
                          className="inline-flex items-center mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;