
import React from 'react';
import { useInView } from 'react-intersection-observer';
import SkillBadge from './SkillBadge';
import LineIllustration from './LineIllustration';
import { cn } from '../lib/utils';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const skills = [
    "Node.js", "Python/Django", "React", "Next.js", "Docker", 
    "Kubernetes", "Kafka", "WebSockets", "MongoDB", "Postgres", 
    "Prisma ORM", "TypeScript", "JavaScript", "Nuxt.js", "AWS", "firebase", "Redis"
  ];
  
  const experiences = [
    {
      role: "Technical Project Manager",
      company: "DoWell UX Living Lab",
      period: "Jan 2024 – July 2025",
      description: "Overseeing product and technology development, managing cross-functional teams, and driving strategic innovation."
    },
    {
      role: "Senion Software Manager",
      company: "DoWell Research Singapore",
      period: "May 2022 – Jan 2024",
      description: "Led technical projects, coordinated with international teams, and implemented best engineering practices."
    },
    {
      role: "Software Engineer",
      company: "DoWell Research Singapore",
      period: "Jan 2021 – May 2022",
      description: "Developed and maintained software applications, collaborated on architecture decisions, and implemented CI/CD pipelines."
    }
  ];
  
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container mx-auto container-padding max-w-6xl">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
            About
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">
            Background & Expertise
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Technical skills, professional journey, and the approach that drives 
            innovation in software engineering.
          </p>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl font-medium mb-8 tracking-tight">
              Technical Skills
            </h3>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((skill, index) => (
                <div 
                  key={skill}
                  className={cn(
                    "opacity-0 transform translate-y-4 transition-all duration-500", 
                    inView && "opacity-100 translate-y-0"
                  )} 
                  style={{ transitionDelay: `${index * 0.03}s` }}
                >
                  <span className="text-xs font-mono px-3 py-1 bg-muted border border-border/50 text-muted-foreground rounded-sm">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
            
            <div 
              className={cn(
                "minimal-card p-6 rounded-sm opacity-0 transform translate-y-4 transition-all duration-500", 
                inView && "opacity-100 translate-y-0"
              )} 
              style={{ transitionDelay: "0.6s" }}
            >
              <h4 className="text-lg font-medium mb-4 tracking-tight">
                Philosophy
              </h4>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Passionate about building high-performance applications and fostering collaborative 
                engineering culture. Believer in clean code, thoughtful architecture, and continuous learning.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Development philosophy focuses on creating scalable solutions that solve real problems 
                while maintaining code quality and exceptional user experience.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-8 tracking-tight">
              Professional Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div 
                  key={exp.company + exp.period}
                  className={cn(
                    "relative pl-8 opacity-0 transform translate-y-4 transition-all duration-500", 
                    inView && "opacity-100 translate-y-0"
                  )} 
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute left-0 top-0 w-3 h-3 border border-foreground rounded-full bg-background"></div>
                  {index < experiences.length - 1 && (
                    <div className="absolute left-1 top-3 w-0.5 h-full -ml-px bg-border"></div>
                  )}
                  
                  <div className="mb-1 text-xs text-muted-foreground font-mono">{exp.period}</div>
                  <h4 className="font-medium">{exp.role}</h4>
                  <div className="text-sm text-muted-foreground mb-2">{exp.company}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
            
            <div 
              className={cn(
                "minimal-card p-6 rounded-sm mt-8 opacity-0 transform translate-y-4 transition-all duration-500", 
                inView && "opacity-100 translate-y-0"
              )} 
              style={{ transitionDelay: "0.8s" }}
            >
              <h4 className="text-lg font-medium mb-4 tracking-tight">
                Cloud & Infrastructure
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                Specialized in designing and implementing cloud infrastructure on AWS, with expertise 
                in containerization using Docker and Kubernetes, and robust CI/CD pipelines for seamless deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
