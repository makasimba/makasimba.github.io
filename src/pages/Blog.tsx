import { Link } from 'react-router-dom';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type PostItem = {
  title: string;
  href: string;
};

function formatTitleFromPath(path: string): string {
  const file = path.split('/').pop() || path;
  const name = file.replace(/\.md$/i, '').replace(/[-_]+/g, ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const Blog = () => {
  const postFiles = import.meta.glob('/src/pages/posts/*.md', { as: 'url', eager: true }) as Record<string, string>;
  const posts: PostItem[] = Object.entries(postFiles)
    .map(([path, href]) => ({ title: formatTitleFromPath(path), href }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-playfair text-5xl font-bold text-gray-900">Blog</h1>
      </div>

      {posts.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-xl">No posts yet</CardTitle>
            <CardDescription>
              Add markdown files to <code className="px-1 py-0.5 bg-gray-100 rounded">src/pages/posts</code> and they will appear here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.href} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
