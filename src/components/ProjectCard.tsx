
import React, { useRef, useState } from 'react';
import { cn } from '../lib/utils';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, techStack, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    setIsHovered(false);
  };
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "glass-morphism p-6 md:p-8 rounded-xl transition-all duration-300 h-full",
        isHovered ? "shadow-lg" : "shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ animationDelay: `${index * 0.1}s`, transition: 'transform 0.1s ease-out' }}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <svg width="30" height="30" viewBox="0 0 100 100">
            <path 
              d={`M20,${50 + index * 5} C40,${20 + index * 3} 60,${80 - index * 4} 80,${40 + index * 2}`} 
              className="stroke-animation" 
              fill="none" 
              stroke="black" 
              strokeWidth="2" 
            />
          </svg>
          <h3 className="font-serif text-xl font-semibold tracking-tight">{title}</h3>
        </div>
        <ExternalLink size={18} className={cn(
          "transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-50"
        )} />
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {techStack.slice(0, 3).map((tech) => (
          <span key={tech} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
            {tech}
          </span>
        ))}
        {techStack.length > 3 && (
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
            +{techStack.length - 3}
          </span>
        )}
      </div>
      
      <div className={cn(
        "flex items-center text-xs font-medium transition-all duration-300",
        isHovered ? "opacity-100" : "opacity-70"
      )}>
        <span>View details</span>
        <ArrowRight size={14} className={cn(
          "ml-1 transition-transform duration-300",
          isHovered ? "translate-x-1" : ""
        )} />
      </div>
    </div>
  );
};

export default ProjectCard;
