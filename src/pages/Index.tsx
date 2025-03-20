
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '@/context/CityContext';
import { useTransitionEffect } from '@/hooks/useTransitionEffect';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Users, Compass, BookOpen, PawPrint } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CitySelector from '@/components/city/CitySelector';
import AnimatedButton from '@/components/ui/AnimatedButton';

const Index = () => {
  const { city, cityColor } = useCity();
  const [showCitySelector, setShowCitySelector] = useState(!city);
  const featureEffect = useTransitionEffect({ initialVisibility: !showCitySelector });

  if (showCitySelector) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center py-12">
          <CitySelector onCitySelected={() => setShowCitySelector(false)} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="absolute inset-0 overflow-hidden z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" 
              }}
            />
            <div 
              className={cn(
                "absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t",
                city === 'amsterdam' && 'from-amsterdam/5',
                city === 'dublin' && 'from-dublin/5',
                city === 'calgary' && 'from-calgary/5',
                !city && 'from-primary/5'
              )}
            />
          </div>
          
          <div className="container mx-auto relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <PawPrint
                className={cn(
                  "w-16 h-16 mx-auto mb-6 transition-colors duration-300",
                  city === 'amsterdam' && 'text-amsterdam',
                  city === 'dublin' && 'text-dublin',
                  city === 'calgary' && 'text-calgary',
                  !city && 'text-primary'
                )}
              />
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight bg-clip-text">
                Connect with the pet community in <span className={cn(
                  city === 'amsterdam' && 'text-amsterdam',
                  city === 'dublin' && 'text-dublin',
                  city === 'calgary' && 'text-calgary',
                  !city && 'text-primary'
                )}>
                  {city ? city.charAt(0).toUpperCase() + city.slice(1) : 'Your City'}
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Discover local pet services, connect with fellow pet owners, and access city-specific resources all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <AnimatedButton 
                  className={cn(
                    city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
                    city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
                    city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
                    !city && 'bg-primary',
                    "px-8 py-3 text-lg"
                  )}
                  hoverEffect="lift"
                >
                  Create Profile
                </AnimatedButton>
                
                <AnimatedButton 
                  variant="outline" 
                  className="px-8 py-3 text-lg"
                  hoverEffect="scale"
                >
                  Explore Services
                </AnimatedButton>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need in one place</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                PawConnect brings together all the essential services and information for pet owners in your city.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {featureEffect.shouldRender && [
                {
                  icon: Users,
                  title: "Connect with Pet Owners",
                  description: "Create profiles for you and your pets, and connect with other pet owners in your area for playdates and advice.",
                  link: "/profile",
                  delay: 0
                },
                {
                  icon: Compass,
                  title: "Find Local Services",
                  description: "Discover and connect with veterinarians, groomers, pet shops, and other pet services in your neighborhood.",
                  link: "/directory",
                  delay: 0.1
                },
                {
                  icon: BookOpen,
                  title: "City-Specific Resources",
                  description: "Access information about local regulations, pet-friendly locations, and other resources unique to your city.",
                  link: "/infohub",
                  delay: 0.2
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-card border rounded-xl p-6 hover:shadow-md transition-all duration-300"
                  style={{
                    ...featureEffect.style,
                    transitionDelay: `${feature.delay}s`
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-lg mb-4 flex items-center justify-center",
                    city === 'amsterdam' && 'bg-amsterdam/10 text-amsterdam',
                    city === 'dublin' && 'bg-dublin/10 text-dublin',
                    city === 'calgary' && 'bg-calgary/10 text-calgary',
                    !city && 'bg-primary/10 text-primary'
                  )}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  
                  <Link 
                    to={feature.link}
                    className={cn(
                      "inline-flex items-center text-sm font-medium",
                      city === 'amsterdam' && 'text-amsterdam hover:text-amsterdam-dark',
                      city === 'dublin' && 'text-dublin hover:text-dublin-dark',
                      city === 'calgary' && 'text-calgary hover:text-calgary-dark',
                      !city && 'text-primary hover:text-primary/80'
                    )}
                  >
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Change City Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                {city ? 'Change your current city' : 'Select your city to get started'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {city 
                  ? `Currently viewing PawConnect for ${city.charAt(0).toUpperCase() + city.slice(1)}. Want to switch to a different city?`
                  : 'Choose your location to discover local pet services and connect with nearby pet owners.'
                }
              </p>
              
              <AnimatedButton 
                onClick={() => setShowCitySelector(true)}
                className={cn(
                  city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
                  city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
                  city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
                  !city && 'bg-primary hover:bg-primary/90',
                  "px-6 py-2"
                )}
                hoverEffect="scale"
              >
                {city ? 'Change City' : 'Select City'}
              </AnimatedButton>
            </div>
          </div>
          
          <div 
            className={cn(
              "absolute inset-0 opacity-5 blend-overlay",
              city === 'amsterdam' && 'bg-amsterdam',
              city === 'dublin' && 'bg-dublin',
              city === 'calgary' && 'bg-calgary',
              !city && 'bg-primary'
            )}
          />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
