import React, { useState, useMemo } from 'react';
import { getBlogs } from '../lib/blog';
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
    <div className="relative min-h-screen bg-paper flex flex-col overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[1] grain-overlay" aria-hidden="true" />
      <Helmet>
        <title>Blog | Manish Dash Sharma - AI, Software Engineering & Tech</title>
        <meta name="description" content="Exploring the frontiers of AI, software engineering, and the future of tech. Read tutorials on GenAI, Node.js, Python, cloud infrastructure, and more." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://manishdashsharma.com/blogs" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manishdashsharma.com/blogs" />
        <meta property="og:title" content="Blog | Manish Dash Sharma" />
        <meta property="og:description" content="Exploring the frontiers of AI, software engineering, and the future of tech." />
        <meta property="og:image" content="https://manishdashsharma.com/manish.jpeg" />
        <meta property="og:site_name" content="Manish Dash Sharma" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://manishdashsharma.com/blogs" />
        <meta name="twitter:title" content="Blog | Manish Dash Sharma" />
        <meta name="twitter:description" content="Exploring the frontiers of AI, software engineering, and the future of tech." />
        <meta name="twitter:image" content="https://manishdashsharma.com/manish.jpeg" />
        <meta name="twitter:creator" content="@manishdsharma08" />

        {/* JSON-LD Blog Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Manish Dash Sharma's Blog",
            "description": "Exploring the frontiers of AI, software engineering, and the future of tech",
            "url": "https://manishdashsharma.com/blogs",
            "author": {
              "@type": "Person",
              "name": "Manish Dash Sharma",
              "url": "https://manishdashsharma.com"
            }
          })}
        </script>
      </Helmet>
      <Navbar />

      <main className="relative z-[2] flex-grow pt-28 pb-24">
        <div className="border-b-2 border-ink grid-texture">
          <div className="container mx-auto container-padding max-w-7xl py-16">
            <p className="text-xs font-mono font-bold text-coral tracking-widest uppercase mb-3">
              /01 — Journal
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6">
              Blog
            </h1>
            <p className="max-w-2xl text-ink/70 leading-relaxed text-lg mb-10">
              Exploring the frontiers of AI, software engineering, and the future of tech.
            </p>

            {/* Search Bar */}
            <div className="max-w-lg relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-ink/50 group-focus-within:text-ink transition-colors" />
              </div>
              <input
                type="text"
                className="brutal-input pl-11"
                placeholder="Search articles, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="container mx-auto container-padding max-w-7xl pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <a
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                className="group relative flex flex-col h-full brutal-card p-6"
              >
                <span className="absolute -top-3 -left-3 w-9 h-9 border-2 border-ink bg-lime text-ink font-mono text-xs font-bold flex items-center justify-center">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="flex items-center gap-3 text-xs font-mono text-ink/60 mb-5 pt-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {blog.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-ink/40"></span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {blog.readTime}
                  </span>
                </div>

                <h2 className="font-display text-xl mb-3 tracking-tight line-clamp-2 leading-snug">
                  {blog.title}
                </h2>

                <p className="text-ink/70 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                  {blog.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {blog.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] font-mono font-semibold px-2 py-1 border-2 border-ink/70 text-ink/80 uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className="text-[10px] font-mono font-semibold px-2 py-1 border-2 border-ink/70 text-ink/80 uppercase tracking-wide">
                      +{blog.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wide pt-4 border-t-2 border-ink/15 mt-auto">
                  <span className="flex items-center gap-2 text-ink group-hover:gap-3 group-hover:text-coral transition-all">
                    Read Article
                    <ArrowRight size={14} />
                  </span>
                  <span className="text-ink/50 flex items-center gap-1.5 normal-case font-sans font-medium">
                    <User size={12} />
                    {blog.author.split(' ')[0]}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-24">
              <p className="text-ink/70 text-lg mb-2">
                {searchQuery ? `No results found for "${searchQuery}"` : "No posts found."}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-ink font-bold underline decoration-2 decoration-coral underline-offset-2 text-sm"
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
