
import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(4);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const projectsData = [
    {
      title: "Tradescribe.in",
      description: "A stock data management and analysis platform designed to help users track, manage, and analyze market data efficiently.",
      techStack: ["Node.js", "React", "MongoDB", "TypeScript", "Docker", "WebSockets"]
    },
    {
      title: "RoomSpa",
      description: "A comprehensive spa management system that streamlines appointment booking, service management, and client tracking.",
      techStack: ["Python-Django", "React", "Flutter", "Socket.io", "Docker"]
    },
    {
      title: "Nessa",
      description: "A platform delivering sustainable and high-performance lighting solutions across 20+ countries.",
      techStack: ["Node.js", "React", "MongoDB", "Docker"]
    },
    {
      title: "ChurchLightHouse",
      description: "A complete platform for church event management, announcements, and congregation engagement.",
      techStack: ["Node.js", "Flutter", "MongoDB", "Firebase"]
    },
    {
      title: "Promptly",
      description: "A versatile Discord bot for automating event reminders and announcements. Built with Node.js and Docker.",
      techStack: ["Node.js", "Docker", "Discord API"]
    },
    {
      title: "WoodLog",
      description: "An image-processing solution designed to assist post officers in efficiently counting logs.",
      techStack: ["Python", "Pandas", "YOLO", "Docker"]
    },
    {
      title: "Track-Your-Payment",
      description: "A financial management app to track payment due dates, send reminders, and integrate with calendars.",
      techStack: ["Node.js", "React", "Tailwind", "MongoDB", "Firebase"]
    },
    {
      title: "Scoopie",
      description: "A social media app connecting people through interactive content.",
      techStack: ["Node.js", "MongoDB", "Flutter", "Prisma", "TypeScript", "Tailwind"]
    },
    {
      title: "TaskForge",
      description: "An open-source project management and issue-tracking tool designed to enhance team collaboration and productivity.",
      techStack: ["Node.js", "React", "TypeScript", "GitHub API"]
    },
    {
      title: "Secure Repository",
      description: "A secure backup system utilizing GitHub Actions for automated backups post-merge, ensuring data integrity and safety.",
      techStack: ["Python-Django", "React", "MongoDB", "GitHub Actions"]
    },
    {
      title: "Samanta Business Analyzer",
      description: "A business analysis tool performing SWOT analysis and integrating with Google Maps API and Gemini AI.",
      techStack: ["Django", "React", "Google Maps API", "Gemini AI"]
    },
    {
      title: "Scale Feedback System",
      description: "A customizable feedback collection platform enabling users to select scales and generate reports.",
      techStack: ["Node.js", "Django", "React", "Docker"]
    }
  ];
  
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const handleViewMore = () => {
    // Show 4 more projects when the button is clicked
    setVisibleProjects(prev => Math.min(prev + 4, projectsData.length));
    
    // Scroll to the newly visible projects
    if (visibleProjects < projectsData.length) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  return (
    <section ref={sectionRef} id="projects" className="section-padding bg-gray-50">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <div className="inline-block mb-2 px-3 py-1 bg-gray-200 rounded-full text-xs font-medium uppercase tracking-wider">
            Portfolio
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="max-w-lg mx-auto text-gray-600">
            Explore a collection of my most impactful work, showcasing my expertise in building scalable applications and innovative solutions.
          </p>
        </div>
        
        <div 
          ref={ref} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {projectsData.slice(0, visibleProjects).map((project, index) => (
            <div 
              key={project.title} 
              className={cn(
                "opacity-0 transform translate-y-10 transition-all duration-700", 
                inView && "opacity-100 translate-y-0"
              )} 
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <ProjectCard 
                title={project.title} 
                description={project.description}
                techStack={project.techStack}
                index={index}
              />
            </div>
          ))}
        </div>
        
        {visibleProjects < projectsData.length && (
          <div className="mt-12 text-center">
            <button 
              className="inline-flex items-center gap-2 px-6 py-2 border border-black rounded-full transition-all hover:bg-black hover:text-white" 
              onClick={handleViewMore}
            >
              View more projects 
              <ChevronDown size={16} className="animate-bounce" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
