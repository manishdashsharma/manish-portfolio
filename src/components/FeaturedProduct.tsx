import React from 'react';
import { ArrowRight, ExternalLink, Github, Hammer, Sparkles } from 'lucide-react';

type Product = {
  name: string;
  logo: string;
  badge: string;
  badgeIcon: React.ReactNode;
  tagline: string;
  description: string;
  techStack: string[];
  liveLink: string;
  githubLink?: string;
};

const products: Product[] = [
  {
    name: 'Colabrix',
    logo: '/logo.png',
    badge: 'Building In Public',
    badgeIcon: <Hammer size={10} />,
    tagline: 'where_work_happens();',
    description:
      'A sprint tracker for teams that actually ship — sprints, stories, tasks and an activity trail on every change, with an AI copilot that predicts bottlenecks and keeps everyone in sync.',
    techStack: ['Node.js', 'Next.js', 'GenAI', 'Socket.io', 'Postgres'],
    liveLink: 'https://www.colabrix.in/',
  },
  {
    name: 'Doodlix',
    logo: '/doodlix-logo.png',
    badge: 'Open Source',
    badgeIcon: <Sparkles size={10} />,
    tagline: 'sketch_your_ideas();',
    description:
      'A free, hand-drawn whiteboard with Lixi, an AI assistant that turns plain words into editable diagrams — running on your own API key from any OpenAI-compatible provider.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Next.js', 'GenAI'],
    liveLink: 'https://doodlix.io',
    githubLink: 'https://github.com/manishdashsharma/doodlix',
  },
];

const FeaturedProduct: React.FC = () => {
  return (
    <section className="py-10 md:py-14 border-t-2 border-ink bg-ink text-paper relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#F5F1E4 1px, transparent 1px), linear-gradient(90deg, #F5F1E4 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto container-padding max-w-6xl relative">
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-xs font-mono font-bold text-lime tracking-widest uppercase">
            /02 — Products
          </p>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wide text-paper/70 hover:text-lime transition-colors"
          >
            See All Work
            <ArrowRight size={12} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {products.map((product) => (
            <div key={product.name} className="border-2 border-paper/20 p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 border-2 border-paper bg-paper p-1.5 flex items-center justify-center shrink-0">
                  <img
                    src={product.logo}
                    alt={`${product.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-2xl tracking-tight">{product.name}</h2>
                    <span className="inline-flex items-center gap-1 border border-lime text-lime px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide">
                      {product.badgeIcon}
                      {product.badge}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-lime">{product.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-paper/75 leading-relaxed mb-4">{product.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.techStack.map((tech) => (
                  <span key={tech} className="text-[10px] font-mono font-semibold px-2 py-0.5 border border-paper/40 text-paper/70">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3">
                <a
                  href={product.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-lime bg-lime text-ink px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wide transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lime"
                >
                  Visit
                  <ExternalLink size={14} />
                </a>
                {product.githubLink && (
                  <a
                    href={product.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-paper/50 text-paper px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wide transition-colors duration-200 hover:border-lime hover:text-lime"
                  >
                    Source
                    <Github size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
