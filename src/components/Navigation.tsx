
import { Link } from 'react-router-dom';
import { Home, BookOpen, User, Archive } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center font-playfair text-xl font-bold text-gray-900">
              <img src="profile-avatar.png" alt="Avatar" className="w-8 h-8"/>
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <NavLink to="/" icon={<Home className="w-4 h-4" />} text="Home" />
            <NavLink to="/about" icon={<User className="w-4 h-4" />} text="About" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 text-gray-600 hover:text-sky-600 transition-colors"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navigation;
