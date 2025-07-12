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
  const [showModal, setShowModal] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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
          <div className="sticky top-0 bg-card p-6 border-b border-border/20 flex justify-between items-center z-10">
            <h2 
              id={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-xl font-medium tracking-tight"
            >
              {title}
            </h2>
            <button 
              onClick={closeModal}
              className="p-2 hover:bg-muted transition-colors rounded-sm"
              aria-label="Close modal"
            >
              <X size={16} />
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
              <h3 className="text-sm font-medium text-foreground mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="text-xs font-mono px-3 py-1 bg-muted text-muted-foreground rounded-sm">
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Visit Project <ExternalLink size={14} />
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
        className="minimal-card p-6 rounded-sm h-full group"
      >
        <div className="mb-4 flex items-start justify-between">
          <h3 className="font-medium text-lg tracking-tight leading-tight">{title}</h3>
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ExternalLink size={16} className="text-muted-foreground hover:text-foreground" />
            </a>
          )}
        </div>
        
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground rounded-sm">
              {tech}
            </span>
          ))}
          {techStack.length > 3 && (
            <span className="text-xs font-mono px-2 py-1 bg-muted text-muted-foreground rounded-sm">
              +{techStack.length - 3}
            </span>
          )}
        </div>
        
        <button 
          onClick={openModal}
          className="flex items-center text-xs font-medium text-muted-foreground hover:text-foreground transition-colors group/button"
          style={{ background: "transparent", border: "none", padding: 0 }}
        >
          <span>View Details</span>
          <ArrowRight size={12} className="ml-1 transition-transform group-hover/button:translate-x-1" />
        </button>
      </div>

      {/* Modal Portal */}
      {showModal && <Modal />}
    </>
  );
};

export default ProjectCard;
