
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronUp, Plus, FileText, BellRing, Map, PercentSquare, Users, Dumbbell, Home } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { toast } from '@/hooks/use-toast';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  votes: number;
}

const FeatureVoting = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: "health_records",
      title: "Pet Health Records",
      description: "Store vaccination records, medications, and health history all in one place.",
      icon: FileText,
      votes: 24
    },
    {
      id: "lost_pet",
      title: "Lost Pet Alert System",
      description: "Quick community notifications when a pet goes missing in your area.",
      icon: BellRing,
      votes: 42
    },
    {
      id: "regulations",
      title: "Local Pet Regulations Guide",
      description: "Easy access to leash laws, pet-friendly areas, and local ordinances.",
      icon: Map,
      votes: 16
    },
    {
      id: "discounts",
      title: "Discounts at Local Pet Businesses",
      description: "Exclusive offers and savings from partner businesses in your city.",
      icon: PercentSquare,
      votes: 37
    },
    {
      id: "pet_sitting",
      title: "Pet Sitting Exchange Network",
      description: "Connect with trusted pet owners for pet sitting exchanges.",
      icon: Users,
      votes: 28
    },
    {
      id: "breed_meetups",
      title: "Breed-Specific Meetups",
      description: "Find and organize gatherings with owners of the same breed as yours.",
      icon: Dumbbell,
      votes: 19
    },
    {
      id: "training",
      title: "Training Resources Library",
      description: "Access to videos, articles, and local trainers recommended by the community.",
      icon: FileText,
      votes: 22
    },
    {
      id: "housing",
      title: "Pet-Friendly Housing Finder",
      description: "Database of pet-friendly apartments, houses, and landlords in your area.",
      icon: Home,
      votes: 31
    }
  ]);
  
  const [newFeature, setNewFeature] = useState('');
  
  // Sort features by votes (descending)
  const sortedFeatures = [...features].sort((a, b) => b.votes - a.votes);
  
  // Determine top 3 features
  const topFeatureIds = sortedFeatures.slice(0, 3).map(f => f.id);
  
  // Handle upvoting a feature
  const handleVote = (id: string) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === id 
          ? { ...feature, votes: feature.votes + 1 } 
          : feature
      )
    );
    
    toast({
      title: "Vote recorded",
      description: "Thank you for helping us prioritize!",
      variant: "success",
      duration: 2000
    });
  };
  
  // Handle suggesting a new feature
  const handleSuggestFeature = () => {
    if (newFeature.trim().length < 5) {
      toast({
        title: "Feature suggestion too short",
        description: "Please provide a more detailed description",
        variant: "destructive"
      });
      return;
    }
    
    const newId = `suggested_${Date.now()}`;
    
    setFeatures(prev => [
      ...prev,
      {
        id: newId,
        title: newFeature,
        description: "User suggested feature",
        icon: Plus,
        votes: 1
      }
    ]);
    
    setNewFeature('');
    
    toast({
      title: "Feature suggested!",
      description: "Thank you for your contribution to PawConnect",
      variant: "success"
    });
  };
  
  return (
    <section 
      ref={ref}
      className="py-20 bg-gradient-to-br from-background to-muted/30" 
      aria-label="Feature voting section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Help Us Prioritize
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Vote for the features you want to see first
          </motion.p>
        </div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {sortedFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" } 
                }
              }}
            >
              <Card className={`h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md overflow-hidden ${topFeatureIds.includes(feature.id) ? 'border-primary/50 bg-primary/5' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <feature.icon className="w-8 h-8 text-muted-foreground/70" />
                    {topFeatureIds.includes(feature.id) && (
                      <div className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full font-medium">
                        Top Feature
                      </div>
                    )}
                  </div>
                  <CardTitle className="mt-2 text-lg line-clamp-1">{feature.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">{feature.description}</p>
                </CardContent>
                
                <CardFooter>
                  <button 
                    onClick={() => handleVote(feature.id)}
                    className="flex items-center justify-center gap-1 text-sm font-medium w-full py-2 border border-border rounded-md hover:bg-primary/5 transition-colors"
                    aria-label={`Vote for ${feature.title}`}
                  >
                    <ChevronUp className="w-4 h-4" />
                    <span>Upvote</span>
                    <span className="ml-1 bg-muted rounded-full px-2">{feature.votes}</span>
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggest a New Feature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input 
                  placeholder="Describe a feature you'd like to see..." 
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className="flex-1"
                />
                <AnimatedButton 
                  onClick={handleSuggestFeature}
                  className="bg-primary text-primary-foreground shrink-0"
                  hoverEffect="scale"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Suggest
                </AnimatedButton>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureVoting;
