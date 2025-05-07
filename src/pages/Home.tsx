
import { Link } from 'react-router-dom';
import { BookOpen, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="text-center mb-5">
        <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Software Engineer
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          I build software and write about AI, science, and ideas worth chasing. 
          This site hosts my projects, writing, and research notes.
        </p>
        <div className="flex justify-center gap-2">
          <Button asChild className="bg-green-600 hover:bg-green-700">
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
          <h2 className="font-playfair text-3xl font-bold mb-4">Side Posts</h2>
          <div className="space-y-4">
            <article className="p-6 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
              <h3 className="font-bold text-xl mb-2">Optimizing Neural Networks Recursively</h3>
              <p className="text-gray-600 mb-4">A deep dive into implementing forward and backward propagation.</p>
              <Link to="/blog" className="text-green-600 hover:text-green-700 font-medium">
                Read more →
              </Link>
            </article>
          </div>
        </div>
        <div>
          <h2 className="font-playfair text-3xl font-bold mb-4">Side Projects</h2>
          <div className="space-y-4">
            <article className="p-6 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
              <h3 className="font-bold text-xl mb-2">Online Store App</h3>
              <p className="text-gray-600 mb-4">A full-stack application built with React and Node.js for empowering small-scale subsaharan farmers...</p>
              <Link to="/projects" className="text-green-600 hover:text-green-700 font-medium">
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
