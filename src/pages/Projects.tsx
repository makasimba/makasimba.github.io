import { ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type ExternalProject = {
  title: string;
  description: string;
  url: string;
};

const PROJECTS: ExternalProject[] = [
  {
    title: 'Toolminda',
    description: 'Operations toolkit for field teams and small businesses. Fast, simple, reliable.',
    url: 'https://www.toolminda.com',
  },
  // Add more projects here
];

const Projects = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h1 className="font-playfair text-5xl font-bold text-gray-900">Projects</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((proj) => (
          <a
            key={proj.url}
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  {proj.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">{proj.description}</CardDescription>
              </CardHeader>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
