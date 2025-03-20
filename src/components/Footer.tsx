
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-gray-200">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="font-serif text-xl font-bold">
              Manish Dash Sharma
              <span className="inline-block w-2 h-2 ml-1 bg-black rounded-full" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Senior Software Engineer
            </p>
          </div>
          
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <a
              href="https://github.com/manishdashsharma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/manish-dash-sharma-0082b8185/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:mdashsharma95@gmail.com"
              className="text-gray-600 hover:text-black transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Manish Dash Sharma. All rights reserved.
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            Designed and built with 
            <svg className="inline-block mx-1 w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
            </svg>
            in React, Tailwind CSS, and JavaScript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
