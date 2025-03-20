
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Send, Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would send the form data to a backend
    console.log('Form submitted:', formData);
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: '', email: '', message: '' });
  };
  
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <div className="inline-block mb-2 px-3 py-1 bg-gray-200 rounded-full text-xs font-medium uppercase tracking-wider">
            Get in Touch
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Let's Connect
          </h2>
          <p className="max-w-lg mx-auto text-gray-600">
            Have a project in mind or want to discuss potential collaborations? I'd love to hear from you.
          </p>
        </div>
        
        <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div 
            className={cn(
              "opacity-0 transform -translate-x-10 transition-all duration-700", 
              inView && "opacity-100 translate-x-0"
            )}
          >
            <div className="glass-morphism rounded-xl p-8 h-full">
              <h3 className="font-serif text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="mr-4 text-gray-700" size={20} />
                  <a href="mailto:mdashsharma95@gmail.com" className="text-gray-700 hover:text-black transition-colors">
                    mdashsharma95@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Github className="mr-4 text-gray-700" size={20} />
                  <a 
                    href="https://github.com/manishdashsharma" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black transition-colors"
                  >
                    manishdashsharma
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Linkedin className="mr-4 text-gray-700" size={20} />
                  <a 
                    href="https://www.linkedin.com/in/manish-dash-sharma-0082b8185/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-black transition-colors"
                  >
                    Manish Dash Sharma
                  </a>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="font-serif text-lg font-semibold mb-4">Let's build something amazing together</h4>
                <p className="text-gray-600">
                  I'm always open to discussing new projects, innovative ideas, or opportunities to be part of your vision.
                </p>
                
                <div className="mt-8">
                  <svg width="200" height="80" viewBox="0 0 200 80">
                    <path d="M20,40 C40,10 60,70 80,30 C100,60 120,20 140,50 C160,30 180,50 190,40" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={cn(
              "opacity-0 transform translate-x-10 transition-all duration-700", 
              inView && "opacity-100 translate-x-0"
            )}
            style={{ transitionDelay: "0.2s" }}
          >
            <form onSubmit={handleSubmit} className="glass-morphism rounded-xl p-8">
              <h3 className="font-serif text-2xl font-semibold mb-6">Send Me a Message</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors"
                    placeholder="Your email"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors resize-none"
                    placeholder="Your message"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-black text-white rounded-lg flex items-center justify-center gap-2 transition-transform hover:-translate-y-1"
                >
                  Send Message
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
