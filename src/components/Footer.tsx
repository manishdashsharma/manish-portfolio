
import React from 'react';
import { Github, Linkedin, Mail, Twitter, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const marqueeText = "LET'S BUILD SOMETHING GREAT";

  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="border-b-2 border-paper/20 py-3 overflow-hidden">
        <div className="marquee-track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center font-display text-xl md:text-2xl uppercase tracking-wide px-6 whitespace-nowrap"
            >
              {marqueeText}
              <span className="ml-6 text-lime">&#9679;</span>
            </span>
          ))}
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto container-padding">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="font-display text-xl flex items-center gap-2 justify-center md:justify-start">
                <span className="border-2 border-paper px-2 py-1 leading-none text-lime">MANISH</span>
              </div>
              <p className="text-sm text-paper/60 mt-2 font-mono uppercase tracking-wide">
                Senior Software Engineer
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/manishdashsharma"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-paper/40 flex items-center justify-center text-paper hover:bg-lime hover:text-ink hover:border-lime transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/manish-dash-sharma-0082b8185/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-paper/40 flex items-center justify-center text-paper hover:bg-lime hover:text-ink hover:border-lime transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://x.com/manishdsharma08"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-paper/40 flex items-center justify-center text-paper hover:bg-lime hover:text-ink hover:border-lime transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://easytechinnovate.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-paper/40 flex items-center justify-center text-paper hover:bg-lime hover:text-ink hover:border-lime transition-colors"
                aria-label="Website"
              >
                <Globe size={18} />
              </a>
              <a
                href="mailto:mdashsharma95@gmail.com"
                className="w-10 h-10 border-2 border-paper/40 flex items-center justify-center text-paper hover:bg-lime hover:text-ink hover:border-lime transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>

            <div className="text-xs font-mono text-paper/50 uppercase tracking-wide">
              &copy; {new Date().getFullYear()} Manish Dash Sharma
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
