
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { Lightbulb, Search, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
  const inView = useInView(ref, { 
    once: true,
    amount: 0.2
  });

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

  return (
    <section ref={ref} className="py-16 bg-white" aria-labelledby="feature-voting-title">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="feature-voting-title" className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Vote on Future Features
          </h2>
          <p className="text-lg text-gray-600">
            Help us decide what to build next. Vote on your favorite features or suggest new ones!
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 flex-grow md:flex-grow-0">
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

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSortOrder('popular')}
              className={`text-sm font-medium ${sortOrder === 'popular' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'} focus:outline-none transition-colors`}
            >
              Most Popular
            </button>
            <button
              onClick={() => setSortOrder('newest')}
              className={`text-sm font-medium ${sortOrder === 'newest' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-500'} focus:outline-none transition-colors`}
            >
              Newest
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFeatures.map(feature => (
            <motion.div
              key={feature.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: features.indexOf(feature) * 0.1 }}
            >
              <div className="p-5 flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" aria-hidden="true" />
                  {feature.name}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
              <div className="bg-gray-50 px-5 py-4 flex items-center justify-between">
                <span className="text-gray-700 text-sm">
                  <span className="font-medium">{feature.votes}</span> Votes
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
            <form onSubmit={handleNewFeature} className="max-w-md mx-auto">
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
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Submit Feature
              </button>
              <button
                type="button"
                onClick={toggleAddingFeature}
                className="ml-4 text-sm text-gray-600 hover:text-gray-800 focus:outline-none transition-colors"
              >
                Cancel
              </button>
            </form>
          ) : (
            <button
              onClick={toggleAddingFeature}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Suggest a Feature
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureVoting;
