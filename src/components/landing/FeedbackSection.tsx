
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { CheckCircle2, Send, Cat, Dog, Bird, Fish } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const petTypes = [
  "Dog",
  "Cat",
  "Bird",
  "Rabbit",
  "Hamster",
  "Fish",
  "Reptile",
  "Other"
];

const useCases = [
  "Finding local pet services",
  "Connecting with other pet owners",
  "Accessing pet-related information",
  "Organizing pet playdates",
  "Finding lost pets",
  "Other"
];

// Helper function to get pet icon by type
const getPetIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'dog': return <Dog className="w-5 h-5" />;
    case 'cat': return <Cat className="w-5 h-5" />;
    case 'bird': return <Bird className="w-5 h-5" />;
    case 'fish': return <Fish className="w-5 h-5" />;
    default: return null;
  }
};

const FeedbackSection = () => {
  const { city } = useCity();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    petType: [],
    features: '',
    useCase: '',
    customUseCase: '',
    privacy: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean, type: string) => {
    if (type === 'privacy') {
      setFormData(prev => ({ ...prev, privacy: checked }));
    } else {
      setFormData(prev => {
        const value = type;
        let petType = [...prev.petType];
        if (checked) {
          petType.push(value);
        } else {
          petType = petType.filter(item => item !== value);
        }
        return { ...prev, petType };
      });
    }
  };
  
  // Fix the event handler type for radio buttons
  const handleUseCaseChange = (value: string) => {
    setFormData(prev => ({ ...prev, useCase: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send data to a backend
    console.log("Feedback submitted:", formData);
    
    // Show success message
    toast({
      title: "Thank you for your feedback!",
      description: `We've added you to our waitlist and your feedback will help shape PawConnect in ${city || 'your city'}.`,
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      city: '',
      petType: [],
      features: '',
      useCase: '',
      customUseCase: '',
      privacy: false
    });
    
    // Show success animation
    setIsSubmitted(true);
    
    // Hide animation after a delay
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  // Define accent colors based on city
  const accentClass = cn(
    city === 'amsterdam' && 'from-amsterdam to-amsterdam/70',
    city === 'dublin' && 'from-dublin to-dublin/70',
    city === 'calgary' && 'from-calgary to-calgary/70',
    !city && 'from-primary to-primary/70'
  );
  
  return (
    <section 
      ref={ref}
      className="py-16 relative overflow-hidden"
      aria-label="Feedback section"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 transform rotate-12">
        <Cat className="w-full h-full text-primary" />
      </div>
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10 -rotate-12">
        <Dog className="w-full h-full text-primary" />
      </div>
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-primary/5 animate-pulse delay-300"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4 relative inline-block">
            Help us shape PawConnect
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 to-primary/0"></div>
          </h2>
          <p className="text-gray-600 text-lg">
            Your feedback will help us build the best pet community
          </p>
        </motion.div>
        
        {isSubmitted ? (
          <motion.div
            className="relative flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl -z-10"></div>
            <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
            <h3 className="text-green-600 font-semibold text-2xl mb-3">
              Thank you for your feedback!
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              We've added you to our waitlist and your feedback will help shape PawConnect in {city || 'your city'}.
            </p>
            
            {/* Decorative pet icons floating around the success message */}
            <motion.div
              className="absolute top-6 right-8"
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <Cat className="w-10 h-10 text-primary/30" />
            </motion.div>
            <motion.div
              className="absolute bottom-6 left-8"
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
            >
              <Dog className="w-12 h-12 text-primary/30" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Curved accent header */}
            <div className={`h-16 bg-gradient-to-r ${accentClass} relative mb-8`}>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[100%] transform translate-y-8"></div>
            </div>
            
            <form
              className="grid grid-cols-1 gap-y-6 p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full rounded-md"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  City
                </Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full rounded-md"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  What type of pets do you own?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {petTypes.map(type => (
                    <div key={type} className="flex items-center space-x-2 bg-muted/30 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={`petType-${type}`}
                        checked={formData.petType.includes(type)}
                        onCheckedChange={(checked) => handleCheckboxChange(checked === true, type)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />
                      <Label 
                        htmlFor={`petType-${type}`} 
                        className="text-sm flex items-center gap-2 cursor-pointer"
                      >
                        {getPetIcon(type)}
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="features" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  What features would you like to see in PawConnect?
                </Label>
                <Textarea
                  rows={4}
                  name="features"
                  id="features"
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full rounded-md"
                  value={formData.features}
                  onChange={handleChange}
                />
                <p className="text-sm text-gray-500 italic">
                  Tell us what you're looking for in a pet community.
                </p>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  How would you primarily use PawConnect?
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCases.map(useCase => (
                    <div key={useCase} className="flex items-center space-x-2 p-3 rounded-lg border border-muted hover:border-primary/30 transition-colors">
                      <input
                        id={`useCase-${useCase}`}
                        name="useCase"
                        type="radio"
                        value={useCase}
                        checked={formData.useCase === useCase}
                        onChange={(e) => handleUseCaseChange(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <Label htmlFor={`useCase-${useCase}`} className="text-sm cursor-pointer">
                        {useCase}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {formData.useCase === 'Other' && (
                  <div className="mt-3 p-4 rounded-lg bg-muted/20">
                    <Label htmlFor="customUseCase" className="block text-sm font-medium text-gray-700 mb-2">
                      Please specify:
                    </Label>
                    <Input
                      type="text"
                      name="customUseCase"
                      id="customUseCase"
                      className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm rounded-md"
                      value={formData.customUseCase}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-start border-t border-gray-200 pt-6">
                <div className="flex items-center h-5">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacy}
                    onCheckedChange={(checked) => handleCheckboxChange(checked === true, 'privacy')}
                    required
                    className="focus:ring-primary h-4 w-4 text-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="privacy" className="font-medium text-gray-700">
                    I agree to the <a href="#" className="text-primary hover:text-primary/80 underline">Privacy Policy</a> and <a href="#" className="text-primary hover:text-primary/80 underline">Terms of Service</a>.
                  </Label>
                </div>
              </div>
              
              <AnimatedButton
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-full"
                hoverEffect="lift"
              >
                <Send className="mr-2 w-5 h-5" />
                Submit Feedback
              </AnimatedButton>
            </form>
          </motion.div>
        )}

        {/* Floating pet silhouettes */}
        <motion.div 
          className="absolute -bottom-8 -right-8 opacity-5 w-40 h-40"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0], 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 8,
            ease: "easeInOut" 
          }}
        >
          <Dog className="w-full h-full" />
        </motion.div>
        
        <motion.div 
          className="absolute -top-8 -left-8 opacity-5 w-40 h-40"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0], 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Cat className="w-full h-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackSection;
