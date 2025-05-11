import React from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const Skills: React.FC = () => {
  const skills: Skill[] = [
    // Languages
    { name: 'HTML/CSS', level: 95, category: 'Languages' },
    { name: 'JavaScript', level: 90, category: 'Languages' },
    { name: 'Python', level: 85, category: 'Languages' },
    { name: 'Java', level: 65, category: 'Languages' },
    { name: 'C/C++', level: 80, category: 'Languages' },
    { name: 'Lua', level: 70, category: 'Languages' },
    { name: 'Dart', level: 75, category: 'Languages' },
    { name: 'Arduino', level: 75, category: 'Languages' },
    { name: 'X86', level: 65, category: 'Languages' },
    
    // Frameworks
    { name: 'Next.js', level: 90, category: 'Frameworks' },
    { name: 'React.js', level: 90, category: 'Frameworks' },
    { name: 'Django', level: 85, category: 'Frameworks' },
    { name: 'Flask', level: 85, category: 'Frameworks' },
    { name: 'Flutter', level: 80, category: 'Frameworks' },
    { name: 'TailwindCSS', level: 95, category: 'Frameworks' },
    { name: 'Bootstrap', level: 90, category: 'Frameworks' },
    
    // Databases
    { name: 'PostgreSQL', level: 85, category: 'Databases' },
    { name: 'MongoDB', level: 80, category: 'Databases' },
    { name: 'MySQL', level: 75, category: 'Databases' },
    { name: 'SQLite', level: 90, category: 'Databases' },
    
    // Tools
    { name: 'Git/GitHub', level: 90, category: 'Tools' },
    { name: 'AWS', level: 70, category: 'Tools' },
    { name: 'Arduino IDE', level: 75, category: 'Tools' },
    { name: 'Visual Studio Code', level: 90, category: 'Tools' },
    { name: 'DevOps', level: 80, category: 'Tools' },
    { name: 'Linux', level: 85, category: 'Tools' },
    { name: 'Docker', level: 75, category: 'Tools' },
    { name: 'Kubernetes', level: 70, category: 'Tools' },
    { name: 'AWS EC2', level: 75, category: 'Tools' },
    { name: 'CI/CD', level: 85, category: 'Tools' },
    { name: 'Jenkins', level: 65, category: 'Tools' },
    { name: 'Bolt', level: 95, category: 'Tools' },
    { name: 'GenAI', level: 95, category: 'Tools' },
    { name: 'Nmap', level: 75, category: 'Tools' },
    { name: 'Burp Suite', level: 75, category: 'Tools' },
    { name: 'Wireshark', level: 75, category: 'Tools' },
    { name: 'John the Ripper', level: 75, category: 'Tools' },
    { name: 'Postman', level: 85, category: 'Tools' },
  ];

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            With expertise across multiple technologies, I build comprehensive full-stack solutions
            that are scalable, secure, and user-friendly.
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill) => (
                    <div key={skill.name} className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500"
                          style={{ width: `${skill.level}%`, transition: 'width 1s ease-in-out' }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white dark:bg-slate-700 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">Key Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">100+ LeetCode Solutions</h4>
                <p className="text-gray-600 dark:text-gray-400">Demonstrating problem-solving and algorithmic efficiency skills</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Global Rank #337 in HackerRank Python</h4>
                <p className="text-gray-600 dark:text-gray-400">Showcasing algorithmic efficiency and coding expertise</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;