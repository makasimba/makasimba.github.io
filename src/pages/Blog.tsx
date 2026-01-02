import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

type PostItem = {
  title: string;
  slug: string;
  date?: string;
  description?: string;
};

function getSlugFromPath(path: string): string {
  const file = path.split('/').pop() || path;
  return file.replace(/\.html$/i, '');
}

const Blog = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Get all HTML files
        const postModules = import.meta.glob('/src/pages/posts/*.html', { as: 'raw', eager: true }) as Record<string, string>;
        
        const postsList: PostItem[] = await Promise.all(
          Object.entries(postModules).map(async ([path, htmlContent]) => {
            const slug = getSlugFromPath(path);
            
            // Parse HTML to extract metadata
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            
            // Extract metadata from JSON script tag
            const metadataScript = doc.getElementById('post-metadata');
            let metadata: any = {};
            
            if (metadataScript && metadataScript.textContent) {
              try {
                metadata = JSON.parse(metadataScript.textContent);
              } catch (e) {
                console.error('Error parsing metadata for', slug, e);
              }
            }
            
            return {
              title: (metadata.title as string) || slug,
              slug,
              date: metadata.date as string,
              description: metadata.description as string,
            };
          })
        );

        // Sort by date (newest first)
        postsList.sort((a, b) => {
          if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          }
          return 0;
        });

        setPosts(postsList);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-playfair text-5xl font-bold text-gray-900">Blog</h1>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading posts...</div>
      ) : posts.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-xl">No posts yet</CardTitle>
            <CardDescription>
              Add HTML files to <code className="px-1 py-0.5 bg-gray-100 rounded">src/pages/posts</code> and they will appear here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="block"
            >
              <Card className="group hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  {post.description && (
                    <CardDescription className="line-clamp-2 mt-2">
                      {post.description}
                    </CardDescription>
                  )}
                  {post.date && (
                    <CardDescription className="mt-2 text-xs">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </CardDescription>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
