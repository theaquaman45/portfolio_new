import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  codeLink?: string;
}

const Projects: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const projects: Project[] = [
    {
      title: 'Zap-Dine',
      description: 'Cloud-based platform for restaurants to manage QR/NFC ordering, UPI payments (Razorpay), and real-time tracking. Features dynamic menus, prepayment options, and subscription model (₹7,000/month). Built with Django, Next.js, AWS.',
      image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['Next.js', 'Django', 'AWS', 'Razorpay', 'PostgreSQL'],
      demoLink: 'https://spslabs.vercel.app/products/zap-dine',
    },
    {
      title: 'FormGuard',
      description: 'AI-powered mobile app using pose estimation (MediaPipe / TensorFlow) to analyze exercise form in real-time, track reps, and prevent injuries via audio/visual feedback. Offers freemium model with cloud analytics and personalized plans.',
      image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['Flutter', 'TensorFlow', 'MediaPipe', 'Firebase', 'Python'],
      demoLink: 'https://spslabs.vercel.app/products/formguard',
    },
    {
      title: 'Cross Share',
      description: 'High-speed file sharing solution for PC and mobile devices over local Wi-Fi. Features QR code connectivity, encrypted transfers, and real-time progress tracking. Freemium model with premium features for faster transfers and larger file limits.',
      image: 'https://images.pexels.com/photos/7014766/pexels-photo-7014766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React Native', 'Node.js', 'WebSocket', 'QR Code', 'Encryption'],
      demoLink: 'https://spslabs.vercel.app/products/cross-share',
    },
    {
      title: 'Algo Sphere',
      description: 'Chrome extension transforming coding challenges into visual experiences with flowcharts and decision trees. Features NLP-powered algorithmic insights, gamified learning, and premium subscription model. Built with React.js, D3.js, and Node.js.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React.js', 'D3.js', 'Node.js', 'Chrome API', 'NLP'],
      demoLink: 'https://spslabs.vercel.app/products/algo-sphere',
    },
    {
      title: 'Logify',
      description: 'Universal chat exporter Chrome extension for WhatsApp, Messenger, Slack, Discord, and ChatGPT. Features draggable floating button, local processing for privacy, and subscription model (₹68.5/month). Supports PDF, TXT, and DOCX exports.',
      image: 'https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['JavaScript', 'Chrome API', 'jsPDF', 'FileSaver.js', 'Razorpay'],
      demoLink: 'https://spslabss.vercel.app/products/logify',
    },
    {
      title: 'Price Scout',
      description: 'Mobile app for real-time price comparison across Zomato, Swiggy, Uber, and Ola. Features unified search, geolocation-based results, and personalized filters. Monetized through affiliate links and premium features like price alerts and historical tracking.',
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Redis', 'Google Maps API'],
      demoLink: 'https://spslabss.vercel.app/products/pricescout',
    },
    // {
    //   title: 'Couple Dare',
    //   description: 'A fun, browser-based turn-taking game for couples featuring random dares, real-time scoring, and dynamic penalties. Built with Next.js and styled with a vibrant purple + pink theme. Features include custom dares, animations, and countdown timer.',
    //   image: 'https://images.pexels.com/photos/1449667/pexels-photo-1449667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //   technologies: ['Next.js', 'TailwindCSS', 'TypeScript', 'Framer Motion', 'LocalStorage'],
    //   demoLink: 'https://riskyromance.vercel.app/',
    // },
    {
      title: 'PartnerHub',
      description: 'Centralized app aggregating notifications from Uber, Zomato, Swiggy, etc. Offers route optimization, earnings tracking, and task management to streamline workflows. Freemium model with premium features like advanced analytics.',
      image: 'https://images.pexels.com/photos/7709285/pexels-photo-7709285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'Google Maps API'],
      demoLink: 'https://spslabss.vercel.app/products/partnerhub',
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my best work, demonstrating my skills and problem-solving abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-slate-700 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 space-y-2">
                    <div className="flex space-x-3">
                      <a 
                        href={project.demoLink} 
                        className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transform hover:scale-110 transition-all duration-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View live demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                      {project.codeLink && (
                        <a 
                          href={project.codeLink} 
                          className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transform hover:scale-110 transition-all duration-200"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View source code"
                        >
                          <Github size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i} 
                      className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.demoLink}
                  className="inline-block text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try Now <span className="ml-1">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;