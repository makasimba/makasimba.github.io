
import { Link } from 'react-router-dom';
import { BookOpen, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const postFiles = import.meta.glob('/src/pages/posts/*.md', { as: 'url', eager: true }) as Record<string, string>;
  const nnPostHref = postFiles['/src/pages/posts/recursively-optimizing-neural-networks.md'];
  const projectsFromSrc = import.meta.glob('/src/pages/projects/*.md', { as: 'url', eager: true }) as Record<string, string>;
  const projectsFromAlt = import.meta.glob('/src/projects/*.md', { as: 'url', eager: true }) as Record<string, string>;
  const projectHref = Object.values({ ...projectsFromSrc, ...projectsFromAlt })[0] || '/projects';
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="text-center mb-5">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Software Engineer
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          I build software and write about AI, science, and ideas worth chasing. 
          This site hosts my projects, and posts.
        </p>
        <div className="flex justify-center gap-2">
          <Button asChild className="bg-sky-600 hover:bg-sky-700">
            <Link to="/blog">
              <BookOpen className="w-4 h-4 mr-2" />
              Read My Posts
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/projects">
              <Archive className="w-4 h-4 mr-2" />
              View Projects
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div>
          <h2 className="font-playfair text-3xl font-bold mb-4">Side Posts</h2>
          <div className="space-y-4">
            <a
              href={nnPostHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-lg border border-gray-200 hover:border-sky-300 transition-colors cursor-pointer"
            >
              <h3 className="font-bold text-xl mb-2">Optimizing Neural Networks Recursively</h3>
              <p className="text-gray-600 mb-4">A deep dive into implementing forward and backward propagation.</p>
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-playfair text-3xl font-bold mb-4">Side Projects</h2>
          <div className="space-y-4">
            <a
              href={projectHref}
              target={projectHref.startsWith('http') ? '_blank' : undefined}
              rel={projectHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="block p-6 rounded-lg border border-gray-200 hover:border-sky-300 transition-colors cursor-pointer"
            >
              <h3 className="font-bold text-xl mb-2">Online Store App</h3>
              <p className="text-gray-600 mb-4">An app for empowering small-scale sub-saharan farmers like myself.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
