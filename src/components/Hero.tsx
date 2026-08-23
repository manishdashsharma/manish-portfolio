
import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const tickerItems = [
  'GenAI Systems', 'Node.js', 'Python', 'React', 'Full-Stack', 'Cloud Infra',
];

const Hero: React.FC = () => {

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-12 grid-texture overflow-hidden">
      <div
        className="absolute top-28 right-6 md:right-16 w-20 h-20 md:w-28 md:h-28 bg-coral border-2 border-ink flex items-center justify-center rotate-6 shadow-brutal-sm select-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] md:text-xs font-bold uppercase text-ink text-center leading-tight -rotate-6">
          Open to<br />work
        </span>
      </div>

      <div className="container mx-auto container-padding max-w-6xl relative">
        <div className="inline-flex items-center gap-2 border-2 border-ink bg-lime px-4 py-1.5 mb-8 shadow-brutal-sm">
          <Sparkles size={14} className="text-ink" />
          <p className="text-xs font-mono font-bold text-ink tracking-wide uppercase">
            Senior Software Engineer
          </p>
        </div>

        <h1 className="font-display text-[13vw] sm:text-[10vw] md:text-[7.5vw] lg:text-[6.5vw] leading-[0.92] tracking-tight text-ink">
          MANISH
          <br />
          <span className="text-stroke-ink">DASH</span> SHARMA
        </h1>

        <div className="mt-10 max-w-2xl">
          <p className="text-lg md:text-xl text-ink/80 font-medium leading-relaxed border-l-4 border-coral pl-5">
            Architecting AI-powered systems that scale. From GenAI integrations to full-stack solutions —
            turning complex problems into elegant code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-10">
          <a
            href="#projects"
            className="brutal-btn"
          >
            View The Work
            <ArrowDown size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-ink font-mono text-sm font-semibold uppercase tracking-wide text-ink hover:bg-ink hover:text-paper transition-all duration-200"
          >
            Start A Project
          </a>
        </div>
      </div>

      <div className="mt-16 border-y-2 border-ink bg-ink py-3 overflow-hidden">
        <div className="marquee-track">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="flex items-center font-mono text-sm md:text-base font-semibold uppercase tracking-wide text-paper px-6 whitespace-nowrap"
            >
              {item}
              <span className="ml-6 text-lime">&#9733;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
