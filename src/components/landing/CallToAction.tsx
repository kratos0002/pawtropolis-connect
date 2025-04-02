
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { ChevronDown } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { toast } from '@/hooks/use-toast';

const cityImages = {
  amsterdam: '/images/amsterdam-landmark.jpg',
  dublin: '/images/dublin-landmark.jpg',
  calgary: '/images/calgary-landmark.jpg',
  null: '/images/default-landmark.jpg'
};

const CallToAction = () => {
  const { city } = useCity();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Get the correct background image based on selected city
  const backgroundImage = cityImages[city || 'null'];
  
  // Dynamic city name for the heading
  const cityName = city ? city.charAt(0).toUpperCase() + city.slice(1) : 'Your City';
  
  const handleEarlyAccess = () => {
    toast({
      title: "You're on the list!",
      description: `We'll notify you when PawConnect launches in ${cityName}.`,
      variant: "default",
    });
  };
  
  return (
    <section 
      ref={ref}
      className="relative py-20 overflow-hidden" 
      aria-label="Call to action section"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          filter: 'brightness(0.6)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Join {cityName}'s Pet Community Today
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Be among the first to experience PawConnect when we launch
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedButton 
              onClick={handleEarlyAccess}
              className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-10 py-3 text-lg font-medium"
              hoverEffect="scale"
            >
              Get Early Access
            </AnimatedButton>
            
            <p className="flex items-center justify-center gap-2 mt-4 text-white/80 text-sm">
              <ChevronDown className="w-4 h-4" />
              Limited spots available for beta testers
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
