
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { PawPrint, Home, ArrowLeft } from "lucide-react";
import AnimatedButton from '@/components/ui/AnimatedButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
  const location = useLocation();
  const { city } = useCity();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="text-center max-w-md px-4">
          <div className="mb-6 flex justify-center">
            <PawPrint
              className={cn(
                'w-24 h-24 transition-colors duration-300 opacity-30',
                city === 'amsterdam' && 'text-amsterdam',
                city === 'dublin' && 'text-dublin',
                city === 'calgary' && 'text-calgary',
                !city && 'text-primary'
              )}
            />
          </div>
          
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! We couldn't find this page. It seems this paw print led to a dead end.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <AnimatedButton 
              className={cn(
                city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
                city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
                city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
                !city && 'bg-primary'
              )}
              asChild
              hoverEffect="lift"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </AnimatedButton>
            
            <AnimatedButton 
              variant="outline" 
              onClick={() => window.history.back()}
              hoverEffect="scale"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </AnimatedButton>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
