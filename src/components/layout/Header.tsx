
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { PawPrint, Menu, X, User, Compass, BookOpen, Home } from 'lucide-react';
import CityBadge from '@/components/ui/CityBadge';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Header: React.FC = () => {
  const { city } = useCity();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Directory', path: '/directory', icon: Compass },
    { name: 'Info Hub', path: '/infohub', icon: BookOpen },
  ];

  // Determine if a nav item is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-in-out',
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm dark:bg-black/60'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-foreground font-medium text-lg hover:opacity-80 transition-opacity"
          >
            <PawPrint
              className={cn(
                'w-8 h-8 transition-colors duration-300',
                city === 'amsterdam' && 'text-amsterdam',
                city === 'dublin' && 'text-dublin',
                city === 'calgary' && 'text-calgary',
                !city && 'text-primary'
              )}
            />
            <span className="font-heading tracking-tight">PawConnect</span>
            {city && (
              <div className="hidden sm:block ml-2">
                <CityBadge city={city} size="sm" />
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 mx-1',
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                )}
              >
                <link.icon className="w-4 h-4 mr-2" />
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out-back',
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-sm border-t">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center px-3 py-3 rounded-md text-base font-medium transition-all duration-200',
                isActive(link.path)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted'
              )}
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.name}
            </Link>
          ))}
          {city && (
            <div className="px-3 py-3 flex items-center">
              <span className="text-muted-foreground mr-2">Your city:</span>
              <CityBadge city={city} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
