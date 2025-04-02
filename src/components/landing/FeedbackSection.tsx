import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { CheckCircle2, Send } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from '@/hooks/use-toast';

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
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'privacy') {
      setFormData(prev => ({ ...prev, privacy: checked }));
    } else {
      const value = name.replace('petType-', '');
      setFormData(prev => {
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
  
  const handleUseCaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const value = name.replace('useCase-', '');
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
  
  return (
    <section 
      ref={ref}
      className="py-16 bg-white"
      aria-label="Feedback section"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Help us shape PawConnect
          </h2>
          <p className="text-gray-600 text-lg">
            Your feedback will help us build the best pet community
          </p>
        </motion.div>
        
        {isSubmitted ? (
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-green-600 font-semibold text-xl mb-2">
              Thank you for your feedback!
            </p>
            <p className="text-gray-600 text-center">
              We've added you to our waitlist and your feedback will help shape PawConnect in {city || 'your city'}.
            </p>
          </motion.div>
        ) : (
          <motion.form
            className="grid grid-cols-1 gap-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </Label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <div className="mt-1">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </Label>
              <div className="mt-1">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <p className="block text-sm font-medium text-gray-700">
                What type of pets do you own?
              </p>
              <div className="mt-1 space-y-2">
                {petTypes.map(type => (
                  <div key={type} className="flex items-start">
                    <div className="flex items-center h-5">
                      <Checkbox
                        id={`petType-${type}`}
                        name={`petType-${type}`}
                        checked={formData.petType.includes(type)}
                        onChange={handleCheckboxChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label htmlFor={`petType-${type}`} className="font-medium text-gray-700">
                        {type}
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="features" className="block text-sm font-medium text-gray-700">
                What features would you like to see in PawConnect?
              </Label>
              <div className="mt-1">
                <Textarea
                  rows={4}
                  name="features"
                  id="features"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={formData.features}
                  onChange={handleChange}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Tell us what you're looking for in a pet community.
              </p>
            </div>
            
            <div>
              <Label className="block text-sm font-medium text-gray-700">
                How would you primarily use PawConnect?
              </Label>
              <div className="mt-1 space-y-2">
                {useCases.map(useCase => (
                  <div key={useCase} className="flex items-start">
                    <div className="flex items-center h-5">
                      <Input
                        id={`useCase-${useCase}`}
                        name={`useCase-${useCase}`}
                        type="radio"
                        value={useCase}
                        checked={formData.useCase === useCase}
                        onChange={handleUseCaseChange}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <Label htmlFor={`useCase-${useCase}`} className="font-medium text-gray-700">
                        {useCase}
                      </Label>
                    </div>
                  </div>
                ))}
                {formData.useCase === 'Other' && (
                  <div className="mt-2">
                    <Label htmlFor="customUseCase" className="block text-sm font-medium text-gray-700">
                      Please specify:
                    </Label>
                    <div className="mt-1">
                      <Input
                        type="text"
                        name="customUseCase"
                        id="customUseCase"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        value={formData.customUseCase}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="privacy"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleCheckboxChange}
                  required
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="privacy" className="font-medium text-gray-700">
                  I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a>.
                </Label>
              </div>
            </div>
            
            <AnimatedButton
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              hoverEffect="lift"
            >
              Submit Feedback
              <Send className="ml-2 w-5 h-5" />
            </AnimatedButton>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default FeedbackSection;
