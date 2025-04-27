
import { Link } from 'react-router-dom';
import { BookOpen, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <section className="text-center mb-20">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Software Engineer
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          I build exceptional websites, applications, and everything in between.
          Welcome to my corner of the internet where I share my thoughts and experiences.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/blog">
              <BookOpen className="w-4 h-4 mr-2" />
              Read My Blog
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
          <h2 className="font-playfair text-3xl font-bold mb-4">Latest Posts</h2>
          <div className="space-y-4">
            <article className="p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
              <h3 className="font-bold text-xl mb-2">Understanding React Hooks</h3>
              <p className="text-gray-600 mb-4">A deep dive into React's hooks system and how to use them effectively...</p>
              <Link to="/blog" className="text-purple-600 hover:text-purple-700 font-medium">
                Read more →
              </Link>
            </article>
          </div>
        </div>
        <div>
          <h2 className="font-playfair text-3xl font-bold mb-4">Featured Projects</h2>
          <div className="space-y-4">
            <article className="p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
              <h3 className="font-bold text-xl mb-2">Project Manager App</h3>
              <p className="text-gray-600 mb-4">A full-stack application built with React and Node.js for managing projects...</p>
              <Link to="/projects" className="text-purple-600 hover:text-purple-700 font-medium">
                View project →
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
