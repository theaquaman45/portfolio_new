import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Star, ArrowRight, Smartphone, Globe, Chrome } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  codeLink?: string;
  featured?: boolean;
  category: string;
}

const Projects: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
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

  const projects: Project[] = [
    {
      title: 'Tutor Box',
      description: 'Next-generation mobile application for educators to record professional-quality teaching sessions with split-screen interface and real-time recording capabilities.',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['Flutter', 'FFmpeg', 'OpenAI Whisper', 'Firebase'],
      demoLink: 'https://spslabs.vercel.app/products/tutor-box',
      featured: true,
      category: 'Mobile App'
    },
    {
      title: 'Zap Dine',
      description: 'Revolutionary cloud-based restaurant management platform featuring QR/NFC ordering, seamless UPI payments, and real-time order tracking.',
      image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['Next.js', 'Django', 'AWS', 'Razorpay', 'PostgreSQL'],
      demoLink: 'https://spslabs.vercel.app/products/zap-dine',
      featured: true,
      category: 'Web App'
    },
    {
      title: 'Form Guard',
      description: 'AI-powered fitness companion using advanced pose estimation for real-time exercise form analysis and injury prevention.',
      image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['Flutter', 'TensorFlow', 'MediaPipe', 'Firebase'],
      demoLink: 'https://spslabs.vercel.app/products/formguard',
      category: 'Mobile App'
    },
    {
      title: 'Cross Share',
      description: 'Lightning-fast file sharing solution enabling seamless transfers between PC and mobile devices over local Wi-Fi.',
      image: 'https://images.pexels.com/photos/7014766/pexels-photo-7014766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React Native', 'Node.js', 'WebSocket', 'QR Code'],
      demoLink: 'https://spslabs.vercel.app/products/cross-share',
      category: 'Desktop App'
    },
    {
      title: 'Algo Sphere',
      description: 'Innovative Chrome extension that transforms coding challenges into immersive visual experiences with dynamic flowcharts.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React.js', 'D3.js', 'Node.js', 'Chrome API'],
      demoLink: 'https://spslabs.vercel.app/products/algo-sphere',
      category: 'Extension'
    },
    {
      title: 'Price Scout',
      description: 'Comprehensive price comparison platform aggregating data from multiple food delivery and ride-sharing services.',
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Google Maps API'],
      demoLink: 'https://spslabs.vercel.app/products/price-scout',
      category: 'Mobile App'
    }
  ];

  const categories = [
    { name: 'All', icon: Star },
    { name: 'Web App', icon: Globe },
    { name: 'Mobile App', icon: Smartphone },
    { name: 'Extension', icon: Chrome }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcasing innovative solutions built with modern technologies
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 fade-in ${isVisible ? 'visible' : ''}`}>
          {categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveFilter(category.name)}
              className={`px-6 py-3 rounded-lg font-semibold smooth-transition ${
                activeFilter === category.name
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'glass text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="flex items-center">
                <category.icon size={18} className="mr-2" />
                {category.name}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.title}
                className={`group glass rounded-lg overflow-hidden hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''} ${
                  project.featured ? 'ring-2 ring-blue-500/50' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star size={14} className="mr-1" />
                    Featured
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 smooth-transition">
                    <a 
                      href={project.demoLink} 
                      className="p-3 glass rounded-lg hover:bg-blue-600 smooth-transition"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View demo"
                    >
                      <ExternalLink size={20} className="text-white" />
                    </a>
                    {project.codeLink && (
                      <a 
                        href={project.codeLink} 
                        className="p-3 glass rounded-lg hover:bg-purple-600 smooth-transition"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View code"
                      >
                        <Github size={20} className="text-white" />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 smooth-transition">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <a 
                    href={project.demoLink}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-purple-600 dark:hover:text-purple-400 smooth-transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 smooth-transition" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More CTA */}
        <div className={`text-center mt-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <a 
            href="https://spslabs.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover-lift smooth-transition"
          >
            <span>View All Projects</span>
            <ArrowRight size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;