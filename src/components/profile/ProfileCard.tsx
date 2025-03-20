
import React from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { MapPin, Mail, Calendar, Edit2 } from 'lucide-react';
import CityBadge from '@/components/ui/CityBadge';
import AnimatedButton from '@/components/ui/AnimatedButton';

interface ProfileCardProps {
  id: number;
  name: string;
  bio: string;
  city: string;
  avatar: string;
  petCount: number;
  isCurrentUser?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  name,
  bio,
  city,
  avatar,
  petCount,
  isCurrentUser = false,
}) => {
  const { cityColor } = useCity();
  
  // Get initials for avatar fallback
  const initials = name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <div className="rounded-xl overflow-hidden bg-card shadow-sm border transition-all duration-300 hover:shadow-md">
      <div className={cn(
        'h-24 bg-gradient-to-r',
        city === 'amsterdam' && 'from-amsterdam/80 to-amsterdam-dark/80',
        city === 'dublin' && 'from-dublin/80 to-dublin-dark/80',
        city === 'calgary' && 'from-calgary/80 to-calgary-dark/80',
      )} />
      
      <div className="px-6 pb-6 pt-0 -mt-12">
        {/* Avatar */}
        <div className="flex justify-between items-end mb-4">
          <div 
            className="h-24 w-24 rounded-full border-4 border-card overflow-hidden bg-muted relative"
          >
            {avatar ? (
              <img 
                src={avatar} 
                alt={name} 
                className="h-full w-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                {initials}
              </div>
            )}
          </div>
          
          {isCurrentUser && (
            <AnimatedButton 
              size="sm" 
              variant="outline" 
              className="mb-2"
              hoverEffect="scale"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </AnimatedButton>
          )}
        </div>
        
        {/* User Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <CityBadge city={city as 'amsterdam' | 'dublin' | 'calgary'} size="sm" />
            </div>
          </div>
          
          <p className="text-sm text-foreground/80">{bio}</p>
          
          <div className="pt-2 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Joined June 2023</span>
            </div>
            
            <div className="flex items-center text-muted-foreground">
              <PetCounter count={petCount} city={city} />
            </div>
          </div>
          
          {!isCurrentUser && (
            <div className="pt-2">
              <AnimatedButton 
                className={cn(
                  'w-full justify-center',
                  city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
                  city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
                  city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
                )}
                hoverEffect="lift"
              >
                <Mail className="w-4 h-4 mr-2" />
                Connect
              </AnimatedButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for pet counter with animation
const PetCounter: React.FC<{ count: number; city: string }> = ({ count, city }) => {
  const icons = Array(count).fill(0);
  
  return (
    <div className="flex items-center">
      <div className="relative flex mr-2 h-5">
        {icons.map((_, i) => (
          <div 
            key={i}
            className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center absolute transition-all duration-300",
              city === 'amsterdam' && 'bg-amsterdam text-white',
              city === 'dublin' && 'bg-dublin text-white',
              city === 'calgary' && 'bg-calgary text-white',
            )}
            style={{ 
              left: `${i * 12}px`,
              zIndex: count - i,
              transform: `scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.2
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8c0 3.3 2.7 6 6 6 0-3.3-2.7-6-6-6z"/>
              <path d="M15 8c0 3.3 2.7 6 6 6 0-3.3-2.7-6-6-6z"/>
              <path d="M3 16c0 3.3 2.7 6 6 6 0-3.3-2.7-6-6-6z"/>
              <path d="M15 16c0 3.3 2.7 6 6 6 0-3.3-2.7-6-6-6z"/>
            </svg>
          </div>
        ))}
      </div>
      <span>{count} Pet{count !== 1 ? 's' : ''}</span>
    </div>
  );
};

export default ProfileCard;
