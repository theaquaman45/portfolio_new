import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Sparkles, Zap, Star, ArrowRight, Video, Users, BookOpen, Smartphone } from 'lucide-react';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      description: 'Next-generation mobile application for educators to record professional-quality teaching sessions. Features split-screen interface with front camera and interactive whiteboard, multi-slide scene management, real-time recording with auto-subtitles, and comprehensive branding tools.',
      image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['Flutter', 'FFmpeg', 'OpenAI Whisper', 'Firebase', 'Razorpay'],
      demoLink: 'https://spslabs.vercel.app/products/tutor-box',
      featured: true,
      category: 'Mobile App & Web App'
    },
    {
      title: 'Zap Dine',
      description: 'Revolutionary cloud-based restaurant management platform featuring QR/NFC ordering, seamless UPI payments via Razorpay, and real-time order tracking. Includes dynamic menu management and subscription-based revenue model.',
      image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['Next.js', 'Django', 'AWS', 'Razorpay', 'PostgreSQL'],
      demoLink: 'https://spslabs.vercel.app/products/zap-dine',
      featured: true,
      category: 'Web App & Mobile App'
    },
    {
      title: 'Form Guard',
      description: 'AI-powered fitness companion using advanced pose estimation with MediaPipe and TensorFlow. Provides real-time exercise form analysis, rep counting, and injury prevention through intelligent audio/visual feedback.',
      image: 'https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['Flutter', 'TensorFlow', 'MediaPipe', 'Firebase', 'Python'],
      demoLink: 'https://spslabs.vercel.app/products/formguard',
      category: 'Mobile App'
    },
    {
      title: 'Cross Share',
      description: 'Lightning-fast file sharing solution enabling seamless transfers between PC and mobile devices over local Wi-Fi. Features QR code connectivity, end-to-end encryption, and real-time progress tracking.',
      image: 'https://images.pexels.com/photos/7014766/pexels-photo-7014766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React Native', 'Node.js', 'WebSocket', 'QR Code', 'Encryption'],
      demoLink: 'https://spslabs.vercel.app/products/cross-share',
      category: 'PC Software'
    },
    {
      title: 'Algo Sphere',
      description: 'Innovative Chrome extension that transforms coding challenges into immersive visual experiences. Features dynamic flowcharts, decision trees, and NLP-powered algorithmic insights for enhanced learning.',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React.js', 'D3.js', 'Node.js', 'Chrome API', 'NLP'],
      demoLink: 'https://spslabs.vercel.app/products/algo-sphere',
      category: 'Extension'
    },
    {
      title: 'Logify',
      description: 'Universal chat export solution supporting WhatsApp, Messenger, Slack, Discord, and ChatGPT. Features privacy-first local processing, multiple export formats, and intuitive drag-and-drop interface.',
      image: 'https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['JavaScript', 'Chrome API', 'jsPDF', 'FileSaver.js', 'Razorpay'],
      demoLink: 'https://spslabs.vercel.app/products/logify',
      category: 'Extension'
    },
    {
      title: 'Price Scout',
      description: 'Comprehensive price comparison platform aggregating data from Zomato, Swiggy, Uber, and Ola. Features intelligent geolocation-based results, personalized filters, and real-time price alerts.',
      image: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Redis', 'Google Maps API'],
      demoLink: 'https://spslabs.vercel.app/products/price-scout',
      category: 'Mobile App & Web App'
    },
    {
      title: 'Partner Hub',
      description: 'Centralized notification aggregator for delivery partners across multiple platforms. Features intelligent route optimization, comprehensive earnings tracking, and advanced task management capabilities.',
      image: 'https://images.pexels.com/photos/7709285/pexels-photo-7709285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      technologies: ['React Native', 'Node.js', 'Express', 'MongoDB', 'Google Maps API'],
      demoLink: 'https://spslabs.vercel.app/products/partner-hub',
      category: 'Mobile App'
    }
  ];

  const categories = ['All', 'Web App', 'Mobile App', 'Extension'];
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30 dark:from-slate-900 dark:via-purple-900/10 dark:to-pink-900/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full filter blur-3xl floating"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full filter blur-3xl floating-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient-exotic" style={{ fontFamily: 'Playfair Display, serif' }}>
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Showcasing innovative solutions that blend creativity with cutting-edge technology
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                  : 'glass-effect text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="flex items-center">
                {category === 'All' && <Star size={18} className="mr-2" />}
                {category === 'Web App' && <Zap size={18} className="mr-2" />}
                {category === 'Mobile App' && <Smartphone size={18} className="mr-2" />}
                {category === 'Extension' && <ExternalLink size={18} className="mr-2" />}
                {category}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className={`transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.title}
                className={`group relative glass-effect rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2 ${
                  project.featured ? 'ring-2 ring-purple-500/50' : ''
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Star size={14} className="mr-1" />
                    Featured
                  </div>
                )}

                {/* Special Badge for TutorBox */}
                {project.title === 'TutorBox' && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-emerald-400 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                    <Video size={14} className="mr-1" />
                    EdTech
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Hover Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center space-x-4 transition-all duration-300 ${
                    hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <a 
                      href={project.demoLink} 
                      className="group/btn p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-purple-600 transition-all duration-300 transform hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={20} className="text-white group-hover/btn:scale-110 transition-transform duration-300" />
                    </a>
                    {project.codeLink && (
                      <a 
                        href={project.codeLink} 
                        className="group/btn p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-pink-600 transition-all duration-300 transform hover:scale-110"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source code"
                      >
                        <Github size={20} className="text-white group-hover/btn:scale-110 transition-transform duration-300" />
                      </a>
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* CTA */}
                  <a 
                    href={project.demoLink}
                    className="group/cta inline-flex items-center text-purple-600 dark:text-purple-400 font-semibold hover:text-pink-600 dark:hover:text-pink-400 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Project
                    <ArrowRight size={18} className="ml-2 group-hover/cta:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a 
            href="https://spslabs.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
          >
            <span>View All Projects</span>
            <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;