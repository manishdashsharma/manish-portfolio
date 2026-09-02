
import React from 'react';
import { ArrowRight, ExternalLink, Hammer } from 'lucide-react';

const FeaturedProduct: React.FC = () => {
  return (
    <section className="py-14 md:py-20 border-t-2 border-ink bg-ink text-paper relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#F5F1E4 1px, transparent 1px), linear-gradient(90deg, #F5F1E4 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto container-padding max-w-6xl relative">
        <p className="text-xs font-mono font-bold text-lime tracking-widest uppercase mb-3">
          /02 — Flagship Product
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-6 lg:gap-10 items-start">
          <div className="flex lg:justify-start justify-center lg:pt-1">
            <div className="w-20 h-20 md:w-28 md:h-28 border-2 border-paper bg-paper shadow-brutal-lime p-3 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="Colabrix logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="font-display text-3xl md:text-5xl tracking-tight">
                Colabrix
              </h2>
              <span className="inline-flex items-center gap-1.5 border-2 border-lime bg-ink text-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide">
                <Hammer size={12} />
                Building In Public
              </span>
            </div>

            <div className="font-mono text-sm md:text-base mb-3">
              <span className="text-lime">where_work_happens();</span>
              <span className="text-paper/40"> // where_teams_win();</span>
            </div>

            <p className="text-paper/80 leading-relaxed max-w-2xl mb-5">
              Colabrix is a sprint tracker for teams that actually ship — projects, timed sprints,
              stories, tasks, points that roll up, and an activity trail on every single change.
              Layer in an AI copilot that automates workflows, predicts bottlenecks, and keeps
              everyone in real-time sync, and you get a tool built to move fast, not just track it.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {["Node.js", "Next.js", "React", "GenAI", "Socket.io", "GitHub Integration","Resend","MinIo","Postgres"].map((tech) => (
                <span key={tech} className="text-[10px] font-mono font-semibold px-2 py-1 border-2 border-paper/40 text-paper/80">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://www.colabrix.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-lime bg-lime text-ink px-6 py-3 font-mono text-sm font-semibold uppercase tracking-wide shadow-brutal-lime transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg"
              >
                Visit Colabrix
                <ExternalLink size={16} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm font-mono font-semibold uppercase tracking-wide text-paper/70 hover:text-lime transition-colors"
              >
                See All Work
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
