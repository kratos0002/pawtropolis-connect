
import React, { useState, useEffect } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { ListFilter, Map, Grid3X3, Store } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/directory/ServiceCard';
import DirectorySearch from '@/components/directory/DirectorySearch';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { mockServiceProviders, serviceCategories } from '@/lib/mockData';

const Directory = () => {
  const { city } = useCity();
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filteredProviders, setFilteredProviders] = useState(mockServiceProviders);
  const [filters, setFilters] = useState({
    query: '',
    categories: [] as number[],
  });

  // Filter service providers based on city and search criteria
  useEffect(() => {
    let filtered = mockServiceProviders;
    
    // Filter by city
    if (city) {
      filtered = filtered.filter(provider => provider.city === city);
    }
    
    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(query) || 
        provider.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by categories
    if (filters.categories.length > 0) {
      filtered = filtered.filter(provider => 
        filters.categories.includes(provider.category)
      );
    }
    
    setFilteredProviders(filtered);
  }, [city, filters]);

  // Handle search and filter
  const handleSearch = (query: string, filterOptions: any) => {
    setFilters({
      query,
      categories: filterOptions.categories,
    });
  };

  // Get category name
  const getCategoryName = (categoryId: number) => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  // Get category icon
  const getCategoryIcon = (categoryId: number) => {
    const category = serviceCategories.find(cat => cat.id === categoryId);
    return category ? category.icon : Store;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-16 mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Local Pet Service Directory</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find trusted pet services in {city ? city.charAt(0).toUpperCase() + city.slice(1) : 'your city'}, from veterinarians to pet-friendly cafés.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-8">
            <DirectorySearch onSearch={handleSearch} />
          </div>
          
          {/* View Toggle and Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
              Showing <span className="font-medium text-foreground">{filteredProviders.length}</span> service providers
              {city && <> in <span className="font-medium text-foreground">{city.charAt(0).toUpperCase() + city.slice(1)}</span></>}
            </div>
            
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">View:</span>
              <div className="flex border rounded-md overflow-hidden">
                <button
                  className={cn(
                    "px-3 py-1.5 flex items-center text-sm",
                    view === 'list' 
                      ? cn('bg-primary text-primary-foreground',
                          city === 'amsterdam' && 'bg-amsterdam',
                          city === 'dublin' && 'bg-dublin',
                          city === 'calgary' && 'bg-calgary',
                          !city && 'bg-primary'
                        )
                      : 'bg-card hover:bg-muted'
                  )}
                  onClick={() => setView('list')}
                >
                  <ListFilter className="w-4 h-4 mr-1" />
                  List
                </button>
                <button
                  className={cn(
                    "px-3 py-1.5 flex items-center text-sm",
                    view === 'grid' 
                      ? cn('bg-primary text-primary-foreground',
                          city === 'amsterdam' && 'bg-amsterdam',
                          city === 'dublin' && 'bg-dublin',
                          city === 'calgary' && 'bg-calgary',
                          !city && 'bg-primary'
                        )
                      : 'bg-card hover:bg-muted'
                  )}
                  onClick={() => setView('grid')}
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  Grid
                </button>
              </div>
              
              <button
                className="ml-2 px-3 py-1.5 border rounded-md bg-card hover:bg-muted flex items-center text-sm"
              >
                <Map className="w-4 h-4 mr-1" />
                Map
              </button>
            </div>
          </div>
          
          {/* Service Provider Listings */}
          {filteredProviders.length > 0 ? (
            <div className={cn(
              view === 'list' ? 'space-y-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            )}>
              {filteredProviders.map(provider => (
                <ServiceCard
                  key={provider.id}
                  id={provider.id}
                  name={provider.name}
                  category={provider.category}
                  categoryName={getCategoryName(provider.category)}
                  city={provider.city}
                  address={provider.address}
                  phone={provider.phone}
                  website={provider.website}
                  email={provider.email}
                  rating={provider.rating}
                  image={provider.image}
                  description={provider.description}
                  tags={provider.tags}
                  icon={getCategoryIcon(provider.category)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
              <Store className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-1">No service providers found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search filters or browse all categories.
              </p>
              <AnimatedButton 
                onClick={() => setFilters({ query: '', categories: [] })}
                hoverEffect="scale"
              >
                Clear All Filters
              </AnimatedButton>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Directory;
