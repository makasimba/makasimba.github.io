import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Mail, GitBranch, Link2, Globe } from 'lucide-react';

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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
