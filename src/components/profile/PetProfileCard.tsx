
import React, { useState } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { Cake, Heart, Edit2 } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface PetProfileCardProps {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
  bio: string;
  image: string;
  icon: React.ElementType;
  isOwner?: boolean;
}

const PetProfileCard: React.FC<PetProfileCardProps> = ({
  id,
  name,
  type,
  breed,
  age,
  bio,
  image,
  icon: Icon,
  isOwner = false,
}) => {
  const { city, cityColor } = useCity();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Determine color accents based on city
  const cityAccentClass = cn(
    city === 'amsterdam' && 'text-amsterdam border-amsterdam',
    city === 'dublin' && 'text-dublin border-dublin',
    city === 'calgary' && 'text-calgary border-calgary',
    !city && 'text-primary border-primary'
  );

  const bgAccentClass = cn(
    city === 'amsterdam' && 'bg-amsterdam',
    city === 'dublin' && 'bg-dublin',
    city === 'calgary' && 'bg-calgary',
    !city && 'bg-primary'
  );

  const lightBgAccentClass = cn(
    city === 'amsterdam' && 'bg-amsterdam/10',
    city === 'dublin' && 'bg-dublin/10',
    city === 'calgary' && 'bg-calgary/10',
    !city && 'bg-primary/10'
  );

  return (
    <div 
      className="rounded-xl overflow-hidden border shadow-sm bg-card transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pet Image */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className={cn(
            "w-full h-full bg-muted flex items-center justify-center",
            !isImageLoaded && "animate-pulse"
          )}
        >
          {!isImageLoaded && <Icon className={cn("w-12 h-12 opacity-20", cityAccentClass)} />}
          
          <img 
            src={image} 
            alt={name} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 ease-out",
              isHovered && "scale-105",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className={cn(
            "px-2 py-1 rounded-full text-white text-xs font-medium flex items-center shadow-sm",
            bgAccentClass
          )}>
            <Icon className="w-3 h-3 mr-1" />
            {type}
          </div>
        </div>
        
        {/* Edit Button (for owners) */}
        {isOwner && (
          <div className="absolute top-3 right-3">
            <button 
              className="p-1.5 rounded-full bg-white/80 hover:bg-white text-foreground shadow-sm backdrop-blur-sm transition-colors"
              aria-label="Edit pet profile"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {/* Pet Info */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">{name}</h3>
          <div className="flex items-center">
            <Cake className="w-4 h-4 text-muted-foreground mr-1" />
            <span className="text-sm text-muted-foreground">{age} year{age !== 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <div className={cn("px-2 py-1 rounded text-xs inline-block mb-3", lightBgAccentClass)}>
          {breed}
        </div>
        
        <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{bio}</p>
        
        {!isOwner && (
          <AnimatedButton 
            variant="outline" 
            className="w-full justify-center group"
            hoverEffect="none"
          >
            <Heart className={cn(
              "w-4 h-4 mr-2 transition-colors",
              cityAccentClass,
              "group-hover:text-red-500 group-hover:fill-red-500",
            )} />
            Favorite
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default PetProfileCard;
