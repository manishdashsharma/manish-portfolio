
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
      </div>
    </footer>
  );
};

export default Footer;
