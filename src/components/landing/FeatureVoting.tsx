
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { Lightbulb, Search, CheckCircle, Dog, Cat, Fish, Bird, ThumbsUp, Heart, User, Calendar, Map, Star, Bell, MessageCircle, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the structure of a feature
interface Feature {
  id: number;
  name: string;
  description: string;
  icon: string;
  votes: number;
  voted: boolean;
  category: string;
}

const FeatureVoting = () => {
  const { city } = useCity();
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 1,
      name: "Mobile App",
      description: "Native iOS and Android apps for on-the-go access",
      icon: "Mobile",
      votes: 120,
      voted: false,
      category: "platform"
    },
    {
      id: 2,
      name: "Pet Profiles",
      description: "Create detailed profiles for your pets with photos and info",
      icon: "User",
      votes: 95,
      voted: false,
      category: "profile"
    },
    {
      id: 3,
      name: "Local Deals",
      description: "Discover exclusive deals from local pet stores and services",
      icon: "Percent",
      votes: 78,
      voted: false,
      category: "community"
    },
    {
      id: 4,
      name: "Pet Playdate Matching",
      description: "Find compatible playmates for your pet based on personality",
      icon: "Heart",
      votes: 67,
      voted: false,
      category: "community"
    },
    {
      id: 5,
      name: "Health Tracking",
      description: "Monitor vaccinations, medications, and vet appointments",
      icon: "Activity",
      votes: 55,
      voted: false,
      category: "health"
    },
    {
      id: 6,
      name: "Lost Pet Alerts",
      description: "Send instant notifications to nearby users about lost pets",
      icon: "Bell",
      votes: 89,
      voted: false,
      category: "safety"
    },
    {
      id: 7,
      name: "Pet-Friendly Map",
      description: "Interactive map of parks, cafes, and hotels that welcome pets",
      icon: "Map",
      votes: 72,
      voted: false,
      category: "community"
    },
    {
      id: 8,
      name: "Pet Sitter Marketplace",
      description: "Find and book trusted pet sitters in your neighborhood",
      icon: "Home",
      votes: 63,
      voted: false,
      category: "services"
    },
    {
      id: 9,
      name: "Training Resources",
      description: "Access to professional training videos and tips",
      icon: "Graduation",
      votes: 41,
      voted: false,
      category: "education"
    }
  ]);
  const [newFeature, setNewFeature] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('popular'); // 'popular' or 'newest'
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Fix the useInView hook to properly get ref and inView
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const handleUpvote = (id: number) => {
    const updatedFeatures = features.map(feature =>
      feature.id === id ? { ...feature, votes: feature.votes + 1, voted: true } : feature
    );
    setFeatures(updatedFeatures);
    
    // Show toast notification
    toast({
      title: "Vote recorded!",
      description: "Thanks for helping us prioritize our roadmap.",
      variant: "default",
    });
  };

  const handleNewFeature = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newFeature.trim() === '') return;
    
    // Add new feature to the list
    const newFeatureObject = {
      id: features.length + 1,
      name: newFeature,
      description: "User suggested feature",
      icon: "Lightbulb",
      votes: 1,
      voted: true,
      category: "custom"
    };
    
    setFeatures([...features, newFeatureObject]);
    setNewFeature('');
    
    // Show toast notification
    toast({
      title: "Feature suggested!",
      description: "Thanks for your suggestion! Other users can now vote on it.",
      variant: "default",
    });
    
    setIsAddingFeature(false);
  };

  // Filter features based on search term and category
  const filteredFeatures = features.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || feature.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedFeatures = [...filteredFeatures].sort((a, b) => {
    if (sortOrder === 'popular') {
      return b.votes - a.votes;
    } else {
      return b.id - a.id;
    }
  });

  const toggleAddingFeature = () => {
    setIsAddingFeature(!isAddingFeature);
  };

  // Define accent colors based on city
  const accentClass = cn(
    city === 'amsterdam' && 'text-amsterdam',
    city === 'dublin' && 'text-dublin',
    city === 'calgary' && 'text-calgary',
    !city && 'text-primary'
  );
  
  const accentBgClass = cn(
    city === 'amsterdam' && 'bg-amsterdam',
    city === 'dublin' && 'bg-dublin',
    city === 'calgary' && 'bg-calgary',
    !city && 'bg-primary'
  );

  // Get icon component based on name
  const getIconComponent = (iconName: string, className: string) => {
    const iconMap = {
      "Mobile": Zap,
      "User": User,
      "Percent": Star,
      "Heart": Heart,
      "Activity": MessageCircle,
      "Bell": Bell,
      "Map": Map,
      "Home": Calendar,
      "Graduation": Lightbulb,
      "Lightbulb": Lightbulb
    };
    
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Lightbulb;
    return <IconComponent className={className} />;
  };

  // Get random pet icon for decorative elements
  const getRandomPetIcon = (size: number, className: string) => {
    const icons = [Dog, Cat, Bird, Fish];
    const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
    return <RandomIcon className={`w-${size} h-${size} ${className}`} />;
  };

  // Categories for tabs
  const categories = [
    { id: 'all', name: 'All Features', icon: Star },
    { id: 'community', name: 'Community', icon: Heart },
    { id: 'profile', name: 'Profiles', icon: User },
    { id: 'health', name: 'Pet Health', icon: MessageCircle },
    { id: 'services', name: 'Services', icon: Calendar },
    { id: 'safety', name: 'Safety', icon: Bell },
    { id: 'platform', name: 'Platform', icon: Zap },
    { id: 'education', name: 'Education', icon: Lightbulb },
    { id: 'custom', name: 'Your Ideas', icon: Lightbulb }
  ];

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden" aria-labelledby="feature-voting-title" id="feature-voting">
      {/* Decorative pet silhouettes */}
      <div className="absolute top-0 right-0 opacity-5 transform rotate-12">
        <Cat className="w-48 h-48" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-5 transform -rotate-12">
        <Dog className="w-56 h-56" />
      </div>
      
      {/* Background pattern with paw prints */}
      <div className="absolute inset-0 opacity-5">
        <div className="relative w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute" 
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                opacity: 0.4 + Math.random() * 0.6
              }}
            >
              {getRandomPetIcon(
                8 + Math.floor(Math.random() * 12),
                "text-primary/10"
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="feature-voting-title" className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-4 relative inline-block">
            Vote on Future Features
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/0"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Help us decide what to build next. Your votes directly impact our development roadmap!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-full md:w-auto shadow-inner">
            <Search className="w-5 h-5 text-gray-500 mr-2" aria-hidden="true" />
            <input
              type="search"
              className="bg-transparent border-none text-gray-900 placeholder-gray-500 focus:ring-0 focus:outline-none w-full"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search features"
            />
          </div>

          <div className="flex items-center space-x-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1 shadow-sm border border-gray-100">
            <button
              onClick={() => setSortOrder('popular')}
              className={`text-sm font-medium ${sortOrder === 'popular' ? accentClass : 'text-gray-700 hover:text-blue-500'} focus:outline-none transition-colors`}
            >
              Most Popular
            </button>
            <div className="w-px h-4 bg-gray-300"></div>
            <button
              onClick={() => setSortOrder('newest')}
              className={`text-sm font-medium ${sortOrder === 'newest' ? accentClass : 'text-gray-700 hover:text-blue-500'} focus:outline-none transition-colors`}
            >
              Newest
            </button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-8">
          <div className="relative">
            <div className="overflow-x-auto pb-4 scrollbar-none">
              <TabsList className="flex justify-start bg-white border border-gray-200 p-1 rounded-full shadow-sm">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="data-[state=active]:text-white rounded-full px-4 py-2 flex items-center gap-2"
                    style={{
                      backgroundColor: activeCategory === category.id ? (
                        city === 'amsterdam' ? '#E67E22' : 
                        city === 'dublin' ? '#2E8B57' : 
                        city === 'calgary' ? '#F39C12' : 
                        'hsl(var(--primary))'
                      ) : 'transparent'
                    }}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
          </div>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedFeatures.map(feature => (
                  <motion.div
                    key={feature.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: filteredFeatures.indexOf(feature) * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="p-5 flex-grow relative">
                      {/* Subtle pet icon in the background */}
                      <div className="absolute top-2 right-2 opacity-10">
                        {getRandomPetIcon(8, "text-primary")}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${accentClass.replace('text-', 'bg-')}`}></span>
                        {getIconComponent(feature.icon, "w-5 h-5 text-yellow-500")}
                        {feature.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                    <div className="bg-gray-50 px-5 py-4 flex items-center justify-between relative overflow-hidden">
                      {/* Gradient progress bar based on votes */}
                      <div 
                        className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r ${accentClass.replace('text-', 'from-')}`}
                        style={{ width: `${Math.min(100, (feature.votes / 150) * 100)}%` }}
                      ></div>
                      
                      <span className="text-gray-700 text-sm font-medium flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {feature.votes} Votes
                      </span>
                      <button
                        onClick={() => handleUpvote(feature.id)}
                        disabled={feature.voted}
                        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none transition-colors ${feature.voted ? 'opacity-50 cursor-not-allowed' : ''}`}
                        aria-label={`Vote for ${feature.name}`}
                      >
                        {feature.voted ? (
                          <CheckCircle className="w-5 h-5 inline-block mr-2" aria-hidden="true" />
                        ) : null}
                        Vote
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredFeatures.length === 0 && (
                <Card className="p-8 text-center bg-gray-50/50">
                  <CardContent className="pt-6">
                    <Lightbulb className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No features found</h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm ? 
                        `No features matched your search for "${searchTerm}"` : 
                        "No features in this category yet"}
                    </p>
                    <button
                      onClick={toggleAddingFeature}
                      className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none transition-colors"
                    >
                      Suggest a new feature
                    </button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {isAddingFeature ? (
            <form onSubmit={handleNewFeature} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Suggest a New Feature
              </h3>
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="What feature would you like to see?"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  aria-label="Suggest a new feature"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex-grow"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Submit Feature
                </button>
                <button
                  type="button"
                  onClick={toggleAddingFeature}
                  className="text-sm text-gray-600 hover:text-gray-800 focus:outline-none transition-colors px-4 py-2 border border-gray-200 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                Don't see the feature you're looking for? Suggest your own idea and let the community vote on it!
              </p>
              <button
                onClick={toggleAddingFeature}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors group"
              >
                <Lightbulb className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Suggest a Feature
              </button>
            </div>
          )}
        </motion.div>
        
        <div className="mt-20 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">How feature voting works</h3>
              <p className="text-gray-600">Your votes help us prioritize our development roadmap</p>
            </div>
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>In Development</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Planned</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Under Review</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureVoting;
