import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Send, MapPin, MessageCircle, Github, Linkedin, Terminal } from 'lucide-react';

const Contact: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  } | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://formspree.io/f/xzzrzoyy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus({
          submitted: true,
          success: true,
          message: 'Thank you! Your message has been sent successfully.'
        });
        
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'sohardpratapsingh346@gmail.com',
      href: 'mailto:sohardpratapsingh346@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 9997697716',
      href: 'tel:+919997697716'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Dehradun, Uttarakhand, India',
      href: null
    }
  ];

  const socialLinks = [
    { 
      href: "https://github.com/sohardpratap", 
      icon: Github, 
      label: "GitHub",
      color: "hover:bg-gray-700"
    },
    { 
      href: "https://linkedin.com/in/sohard-pratap-singh/", 
      icon: Linkedin, 
      label: "LinkedIn",
      color: "hover:bg-blue-600"
    },
    { 
      href: "https://leetcode.com/u/sohardpratapsingh346", 
      icon: Terminal, 
      label: "LeetCode",
      color: "hover:bg-yellow-600"
    }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Let's discuss your next project or just say hello
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className={`lg:col-span-2 fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="glass rounded-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <Send size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send Message
                </h3>
              </div>
              
              {formStatus && (
                <div className={`mb-6 p-4 rounded-lg ${
                  formStatus.success 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                }`}>
                  <p>{formStatus.message}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg glass text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 smooth-transition"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg glass text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 smooth-transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg glass text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 smooth-transition"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg glass text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 smooth-transition resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover-lift smooth-transition flex items-center justify-center"
                >
                  <span>Send Message</span>
                  <Send size={20} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className={`fade-in ${isVisible ? 'visible' : ''}`}>
            <div className="space-y-6">
              {/* Contact Info Cards */}
              {contactInfo.map((item, index) => (
                <div 
                  key={item.title}
                  className={`p-6 glass rounded-lg hover-lift smooth-transition fade-in ${isVisible ? 'visible' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <item.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                      {item.href ? (
                        <a 
                          href={item.href}
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 smooth-transition break-all"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Availability */}
              <div className="p-6 glass rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Availability</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Available for new projects</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Response time: Within 24 hours
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 glass rounded-lg">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Connect With Me
                </h4>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 glass rounded-lg ${social.color} smooth-transition hover-scale`}
                      aria-label={social.label}
                    >
                      <social.icon size={20} className="text-gray-600 dark:text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;