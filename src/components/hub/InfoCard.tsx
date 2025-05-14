
import React, { useState } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { CalendarDays, Bookmark, Share2, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import CityBadge from '@/components/ui/CityBadge';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface InfoCardProps {
  id: number;
  title: string;
  city: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  icon: React.ElementType;
  onClick?: () => void;
  trending?: boolean;
  views?: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  id,
  title,
  city,
  category,
  image,
  excerpt,
  content,
  date,
  tags,
  icon: Icon,
  onClick,
  trending = false,
  views = 0
}) => {
  const { cityColor } = useCity();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const parsedDate = new Date(date);
  const formattedDate = format(parsedDate, 'MMM d, yyyy');

  // Colors based on city
  const cityAccentClass = cn(
    city === 'amsterdam' && 'text-amsterdam border-amsterdam',
    city === 'dublin' && 'text-dublin border-dublin',
    city === 'calgary' && 'text-calgary border-calgary',
    !city && 'text-primary border-primary'
  );

  const cityBgClass = cn(
    city === 'amsterdam' && 'bg-amsterdam',
    city === 'dublin' && 'bg-dublin',
    city === 'calgary' && 'bg-calgary',
    !city && 'bg-primary'
  );

  const cityLightBgClass = cn(
    city === 'amsterdam' && 'bg-amsterdam/10',
    city === 'dublin' && 'bg-dublin/10',
    city === 'calgary' && 'bg-calgary/10',
    !city && 'bg-primary/10'
  );

  const toggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const shareArticle = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement sharing functionality
    alert('Sharing functionality would be implemented here');
  };

  return (
    <div 
      className={cn(
        "rounded-xl overflow-hidden border shadow-sm bg-card transition-all duration-300",
        "hover:shadow-md cursor-pointer h-full flex flex-col",
        trending && "ring-2 ring-amber-400/30"
      )}
      onClick={onClick}
    >
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        <div 
          className={cn(
            "w-full h-full bg-muted flex items-center justify-center",
            !isImageLoaded && "animate-pulse"
          )}
        >
          {!isImageLoaded && <Icon className="w-12 h-12 opacity-20" />}
          
          <img 
            src={image} 
            alt={title} 
            className={cn(
              "w-full h-full object-cover transition-transform duration-700 ease-out",
              "hover:scale-105",
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
            {category}
          </div>
        </div>
        
        {/* City Badge */}
        <div className="absolute top-3 right-3">
          <CityBadge city={city as 'amsterdam' | 'dublin' | 'calgary'} size="sm" />
        </div>
        
        {/* Trending Badge */}
        {trending && (
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center px-2 py-1 bg-amber-400/90 text-white text-xs font-medium rounded-full shadow-sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </div>
          </div>
        )}
      </div>
      
      {/* Article Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
          
          <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{excerpt}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
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
        </div>
        
        <div className="pt-3 mt-auto border-t border-border flex items-center justify-between">
          <div className="flex items-center text-muted-foreground text-xs">
            <CalendarDays className="w-3 h-3 mr-1" />
            {formattedDate}
          </div>
          
          <div className="flex items-center space-x-1">
            <button 
              onClick={toggleBookmark}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                "text-muted-foreground hover:text-foreground",
                isBookmarked && cityAccentClass
              )}
              aria-label="Bookmark article"
            >
              <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
            </button>
            
            <button 
              onClick={shareArticle}
              className="p-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
