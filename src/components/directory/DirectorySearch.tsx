
import React, { useState } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { Search, Filter, X, CheckCircle2 } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { serviceCategories } from '@/lib/mockData';

interface DirectorySearchProps {
  onSearch: (query: string, filters: any) => void;
}

const DirectorySearch: React.FC<DirectorySearchProps> = ({ onSearch }) => {
  const { city, cityColor } = useCity();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Filter methods
  const toggleCategory = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(catId => catId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
  };

  const handleSearch = () => {
    onSearch(searchQuery, { categories: selectedCategories });
  };

  // Colors based on city
  const cityAccentClass = cn(
    city === 'amsterdam' && 'text-amsterdam border-amsterdam',
    city === 'dublin' && 'text-dublin border-dublin',
    city === 'calgary' && 'text-calgary border-calgary',
    !city && 'text-primary border-primary'
  );

  const cityBgClass = cn(
    city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
    city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
    city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
    !city && 'bg-primary hover:bg-primary/90'
  );

  return (
    <div className="rounded-xl border shadow-sm bg-card p-4 transition-all duration-300">
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {searchQuery && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <button
          className={cn(
            "ml-2 px-3 py-2 rounded-md border border-input",
            "flex items-center text-sm font-medium", 
            "hover:bg-muted transition-colors", 
            "focus:outline-none focus:ring-2 focus:ring-primary",
            showFilters && "bg-muted"
          )}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-1" />
          Filter
          {selectedCategories.length > 0 && (
            <span className={cn(
              "ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-medium text-white",
              cityBgClass
            )}>
              {selectedCategories.length}
            </span>
          )}
        </button>
        
        <AnimatedButton 
          className={cn("ml-2", cityBgClass)}
          onClick={handleSearch}
          hoverEffect="scale"
        >
          Search
        </AnimatedButton>
      </div>
      
      {/* Filters Section */}
      {showFilters && (
        <div className="mt-3 pt-3 border-t border-border animate-slide-down">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-sm font-medium">Service Categories</h4>
            {selectedCategories.length > 0 && (
              <button
                className="text-xs text-muted-foreground hover:text-foreground flex items-center"
                onClick={clearFilters}
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {serviceCategories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              const CategoryIcon = category.icon;
              
              return (
                <div
                  key={category.id}
                  className={cn(
                    "flex items-center px-3 py-2 border rounded-md text-sm cursor-pointer transition-all duration-300",
                    isSelected ? cn(cityAccentClass, "border-2") : "border-input hover:border-primary/30",
                    isSelected && "bg-primary/5"
                  )}
                  onClick={() => toggleCategory(category.id)}
                >
                  <CategoryIcon className={cn("h-4 w-4 mr-2", isSelected && cityAccentClass)} />
                  <span>{category.name}</span>
                  {isSelected && (
                    <CheckCircle2 className={cn("h-4 w-4 ml-auto", cityAccentClass)} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectorySearch;
