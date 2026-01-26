import React, { useState, useMemo } from 'react';
import { getBlogs } from '../lib/blog';
import { cn } from '../lib/utils';
import { ArrowRight, Calendar, Clock, User, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const Blogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const allBlogs = getBlogs();

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return allBlogs;
    
    const query = searchQuery.toLowerCase();
    return allBlogs.filter(blog => 
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query) ||
      blog.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery, allBlogs]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Blog | Manish</title>
        <meta name="description" content="Exploring the frontiers of AI, software engineering, and the future of tech. Read my latest thoughts and tutorials." />
        <meta property="og:title" content="Blog | Manish" />
        <meta property="og:description" content="Exploring the frontiers of AI, software engineering, and the future of tech." />
      </Helmet>
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto container-padding max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase mb-4">
              Insights & Thoughts
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Blog
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed text-lg mb-8">
              Exploring the frontiers of AI, software engineering, and the future of tech.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-border/60 rounded-full leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-sm hover:shadow-md"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <a 
                key={blog.slug} 
                href={`/blogs/${blog.slug}`}
                className="group flex flex-col h-full bg-card rounded-xl border border-border/40 overflow-hidden transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {blog.readTime}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 tracking-tight group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {blog.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md border border-border/50">
                        {tag}
                      </span>
                    ))}
                    {blog.tags.length > 2 && (
                       <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-secondary/50 text-secondary-foreground rounded-md border border-border/50">
                        +{blog.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-medium text-primary pt-4 border-t border-border/40 mt-auto">
                    <span className="flex items-center gap-2 group/btn">
                      Read Article
                      <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1.5">
                       <User size={12} />
                       {blog.author.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {searchQuery ? `No results found for "${searchQuery}"` : "No posts found."}
              </p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-primary hover:underline font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blogs;
