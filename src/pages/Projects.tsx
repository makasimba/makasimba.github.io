import { Link } from 'react-router-dom';
import { Archive, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

type ProjectItem = {
  title: string;
  href: string;
};

function formatTitleFromPath(path: string): string {
  const file = path.split('/').pop() || path;
  const name = file.replace(/\.md$/i, '').replace(/[-_]+/g, ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const Projects = () => {
  const mdFromSrc = import.meta.glob('/src/pages/projects/*.md', { as: 'url', eager: true }) as Record<string, string>;
  const mdFromAlt = import.meta.glob('/src/projects/*.md', { as: 'url', eager: true }) as Record<string, string>;
  const files = { ...mdFromSrc, ...mdFromAlt };
  const projects: ProjectItem[] = Object.entries(files)
    .map(([path, href]) => ({ title: formatTitleFromPath(path), href }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-playfair text-5xl font-bold text-gray-900">Projects</h1>
      </div>

      {projects.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <Card key={proj.href} className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl line-clamp-2">{proj.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Link
                to={proj.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sky-700 hover:text-sky-800 font-medium"
              >
                View project
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <Card key={proj.href} className="group hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2">{proj.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  to={proj.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sky-700 hover:text-sky-800 font-medium"
                >
                  View project
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
