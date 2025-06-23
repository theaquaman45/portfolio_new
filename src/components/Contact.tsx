import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, Send, MapPin, AlertTriangle, MessageCircle, Calendar, Clock, Sparkles } from 'lucide-react';

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
          message: 'Thank you! Your message has been sent successfully. I will get back to you soon.'
        });
        
        // Reset form after successful submission
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
        message: 'Sorry, there was an error sending your message. Please try again later.'
      });
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 dark:from-slate-800 dark:via-cyan-900/10 dark:to-blue-900/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full filter blur-3xl floating"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full filter blur-3xl floating-delayed"></div>
        
        {/* Floating Contact Icons */}
        <div className="absolute top-40 right-40 floating">
          <MessageCircle className="text-cyan-400/20 dark:text-cyan-500/20" size={56} />
        </div>
        <div className="absolute bottom-40 left-40 floating-delayed">
          <Sparkles className="text-blue-400/20 dark:text-blue-500/20" size={48} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
            Let's Create Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
            Have an exciting project in mind? Let's discuss how we can bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="glass-effect rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                  <Send size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Send Me a Message
                </h3>
              </div>
              
              {formStatus && (
                <div className={`mb-6 p-4 rounded-2xl ${formStatus.success ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'}`}>
                  <div className="flex items-start">
                    {formStatus.success ? (
                      <Send className="flex-shrink-0 w-5 h-5 mr-3 mt-0.5" />
                    ) : (
                      <AlertTriangle className="flex-shrink-0 w-5 h-5 mr-3 mt-0.5" />
                    )}
                    <p>{formStatus.message}</p>
                  </div>
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="group w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-blue-600 hover:to-indigo-600 text-white font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 flex items-center justify-center"
                >
                  <span>Send Message</span>
                  <Send size={20} className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className={`lg:col-span-2 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="space-y-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: 'Email',
                    content: 'sohardpratapsingh346@gmail.com',
                    href: 'mailto:sohardpratapsingh346@gmail.com',
                    color: 'from-cyan-500 to-blue-500'
                  },
                  {
                    icon: Phone,
                    title: 'Phone',
                    content: '+91 9997697716',
                    href: 'tel:+919997697716',
                    color: 'from-emerald-500 to-teal-500'
                  },
                  {
                    icon: MapPin,
                    title: 'Location',
                    content: 'Dehradun, Uttarakhand, India',
                    href: null,
                    color: 'from-purple-500 to-pink-500'
                  }
                ].map((item, index) => (
                  <div 
                    key={item.title}
                    className="group glass-effect rounded-2xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon size={24} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                        {item.href ? (
                          <a 
                            href={item.href}
                            className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 break-all"
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
              </div>

              {/* Availability Card */}
              <div className="glass-effect rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <Clock size={20} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">Availability</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Response Time</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Within 24 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Timezone</span>
                    <span className="text-gray-900 dark:text-white font-semibold">IST (UTC+5:30)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available for new projects</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-effect rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Sparkles size={20} className="mr-2 text-cyan-500" />
                  Connect With Me
                </h4>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { 
                      href: "https://github.com/sohardpratap", 
                      label: "GitHub",
                      color: "from-gray-700 to-gray-900",
                      icon: "🐙"
                    },
                    { 
                      href: "https://linkedin.com/in/sohard-pratap-singh/", 
                      label: "LinkedIn",
                      color: "from-blue-600 to-blue-800",
                      icon: "💼"
                    },
                    { 
                      href: "https://leetcode.com/u/sohardpratapsingh346", 
                      label: "LeetCode",
                      color: "from-yellow-500 to-orange-500",
                      icon: "🧩"
                    }
                  ].map((social, index) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group relative p-4 bg-gradient-to-r ${social.color} rounded-xl text-white text-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                      aria-label={social.label}
                    >
                      <div className="text-2xl mb-2">{social.icon}</div>
                      <div className="text-xs font-semibold">{social.label}</div>
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