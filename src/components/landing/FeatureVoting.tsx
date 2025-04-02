
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { Lightbulb, Search, CheckCircle, Dog, Cat, Fish, Bird } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Define the structure of a feature
interface Feature {
  id: number;
  name: string;
  description: string;
  icon: string;
  votes: number;
  voted: boolean;
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
      voted: false
    },
    {
      id: 2,
      name: "Pet Profiles",
      description: "Create detailed profiles for your pets with photos and info",
      icon: "User",
      votes: 95,
      voted: false
    },
    {
      id: 3,
      name: "Local Deals",
      description: "Discover exclusive deals from local pet stores and services",
      icon: "Percent",
      votes: 78,
      voted: false
    },
  ]);
  const [newFeature, setNewFeature] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('popular'); // 'popular' or 'newest'
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  
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
      voted: true
    };
    
    setFeatures([...features, newFeatureObject]);
    setNewFeature('');
    
    // Show toast notification
    toast({
      title: "Feature suggested!",
      description: "Thanks for your suggestion! Other users can now vote on it.",
      variant: "default",
    });
  };

  const filteredFeatures = features.filter(feature =>
    feature.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  // Get random pet icon for decorative elements
  const getRandomPetIcon = (size: number, className: string) => {
    const icons = [Dog, Cat, Bird, Fish];
    const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
    return <RandomIcon className={`w-${size} h-${size} ${className}`} />;
  };

  return (
    <section ref={ref} className="py-16 bg-white relative overflow-hidden" aria-labelledby="feature-voting-title">
      {/* Decorative pet silhouettes */}
      <div className="absolute top-0 right-0 opacity-5 transform rotate-12">
        <Cat className="w-32 h-32" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-5 transform -rotate-12">
        <Dog className="w-40 h-40" />
      </div>
      
      {/* Background pattern with paw prints */}
      <div className="absolute inset-0 opacity-5">
        <div className="relative w-full h-full">
          {Array.from({ length: 10 }).map((_, i) => (
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
                8 + Math.floor(Math.random() * 8),
                "text-primary/10"
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="feature-voting-title" className="text-3xl font-heading font-bold text-gray-900 mb-4 relative inline-block">
            Vote on Future Features
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 to-primary/0"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us decide what to build next. Vote on your favorite features or suggest new ones!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 flex-grow md:flex-grow-0 shadow-inner">
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

          <div className="flex items-center space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1 shadow-sm border border-gray-100">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFeatures.map(feature => (
            <motion.div
              key={feature.id}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: filteredFeatures.indexOf(feature) * 0.1 }}
            >
              <div className="p-5 flex-grow relative">
                {/* Subtle pet icon in the background */}
                <div className="absolute top-2 right-2 opacity-10">
                  {getRandomPetIcon(8, "text-primary")}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${accentClass.replace('text-', 'bg-')}`}></span>
                  <Lightbulb className="w-5 h-5 text-yellow-500" aria-hidden="true" />
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
                
                <span className="text-gray-700 text-sm font-medium">
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

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {isAddingFeature ? (
            <form onSubmit={handleNewFeature} className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="mb-4">
                <input
                  type="text"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Suggest a new feature"
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
            <button
              onClick={toggleAddingFeature}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors group"
            >
              <Lightbulb className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              Suggest a Feature
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureVoting;
