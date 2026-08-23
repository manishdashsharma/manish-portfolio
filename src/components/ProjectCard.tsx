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

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      setModalActive(true);
    }, 10);
  };

  const closeModal = () => {
    setModalActive(false);

    setTimeout(() => {
      setShowModal(false);
      document.body.style.overflow = 'auto';
    }, 300);
  };

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

  const handleModalBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const Modal = () => {
    return createPortal(
      <div
        className={cn(
          "fixed inset-0 bg-ink/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay",
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
            "bg-card border-2 border-ink max-w-2xl w-full max-h-[90vh] overflow-y-auto modal-content shadow-brutal-lg",
            modalActive && "active"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-ink text-paper p-6 border-b-2 border-ink flex justify-between items-center z-10">
            <h2
              id={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="font-display text-xl tracking-tight"
            >
              {title}
            </h2>
            <button
              onClick={closeModal}
              className="p-2 border-2 border-paper/40 hover:border-lime hover:bg-lime hover:text-ink text-paper transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {rating > 0 && (
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-ink/50 mb-3">Project Rating</h3>
                <div className="flex items-center gap-2">
                  <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={cn(
                        "mr-0.5",
                        i < rating ? "fill-coral text-ink" : "fill-transparent text-ink/20"
                      )}
                    />
                  ))}
                  </div>
                  <span className="text-sm font-mono font-bold text-ink">{rating}.0</span>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-ink/50 mb-3">About</h3>
              <p className="text-ink/90 leading-relaxed text-base">{longDescription || description}</p>
            </div>

            {clientMessage && (
              <div>
                <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-ink/50 mb-3">Client Feedback</h3>
                <div className="bg-secondary/60 p-4 border-l-4 border-coral italic text-ink/80">
                  "{clientMessage}"
                </div>
              </div>
            )}

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-ink/50 mb-3">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="text-xs font-mono font-semibold px-2.5 py-1 border-2 border-ink bg-secondary/40">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {liveLink && (
              <div className="pt-4">
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-btn"
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
        className="group relative flex flex-col h-full brutal-card p-6"
      >
        <span className="absolute -top-3 -left-3 w-9 h-9 border-2 border-ink bg-lime text-ink font-mono text-xs font-bold flex items-center justify-center">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="mb-5 flex items-start justify-between pt-2">
          <div className="space-y-1">
            <h3 className="font-display text-xl tracking-tight text-ink">
              {title}
            </h3>
            <div className="h-0.5 w-0 bg-coral group-hover:w-full transition-all duration-500 ease-out" />
          </div>
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/60 hover:text-coral transition-colors p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>

        <p className="text-ink/70 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="mt-auto space-y-5">
          <div className="flex flex-wrap gap-1.5">
            {techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[10px] font-mono font-semibold px-2 py-1 border-2 border-ink/70 text-ink/80">
                {tech}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className="text-[10px] font-mono font-semibold px-2 py-1 border-2 border-ink/70 text-ink/80">
                +{techStack.length - 3}
              </span>
            )}
          </div>

          <button
            onClick={openModal}
            className="w-full flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wide text-ink/70 group-hover:text-ink transition-colors pt-4 border-t-2 border-ink/15"
          >
            <span>View Details</span>
            <span className="border-2 border-ink p-1 group-hover:bg-ink group-hover:text-lime transition-all duration-200">
              <ArrowRight size={12} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </span>
          </button>
        </div>
      </div>

      {showModal && <Modal />}
    </>
  );
};

export default ProjectCard;
