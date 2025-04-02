
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { ChevronDown, Paw } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Link as ScrollLink } from 'react-scroll';

const cityImages = {
  amsterdam: '/images/amsterdam-pets.jpg',
  dublin: '/images/dublin-pets.jpg',
  calgary: '/images/calgary-pets.jpg',
  null: '/images/default-pets.jpg'
};

const HeroSection = () => {
  const { city, cityColor } = useCity();
  const [pawPositions, setPawPositions] = useState<{ x: number; y: number; rotation: number; scale: number; delay: number }[]>([]);
  
  // Generate random paw positions for the floating animation
  useEffect(() => {
    const newPositions = Array.from({ length: 7 }).map(() => ({
      x: Math.random() * 100, // % for horizontal position
      y: Math.random() * 100, // % for vertical position
      rotation: Math.random() * 360, // rotation in degrees
      scale: 0.5 + Math.random() * 0.5, // scale between 0.5 and 1
      delay: Math.random() * 0.5, // delay for animation start
    }));
    
    setPawPositions(newPositions);
  }, []);

  // Get the correct hero image based on selected city
  const heroImage = cityImages[city || 'null'];
  
  // Dynamic city name for the subheading
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : 'your city';

  return (
    <section className="relative h-screen w-full overflow-hidden" aria-label="Hero section">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          filter: 'brightness(0.85)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/10" />
      
      {/* Floating Paw Prints */}
      {pawPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute opacity-70"
          style={{ 
            left: `${pos.x}%`, 
            top: `${pos.y}%`,
            zIndex: 1
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            scale: [0, pos.scale, pos.scale * 1.2],
            rotate: [0, pos.rotation],
            y: [0, -100],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5 + Math.random() * 5, 
            delay: pos.delay * 10,
            ease: "easeInOut"
          }}
        >
          <Paw className="text-white/80 w-6 h-6 sm:w-8 sm:h-8" />
        </motion.div>
      ))}
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.h1 
          className="text-white text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          PawConnect: Your Local Pet Community, Connected
        </motion.h1>
        
        <motion.p 
          className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-3xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Find local pet services, connect with nearby pet owners, and access {cityName}'s best pet resources in one place
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatedButton 
            className="w-full sm:w-auto px-8 py-3 text-base font-semibold bg-[#FF6B6B] hover:bg-[#FF5252] text-white rounded-md"
            hoverEffect="lift"
          >
            Join the Waitlist
          </AnimatedButton>
          
          <ScrollLink
            to="roadmap"
            smooth={true}
            duration={800}
            className="flex items-center gap-2 text-white hover:text-white/80 font-medium transition-colors cursor-pointer group"
          >
            Learn More
            <ChevronDown className="w-5 h-5 transform group-hover:translate-y-1 transition-transform" />
          </ScrollLink>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <p className="text-sm mb-2">Scroll to explore</p>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
