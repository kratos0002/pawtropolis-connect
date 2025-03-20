
import React from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { Heart, PawPrint, Github, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const { city, cityColor } = useCity();

  // Determine footer color accent based on selected city
  const footerAccentClass = cn(
    'border-t-2',
    city === 'amsterdam' && 'border-amsterdam',
    city === 'dublin' && 'border-dublin',
    city === 'calgary' && 'border-calgary',
    !city && 'border-primary'
  );

  return (
    <footer className={cn('bg-muted/30 mt-auto', footerAccentClass)}>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <PawPrint
                className={cn(
                  'w-8 h-8 transition-colors duration-300',
                  city === 'amsterdam' && 'text-amsterdam',
                  city === 'dublin' && 'text-dublin',
                  city === 'calgary' && 'text-calgary',
                  !city && 'text-primary'
                )}
              />
              <span className="font-heading tracking-tight text-xl">PawConnect</span>
            </Link>
            <p className="text-muted-foreground text-sm text-center md:text-left">
              Building bridges between pet owners, service providers, and communities
              in Amsterdam, Dublin, and Calgary.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col items-center md:items-start space-y-2">
              <Link
                to="/profile"
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm"
              >
                Your Profile
              </Link>
              <Link
                to="/directory"
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm"
              >
                Service Directory
              </Link>
              <Link
                to="/infohub"
                className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm"
              >
                Information Hub
              </Link>
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors duration-200">
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Stay updated with our latest news and community events.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground order-2 sm:order-1 mt-2 sm:mt-0">
            &copy; {new Date().getFullYear()} PawConnect. All rights reserved.
          </p>
          <p className="text-sm flex items-center order-1 sm:order-2">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for pets everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
