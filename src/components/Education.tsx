import React from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location?: string;
  description?: string;
}

const Education: React.FC = () => {
  const educationList: EducationItem[] = [
    {
      degree: 'Bachelor of Computer Science',
      institution: 'Uttaranchal University',
      period: '2023 - Expected 2027',
      location: 'Dehradun, India',
      description: 'Focusing on advanced algorithms, software development, and cybersecurity.'
    },
    {
      degree: 'Intermediate',
      institution: 'DDPS Bijnor',
      period: '2020 - 2022',
      location: 'Bijnor, India',
      description: 'Completed with distinction in mathematics and computer science.'
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Education
          </h2>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            My academic journey that has shaped my technical foundation and problem-solving approach.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-indigo-200 dark:bg-indigo-900"></div>
          
          <div className="space-y-12">
            {educationList.map((edu, index) => (
              <div key={index} className="relative">
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -mt-2">
                  <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
                    <GraduationCap size={20} className="text-white" />
                  </div>
                </div>
                
                <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto'}`}>
                  <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{edu.degree}</h3>
                    <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-3">{edu.institution}</div>
                    
                    <div className="flex items-center mb-4 text-gray-600 dark:text-gray-400 text-sm">
                      <Calendar size={16} className={`${index % 2 === 0 ? 'md:ml-2 md:order-2' : 'mr-2'}`} />
                      <span>{edu.period}</span>
                    </div>
                    
                    {edu.location && (
                      <div className="text-gray-600 dark:text-gray-400 mb-3">{edu.location}</div>
                    )}
                    
                    {edu.description && (
                      <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
                    )}
                  </div>
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