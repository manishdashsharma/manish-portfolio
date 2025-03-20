
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path');
    
    if (paths) {
      paths.forEach((path, index) => {
        path.style.animationDelay = `${index * 0.2}s`;
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto container-padding flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 z-10 text-center md:text-left">
          <div className="overflow-hidden">
            <span className="inline-block text-sm font-medium text-gray-500 tracking-wider uppercase animate-fade-in">
              Senior Software Engineer
            </span>
          </div>
          
          <div className="overflow-hidden">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Manish Dash <br /> Sharma
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <p className="mt-6 text-gray-700 max-w-lg mx-auto md:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              A passionate and results-driven Senior Software Engineer with expertise in Node.js, Python, React, and cloud infrastructure, building scalable solutions and leading innovative projects.
            </p>
          </div>
          
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full transition-transform hover:-translate-y-1"
            >
              View Projects
              <ArrowDown size={16} className="animate-float" />
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 relative">
          <svg 
            ref={svgRef}
            width={isMobile ? 300 : 500} 
            height={isMobile ? 300 : 500} 
            viewBox="0 0 500 500" 
            className="mx-auto md:mx-0 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Simple hand-drawn portrait outline */}
            <path d="M250,100 C150,100 150,350 250,400 C350,350 350,100 250,100" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M175,200 C175,180 325,180 325,200" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M200,250 C200,250 250,300 300,250" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M210,170 C210,170 215,180 225,170" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M275,170 C275,170 280,180 290,170" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M150,150 C100,200 100,300 150,350" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M350,150 C400,200 400,300 350,350" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M200,110 C200,80 300,80 300,110" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            
            {/* Code symbols */}
            <path d="M120,400 C120,400 140,380 120,360" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M100,380 L140,380" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M380,400 C380,400 360,380 380,360" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            <path d="M400,380 L360,380" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
            
            {/* Node and connections representing tech stack */}
            <circle cx="150" cy="450" r="10" className="stroke-animation" fill="white" stroke="black" strokeWidth="2" />
            <circle cx="200" cy="470" r="10" className="stroke-animation" fill="white" stroke="black" strokeWidth="2" />
            <circle cx="250" cy="480" r="10" className="stroke-animation" fill="white" stroke="black" strokeWidth="2" />
            <circle cx="300" cy="470" r="10" className="stroke-animation" fill="white" stroke="black" strokeWidth="2" />
            <circle cx="350" cy="450" r="10" className="stroke-animation" fill="white" stroke="black" strokeWidth="2" />
            
            <path d="M150,450 L200,470 L250,480 L300,470 L350,450" className="stroke-animation" fill="none" stroke="black" strokeWidth="2" />
          </svg>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
