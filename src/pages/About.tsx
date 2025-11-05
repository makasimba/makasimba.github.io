import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, GitBranch, Link2, Globe } from 'lucide-react';

const XIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M18.146 2.25h3.09l-6.75 7.72 7.93 11.78h-6.22l-4.87-6.37-5.57 6.37H3.66l7.23-8.26L3 2.25h6.36l4.39 5.84 4.396-5.84Zm-1.08 17.61h1.71L7.02 3.99H5.21l11.856 15.87Z"/>
  </svg>
);

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h1 className="font-playfair text-5xl font-bold text-gray-900">About</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Links</CardTitle>
              <CardDescription>Find me online</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Button asChild variant="outline" className="justify-start">
                <a href="https://github.com/makasimba/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4" /> GitHub
                </a>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <a href="https://www.linkedin.com/in/makasimba/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Link2 className="w-4 h-4" /> LinkedIn
                </a>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <a href="https://makasimba.github.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Website
                </a>
              </Button>
              <Button asChild variant="outline" className="justify-start">
                <a href="https://x.com/__Makaa" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <XIcon className="w-4 h-4" /> X
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
