import { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';

interface PostFrontmatter {
  title?: string;
  date?: string;
  description?: string;
  tags?: string[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [frontmatter, setFrontmatter] = useState<PostFrontmatter>({});
  const [loading, setLoading] = useState(true);
  const [styles, setStyles] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Load all posts once (eager loading means this is available at build time)
  const postModules = useMemo(() => {
    return import.meta.glob('/src/pages/posts/*.html', { as: 'raw', eager: true }) as Record<string, string>;
  }, []);

  useEffect(() => {
    try {
      if (!slug) {
        setLoading(false);
        return;
      }

      // Find the post that matches the slug
      const postPath = Object.keys(postModules).find(path => 
        path.includes(`${slug}.html`)
      );
      
      if (!postPath) {
        setLoading(false);
        return;
      }
      
      const rawHtml = postModules[postPath];
      
      // Parse HTML to extract metadata and content
      const parser = new DOMParser();
      const doc = parser.parseFromString(rawHtml, 'text/html');
      
      // Extract metadata from JSON script tag
      const metadataScript = doc.getElementById('post-metadata');
      if (metadataScript && metadataScript.textContent) {
        try {
          const metadata = JSON.parse(metadataScript.textContent);
          setFrontmatter(metadata);
        } catch (e) {
          console.error('Error parsing metadata:', e);
        }
      }
      
      // Extract styles
      const styleTag = doc.querySelector('style');
      if (styleTag) {
        setStyles(styleTag.innerHTML);
      }
      
      // Extract and add Prism CSS if present
      const prismLink = doc.querySelector('link[href*="prism"]');
      if (prismLink) {
        const href = prismLink.getAttribute('href');
        if (href && !document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          document.head.appendChild(link);
        }
      }
      
      // Extract article content (skip the header since we render it separately)
      const article = doc.querySelector('article');
      if (article) {
        setHtmlContent(article.innerHTML);
      } else {
        // Fallback: extract container content but skip header
        const container = doc.querySelector('.container');
        if (container) {
          const header = container.querySelector('header');
          if (header) {
            header.remove();
          }
          setHtmlContent(container.innerHTML);
        } else {
          // Last resort: extract body content
          const body = doc.body;
          setHtmlContent(body.innerHTML);
        }
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  }, [slug, postModules]);

  // Initialize Prism.js for syntax highlighting after content is rendered
  useEffect(() => {
    if (htmlContent && contentRef.current) {
      // Load Prism.js dynamically if not already loaded
      if (typeof window !== 'undefined' && !(window as any).Prism) {
        const script1 = document.createElement('script');
        script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js';
        script1.onload = () => {
          const script2 = document.createElement('script');
          script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js';
          script2.onload = () => {
            if ((window as any).Prism && contentRef.current) {
              (window as any).Prism.highlightAllUnder(contentRef.current);
            }
          };
          document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
      } else if ((window as any).Prism && contentRef.current) {
        // Use highlightAllUnder if available, otherwise highlightAll
        if ((window as any).Prism.highlightAllUnder) {
          (window as any).Prism.highlightAllUnder(contentRef.current);
        } else {
          (window as any).Prism.highlightAll();
        }
      }
    }
  }, [htmlContent]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!htmlContent) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center text-gray-600">Post not found</div>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      {styles && (
        <style dangerouslySetInnerHTML={{ __html: styles }} />
      )}
      <div className="blog-post-container">
        <div className="blog-post-content">
          <Link to="/blog" className="blog-post-back-link">
            ← Back to Blog
          </Link>
          {frontmatter.title && (
            <header className="mb-12">
              <h1 className="blog-post-title">{frontmatter.title}</h1>
              {frontmatter.date && (
                <time className="blog-post-date" dateTime={frontmatter.date}>
                  {formatDate(frontmatter.date)}
                </time>
              )}
            </header>
          )}

          <div 
            ref={contentRef}
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogPost;

