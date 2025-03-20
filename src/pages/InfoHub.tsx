
import React, { useState, useEffect } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { Search, X, ArrowLeft, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InfoCard from '@/components/hub/InfoCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { mockArticles } from '@/lib/mockData';

const InfoHub = () => {
  const { city } = useCity();
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState(mockArticles);

  // Extract unique categories
  const categories = Array.from(new Set(mockArticles.map(article => article.category)));

  // Filter articles based on city, search query, and category
  useEffect(() => {
    let filtered = mockArticles;
    
    // Filter by city
    if (city) {
      filtered = filtered.filter(article => article.city === city);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(query) || 
        article.content.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }
    
    setFilteredArticles(filtered);
  }, [city, searchQuery, selectedCategory]);

  // Handle article selection
  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-16 mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {selectedArticle ? (
            <div className="max-w-4xl mx-auto">
              {/* Back Button */}
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center text-muted-foreground hover:text-foreground mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                Back to articles
              </button>
              
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div 
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-full text-white",
                      city === 'amsterdam' && 'bg-amsterdam',
                      city === 'dublin' && 'bg-dublin',
                      city === 'calgary' && 'bg-calgary',
                      !city && 'bg-primary'
                    )}
                  >
                    {selectedArticle.category}
                  </div>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">{selectedArticle.title}</h1>
                <p className="text-lg text-muted-foreground">{selectedArticle.excerpt}</p>
              </div>
              
              {/* Article Image */}
              <div className="rounded-xl overflow-hidden mb-8">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <p className="whitespace-pre-line">{selectedArticle.content}</p>
              </div>
              
              {/* Tags */}
              <div className="mt-8 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className={cn(
                        "px-2 py-1 rounded text-xs",
                        city === 'amsterdam' && 'bg-amsterdam/10',
                        city === 'dublin' && 'bg-dublin/10',
                        city === 'calgary' && 'bg-calgary/10',
                        !city && 'bg-primary/10'
                      )}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">Information Hub</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Essential resources and guides for pet owners in {city ? city.charAt(0).toUpperCase() + city.slice(1) : 'your city'}.
                </p>
              </div>
              
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="rounded-xl border shadow-sm bg-card p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                        placeholder="Search for articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
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
                    
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                            selectedCategory === category 
                              ? cn(
                                  'text-white',
                                  city === 'amsterdam' && 'bg-amsterdam',
                                  city === 'dublin' && 'bg-dublin',
                                  city === 'calgary' && 'bg-calgary',
                                  !city && 'bg-primary'
                                )
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          )}
                          onClick={() => {
                            if (selectedCategory === category) {
                              setSelectedCategory(null);
                            } else {
                              setSelectedCategory(category);
                            }
                          }}
                        >
                          {category}
                        </button>
                      ))}
                      
                      {(selectedCategory || searchQuery) && (
                        <button
                          className="px-3 py-1.5 rounded-md border border-input text-sm font-medium flex items-center hover:bg-muted transition-colors"
                          onClick={clearFilters}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Articles Grid */}
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map(article => (
                    <InfoCard
                      key={article.id}
                      id={article.id}
                      title={article.title}
                      city={article.city}
                      category={article.category}
                      image={article.image}
                      excerpt={article.excerpt}
                      content={article.content}
                      date={article.date}
                      tags={article.tags}
                      icon={article.icon}
                      onClick={() => handleArticleClick(article)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No articles found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search filters or browse all categories.
                  </p>
                  <AnimatedButton 
                    onClick={clearFilters}
                    hoverEffect="scale"
                  >
                    Clear All Filters
                  </AnimatedButton>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default InfoHub;
