import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getBlogBySlug } from '../lib/blog';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
          <title>{blog.title} | Manish Dash Sharma</title>
          <meta name="description" content={blog.description} />
          <meta name="author" content={blog.author} />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href={`https://manishdashsharma.com/blogs/${slug}`} />

          {/* Open Graph */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://manishdashsharma.com/blogs/${slug}`} />
          <meta property="og:title" content={blog.title} />
          <meta property="og:description" content={blog.description} />
          <meta property="og:image" content="https://manishdashsharma.com/manish.jpeg" />
          <meta property="og:site_name" content="Manish Dash Sharma" />
          <meta property="article:author" content={blog.author} />
          <meta property="article:published_time" content={blog.date} />
          {blog.tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={`https://manishdashsharma.com/blogs/${slug}`} />
          <meta name="twitter:title" content={blog.title} />
          <meta name="twitter:description" content={blog.description} />
          <meta name="twitter:image" content="https://manishdashsharma.com/manish.jpeg" />
          <meta name="twitter:creator" content="@manishdsharma08" />

          {/* JSON-LD Article Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": blog.title,
              "description": blog.description,
              "author": {
                "@type": "Person",
                "name": blog.author,
                "url": "https://manishdashsharma.com"
              },
              "publisher": {
                "@type": "Person",
                "name": "Manish Dash Sharma",
                "url": "https://manishdashsharma.com"
              },
              "datePublished": blog.date,
              "dateModified": blog.date,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://manishdashsharma.com/blogs/${slug}`
              },
              "keywords": blog.tags.join(", "),
              "image": "https://manishdashsharma.com/manish.jpeg"
            })}
          </script>
        </Helmet>
      )}
      <Navbar />
      
      <main className="flex-grow pt-28 pb-24">
        <article className="container mx-auto container-padding max-w-4xl">
          {/* Header */}
          <header className="mb-16">
            <button
              onClick={() => navigate('/blogs')}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10 group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to all posts
            </button>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-[1.15] text-foreground">
              {blog.title}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
              {blog.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground pt-6 border-t border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-primary/10 rounded-full">
                   <User size={14} className="text-primary" />
                </div>
                <span className="font-medium text-foreground">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-muted-foreground/70" />
                <span>{blog.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-muted-foreground/70" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </header>
          
          {/* Content */}
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/30 prose-h2:pb-3
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
            prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6
            prose-li:text-muted-foreground prose-li:my-2
            prose-ul:my-6 prose-ol:my-6
            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:bg-secondary/30 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-muted-foreground
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-primary prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
            prose-hr:border-border/50 prose-hr:my-12
            prose-table:my-8 prose-th:bg-secondary/50 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2 prose-td:border-border/30
            prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-6">
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
          <footer className="mt-20 pt-10 border-t border-border/40">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-3 py-1.5 bg-secondary/80 text-secondary-foreground rounded-full border border-border/30 hover:bg-secondary transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-full hover:bg-secondary/50"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
              >
                <Share2 size={16} />
                Share this post
              </button>
            </div>
          </footer>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
