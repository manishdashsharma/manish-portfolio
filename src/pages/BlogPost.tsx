
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogBySlug } from '../lib/blog';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '../lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Mermaid from '../components/Mermaid';




import { Helmet } from 'react-helmet-async';



const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const blog = slug ? getBlogBySlug(slug) : undefined;

  useEffect(() => {
    if (!blog) {
      // Typically you might redirect to 404 here, but simple redirect to list is fine for now
      // navigate('/blogs'); 
    }
  }, [blog, navigate]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-3xl font-light mb-4">Post not found</h1>
        <button 
           onClick={() => navigate('/blogs')}
           className="text-primary hover:underline flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {blog && (
        <Helmet>
          <title>{blog.title} | Manish</title>
          <meta name="description" content={blog.description} />
          <meta property="og:title" content={blog.title} />
          <meta property="og:description" content={blog.description} />
          <meta property="og:type" content="article" />
          <meta name="author" content={blog.author} />
          {blog.tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
        </Helmet>
      )}
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <article className="container mx-auto container-padding max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <button 
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to all posts
            </button>
            
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm text-muted-foreground border-b border-border/40 pb-8">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-secondary rounded-full">
                   <User size={14} className="text-foreground" />
                </div>
                <span className="font-medium text-foreground">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-primary prose-img:rounded-xl prose-pre:bg-secondary/50 prose-pre:border prose-pre:border-border/50">
            <Markdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const {children, className, node, ref, ...rest} = props;
                  const match = /language-(\w+)/.exec(className || '');
                  
                  if (match && match[1] === 'mermaid') {
                    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                  }

                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={atomDark}
                      className="rounded-md !bg-secondary/50 !p-4"
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {blog.content}
            </Markdown>
          </div>
          
          {/* Footer of article */}
          <div className="mt-16 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-xs font-semibold px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                    #{tag}
                  </span>
                ))}
            </div>
            
            <button 
               className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
               onClick={() => {
                 navigator.clipboard.writeText(window.location.href);
                 // Toast could go here
               }}
            >
              <Share2 size={16} />
              Share this post
            </button>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
