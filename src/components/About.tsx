
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
      role: "Senion Software Manager",
      company: "DoWell UX Living Lab",
      period: "Jan 2025 – Present",
      description: "Overseeing product and technology development, managing cross-functional teams, and driving strategic innovation."
    },
    {
      role: "Technical Project Manager",
      company: "DoWell Research Singapore",
      period: "May 2022 – Dec 2024",
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
    <section id="about" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <div className="inline-block mb-2 px-3 py-1 bg-gray-200 rounded-full text-xs font-medium uppercase tracking-wider">
            About Me
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            My Journey & Expertise
          </h2>
          <p className="max-w-lg mx-auto text-gray-600">
            A glimpse into my professional background, technical skills, and what drives me as a software engineer.
          </p>
        </div>
        
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-6 flex items-center">
              <LineIllustration type="code" className="text-black mr-3" />
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
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  <SkillBadge name={skill} />
                </div>
              ))}
            </div>
            
            <div 
              className={cn(
                "glass-morphism p-6 rounded-xl opacity-0 transform translate-y-4 transition-all duration-500", 
                inView && "opacity-100 translate-y-0"
              )} 
              style={{ transitionDelay: "0.6s" }}
            >
              <h4 className="font-serif text-lg font-semibold mb-4 flex items-center">
                <LineIllustration type="design" className="text-black mr-2 w-5 h-5" />
                My Approach
              </h4>
              <p className="text-gray-700 mb-4">
                I'm passionate about building high-performance applications and fostering a collaborative engineering culture. I believe in clean code, thoughtful architecture, and continuous learning.
              </p>
              <p className="text-gray-700">
                My development philosophy focuses on creating scalable solutions that solve real problems while maintaining code quality and user experience.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-6 flex items-center">
              <LineIllustration type="database" className="text-black mr-3" />
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
                  <div className="absolute left-0 top-0 w-4 h-4 border-2 border-black rounded-full bg-white"></div>
                  {index < experiences.length - 1 && (
                    <div className="absolute left-2 top-4 w-0.5 h-full -ml-px bg-gray-200"></div>
                  )}
                  
                  <div className="mb-1 text-xs text-gray-500">{exp.period}</div>
                  <h4 className="font-serif font-semibold">{exp.role}</h4>
                  <div className="text-sm font-medium mb-2">{exp.company}</div>
                  <p className="text-sm text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
            
            <div 
              className={cn(
                "glass-morphism p-6 rounded-xl mt-8 opacity-0 transform translate-y-4 transition-all duration-500", 
                inView && "opacity-100 translate-y-0"
              )} 
              style={{ transitionDelay: "0.8s" }}
            >
              <h4 className="font-serif text-lg font-semibold mb-4 flex items-center">
                <LineIllustration type="cloud" className="text-black mr-2 w-5 h-5" />
                Cloud & Infrastructure
              </h4>
              <p className="text-gray-700">
                I specialize in designing and implementing cloud infrastructure on AWS, with expertise in containerization using Docker and Kubernetes, and setting up robust CI/CD pipelines for seamless deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
