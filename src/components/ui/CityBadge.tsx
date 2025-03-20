
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CityBadgeProps {
  city: 'amsterdam' | 'dublin' | 'calgary';
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
}

const CityBadge: React.FC<CityBadgeProps> = ({
  city,
  size = 'default',
  variant = 'default',
  className,
}) => {
  // Map city to its corresponding styles
  const cityStyles = {
    amsterdam: {
      bg: 'bg-amsterdam/90',
      text: 'text-white',
      border: 'border-amsterdam/30',
      outline: {
        bg: 'bg-amsterdam/10',
        text: 'text-amsterdam-dark',
        border: 'border-amsterdam/30',
      },
    },
    dublin: {
      bg: 'bg-dublin/90',
      text: 'text-white',
      border: 'border-dublin/30',
      outline: {
        bg: 'bg-dublin/10',
        text: 'text-dublin-dark',
        border: 'border-dublin/30',
      },
    },
    calgary: {
      bg: 'bg-calgary/90',
      text: 'text-white',
      border: 'border-calgary/30',
      outline: {
        bg: 'bg-calgary/10',
        text: 'text-calgary-dark',
        border: 'border-calgary/30',
      },
    },
  };

  // Get styles based on variant
  const styles = variant === 'outline' ? cityStyles[city].outline : cityStyles[city];

  // Determine size classes
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    default: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <Badge
      className={cn(
        styles.bg,
        styles.text,
        styles.border,
        sizeClasses[size],
        'font-medium rounded-full transition-all duration-300 shadow-sm',
        className
      )}
    >
      {city.charAt(0).toUpperCase() + city.slice(1)}
    </Badge>
  );
};

export default CityBadge;
