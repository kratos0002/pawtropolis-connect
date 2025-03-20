
import React, { useState } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { MapPin, Phone, Globe, Mail, Star } from 'lucide-react';
import CityBadge from '@/components/ui/CityBadge';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface ServiceCardProps {
  id: number;
  name: string;
  category: number;
  categoryName: string;
  city: string;
  address: string;
  phone: string;
  website: string;
  email: string;
  rating: number;
  image: string;
  description: string;
  tags: string[];
  icon: React.ElementType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  name,
  category,
  categoryName,
  city,
  address,
  phone,
  website,
  email,
  rating,
  image,
  description,
  tags,
  icon: Icon,
}) => {
  const { cityColor } = useCity();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Colors based on city
  const cityTextClass = cn(
    city === 'amsterdam' && 'text-amsterdam',
    city === 'dublin' && 'text-dublin',
    city === 'calgary' && 'text-calgary'
  );

  const cityBgClass = cn(
    city === 'amsterdam' && 'bg-amsterdam',
    city === 'dublin' && 'bg-dublin',
    city === 'calgary' && 'bg-calgary'
  );

  const cityLightBgClass = cn(
    city === 'amsterdam' && 'bg-amsterdam/10',
    city === 'dublin' && 'bg-dublin/10',
    city === 'calgary' && 'bg-calgary/10'
  );

  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden border shadow-sm bg-card transition-all duration-500",
        "hover:shadow-md"
      )}
    >
      <div className="md:flex">
        {/* Service Image */}
        <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
          <div 
            className={cn(
              "w-full h-full bg-muted flex items-center justify-center",
              !isImageLoaded && "animate-pulse"
            )}
          >
            {!isImageLoaded && <Icon className="w-12 h-12 opacity-20" />}
            
            <img 
              src={image} 
              alt={name} 
              className={cn(
                "w-full h-full object-cover transition-transform duration-700 ease-out",
                "group-hover:scale-105",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <div className={cn(
              "px-2 py-1 rounded-full text-white text-xs font-medium flex items-center shadow-sm",
              cityBgClass
            )}>
              <Icon className="w-3 h-3 mr-1" />
              {categoryName}
            </div>
          </div>
          
          {/* Rating Badge */}
          <div className="absolute bottom-3 right-3">
            <div className="px-2 py-1 rounded-full bg-white/90 text-foreground text-xs font-medium flex items-center shadow-sm backdrop-blur-sm">
              <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </div>
          </div>
        </div>
        
        {/* Service Info */}
        <div className="p-4 md:w-2/3 flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold">{name}</h3>
              <CityBadge city={city as 'amsterdam' | 'dublin' | 'calgary'} size="sm" />
            </div>
            
            <p className={cn(
              "text-sm text-foreground/80 mb-4 transition-all duration-300",
              expanded ? "line-clamp-none" : "line-clamp-2"
            )}>
              {description}
            </p>
            
            {!expanded && (
              <button 
                onClick={() => setExpanded(true)}
                className={cn(
                  "text-xs font-medium mb-3", 
                  cityTextClass,
                  "hover:underline focus:outline-none"
                )}
              >
                Read more
              </button>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className={cn(
                    "px-2 py-0.5 rounded text-xs",
                    cityLightBgClass
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Contact Details */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{address}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{website}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <AnimatedButton 
              className={cn(
                cityBgClass,
                "flex-1 justify-center"
              )}
              hoverEffect="lift"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call
            </AnimatedButton>
            <AnimatedButton 
              variant="outline" 
              className="flex-1 justify-center"
              hoverEffect="scale"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
