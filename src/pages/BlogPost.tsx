import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

interface PostFrontmatter {
  title?: string;
  date?: string;
  description?: string;
  tags?: string[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState<string>('');
  const [frontmatter, setFrontmatter] = useState<PostFrontmatter>({});
  const [loading, setLoading] = useState(true);

  // Load all posts once (eager loading means this is available at build time)
  const postModules = useMemo(() => {
    return import.meta.glob('/src/pages/posts/*.md', { as: 'raw', eager: true }) as Record<string, string>;
  }, []);

  useEffect(() => {
    try {
      if (!slug) {
        setLoading(false);
        return;
      }

      // Find the post that matches the slug
      const postPath = Object.keys(postModules).find(path => 
        path.includes(`${slug}.md`)
      );
      
      if (!postPath) {
        setLoading(false);
        return;
      }
      
      const rawContent = postModules[postPath];
      
      // Parse frontmatter
      const { data, content: markdownContent } = matter(rawContent);
      setFrontmatter(data as PostFrontmatter);
      setContent(markdownContent);
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  }, [slug, postModules]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!content) {
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
    <article className="blog-post-container">
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

        <div className="blog-post-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="blog-post-h1" {...props} />,
              h2: ({ node, ...props }) => <h2 className="blog-post-h2" {...props} />,
              h3: ({ node, ...props }) => <h3 className="blog-post-h3" {...props} />,
              h4: ({ node, ...props }) => <h4 className="blog-post-h4" {...props} />,
              p: ({ node, ...props }) => <p className="blog-post-p" {...props} />,
              ul: ({ node, ...props }) => <ul className="blog-post-ul" {...props} />,
              ol: ({ node, ...props }) => <ol className="blog-post-ol" {...props} />,
              li: ({ node, ...props }) => <li className="blog-post-li" {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className="blog-post-blockquote" {...props} />,
              code: ({ node, inline, ...props }: any) => 
                inline ? (
                  <code className="blog-post-inline-code" {...props} />
                ) : (
                  <code className="blog-post-code" {...props} />
                ),
              pre: ({ node, ...props }) => <pre className="blog-post-pre" {...props} />,
              a: ({ node, ...props }) => <a className="blog-post-link" {...props} />,
              hr: ({ node, ...props }) => <hr className="blog-post-hr" {...props} />,
              img: ({ node, ...props }) => <img className="blog-post-img" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;

