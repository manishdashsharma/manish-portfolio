
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
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Replace this with your actual Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyNfPnU5sEqJ9ck671Cv0xH-Psfp8kQQe_R8nPuSgKVoBqie4eKXqBxwlcT1TJK_aWc/exec';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: At least email or phone must be provided
    if (!formData.email.trim() && !formData.phone.trim()) {
      toast.error("Please provide either an email address or phone number.");
      return;
    }
    
    // Validate email format if provided
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }
    
    // Validate phone format if provided (basic validation)
    if (formData.phone.trim()) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        toast.error("Please enter a valid phone number.");
        return;
      }
    }
    
    setIsSubmitting(true);
    
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // Since we're using no-cors mode, we can't read the response
      // but if no error is thrown, we assume success
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: '', email: '', phone: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to send message. Please try again or contact me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto container-padding max-w-4xl">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Let's Connect
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Have a project in mind or want to discuss collaborations? 
            Let's explore how we can work together.
          </p>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div 
            className={cn(
              "opacity-0 transform -translate-x-10 transition-all duration-700", 
              inView && "opacity-100 translate-x-0"
            )}
          >
            <div className="minimal-card p-8 rounded-sm h-full">
              <h3 className="text-xl font-medium mb-8 tracking-tight">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="mr-4 text-muted-foreground" size={18} />
                  <a href="mailto:mdashsharma95@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
                    mdashsharma95@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Github className="mr-4 text-muted-foreground" size={18} />
                  <a 
                    href="https://github.com/manishdashsharma" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    manishdashsharma
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Linkedin className="mr-4 text-muted-foreground" size={18} />
                  <a 
                    href="https://www.linkedin.com/in/manish-dash-sharma-0082b8185/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Manish Dash Sharma
                  </a>
                </div>
              </div>
              
              <div className="mt-12">
                <h4 className="text-lg font-medium mb-4 tracking-tight">Let's build something amazing</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Always open to discussing new projects, innovative ideas, 
                  and opportunities to create impactful solutions together.
                </p>
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
            <form onSubmit={handleSubmit} className="minimal-card p-8 rounded-sm">
              <h3 className="text-xl font-medium mb-8 tracking-tight">Send a Message</h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-sm focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-colors bg-card"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email <span className="text-muted-foreground text-xs">(Email or Phone required)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-colors bg-card"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone <span className="text-muted-foreground text-xs">(Email or Phone required)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-colors bg-card"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-border rounded-sm focus:ring-1 focus:ring-foreground focus:border-foreground outline-none transition-colors resize-none bg-card"
                    placeholder="Your message"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-primary text-primary-foreground rounded-sm flex items-center justify-center gap-2 transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={14} />
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
