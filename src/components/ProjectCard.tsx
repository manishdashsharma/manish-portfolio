import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { ArrowRight, ExternalLink, X, Star } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  index: number;
  liveLink?: string;
  clientMessage?: string;
  longDescription?: string;
  rating?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  techStack, 
  index,
  liveLink,
  clientMessage,
  longDescription,
  rating = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
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

  // Improved modal open function with animation sequence
  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
    
    // Activate modal for animation after a small delay
    setTimeout(() => {
      setModalActive(true);
    }, 10);
  };

  const closeModal = () => {
    setModalActive(false);
    
    // Remove modal from DOM after animation completes
    setTimeout(() => {
      setShowModal(false);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    
    if (showModal) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showModal]);

  // Close modal when clicking outside
  const handleModalBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'; // Ensure overflow is reset when component unmounts
    };
  }, []);

  // Create portal for modal to prevent stacking context issues
  const Modal = () => {
    return createPortal(
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 modal-overlay",
          modalActive && "active"
        )}
        onClick={handleModalBackgroundClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div 
          ref={modalRef}
          className={cn(
            "bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content",
            modalActive && "active"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
            <h2 
              id={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="font-serif text-2xl font-bold"
            >
              {title}
            </h2>
            <button 
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-gray-100 transition-all"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            {/* Rating */}
            {rating > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Project Rating</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">{rating} out of 5</span>
                </div>
              </div>
            )}
            
            {/* Full Description */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{longDescription || description}</p>
            </div>
            
            {/* Client Message */}
            {clientMessage && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Client Feedback</h3>
                <blockquote className="italic text-gray-600 border-l-4 border-gray-200 pl-4 py-2">
                  "{clientMessage}"
                </blockquote>
              </div>
            )}
            
            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Live Link */}
            {liveLink && (
              <div>
                <a 
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Visit Project <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
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
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} className={cn(
                "transition-all duration-300",
                isHovered ? "opacity-100" : "opacity-50"
              )} />
            </a>
          )}
          {!liveLink && (
            <div className="opacity-0">
              <ExternalLink size={18} />
            </div>
          )}
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
        
        <button 
          onClick={openModal}
          className={cn(
            "flex items-center text-xs font-medium transition-all duration-300 cursor-pointer",
            isHovered ? "opacity-100" : "opacity-70"
          )}
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          <span>View details</span>
          <ArrowRight size={14} className={cn(
            "ml-1 transition-transform duration-300",
            isHovered ? "translate-x-1" : ""
          )} />
        </button>
      </div>

      {/* Modal Portal */}
      {showModal && <Modal />}
    </>
  );
};

export default ProjectCard;
