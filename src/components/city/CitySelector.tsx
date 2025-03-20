
import React, { useState } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { cityDescriptions } from '@/lib/mockData';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface CitySelectorProps {
  onCitySelected?: () => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ onCitySelected }) => {
  const { city, setCity } = useCity();
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleCitySelect = (cityName: 'amsterdam' | 'dublin' | 'calgary') => {
    setSelectedCity(cityName);
    setCity(cityName);
    
    if (onCitySelected) {
      setTimeout(() => {
        onCitySelected();
      }, 500);
    }
  };

  // Style for the city card based on selection state
  const cityCardStyle = (cityName: string) => cn(
    'relative overflow-hidden rounded-xl transition-all duration-500 ease-in-out-back cursor-pointer group',
    'border shadow-sm hover:shadow-md hover:-translate-y-1',
    selectedCity === cityName ? 'ring-2 scale-105' : 'hover:ring-1',
    cityName === 'amsterdam' && 'border-amsterdam/30 hover:border-amsterdam/60 ring-amsterdam',
    cityName === 'dublin' && 'border-dublin/30 hover:border-dublin/60 ring-dublin',
    cityName === 'calgary' && 'border-calgary/30 hover:border-calgary/60 ring-calgary',
    selectedCity && selectedCity !== cityName ? 'opacity-50 scale-95' : ''
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Choose Your City</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select your location to discover local pet services, connect with nearby pet owners,
          and access city-specific resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {['amsterdam', 'dublin', 'calgary'].map((cityName) => {
          const cityData = cityDescriptions[cityName as keyof typeof cityDescriptions];
          
          return (
            <div
              key={cityName}
              className={cityCardStyle(cityName)}
              onMouseEnter={() => setHoveredCity(cityName)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() => handleCitySelect(cityName as 'amsterdam' | 'dublin' | 'calgary')}
            >
              {/* City Image with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${cityData.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* City Name Overlay */}
                <div className="absolute bottom-0 left-0 p-4 w-full">
                  <h3 className="text-white text-xl font-bold">{cityData.title}</h3>
                  <p className="text-white/80 text-sm">{cityData.subtitle}</p>
                </div>
                
                {/* Selection Indicator */}
                {selectedCity === cityName && (
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                    <CheckCircle2 className={cn(
                      'w-5 h-5',
                      cityName === 'amsterdam' && 'text-amsterdam',
                      cityName === 'dublin' && 'text-dublin',
                      cityName === 'calgary' && 'text-calgary'
                    )} />
                  </div>
                )}
              </div>
              
              {/* City Description */}
              <div className="p-4">
                <p className="text-sm text-foreground/80 mb-4 h-20 overflow-hidden">
                  {cityData.description}
                </p>
                
                {/* City Features */}
                <ul className="space-y-2 mb-4">
                  {cityData.features.map((feature, index) => (
                    <li key={index} className="text-xs flex items-start">
                      <span className={cn(
                        'inline-block w-1.5 h-1.5 rounded-full mt-1.5 mr-2',
                        cityName === 'amsterdam' && 'bg-amsterdam',
                        cityName === 'dublin' && 'bg-dublin',
                        cityName === 'calgary' && 'bg-calgary',
                      )}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Select Button */}
                <AnimatedButton
                  className={cn(
                    'w-full justify-center',
                    cityName === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
                    cityName === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
                    cityName === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
                  )}
                  hoverEffect="lift"
                >
                  {selectedCity === cityName ? 'Selected' : 'Select City'}
                </AnimatedButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CitySelector;
