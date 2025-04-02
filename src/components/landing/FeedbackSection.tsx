
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { CheckCircle2, Send, Cat, Dog, Bird, Fish, Rabbit, Heart, PawPrint } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
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
    case 'rabbit': return <Rabbit className="w-5 h-5" />;
    default: return <PawPrint className="w-5 h-5" />;
  }
};

// Pet images for decoration
const petImages = [
  "/images/pet-1.jpg",
  "/images/pet-2.jpg",
  "/images/pet-3.jpg",
  "/images/pet-4.jpg",
  "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
];

const FeedbackSection = () => {
  const { city } = useCity();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    petType: [] as string[],
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

  const cityTextClass = cn(
    city === 'amsterdam' && 'text-amsterdam',
    city === 'dublin' && 'text-dublin',
    city === 'calgary' && 'text-calgary',
    !city && 'text-primary'
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
      
      {/* Floating pet images */}
      {petImages.slice(0, 5).map((img, index) => (
        <motion.div
          key={`pet-float-${index}`}
          className="absolute hidden md:block"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 0.6,
            scale: 1,
            x: [0, Math.random() * 10 - 5, 0], 
            y: [0, Math.random() * 10 - 5, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 3, 
            repeat: Infinity,
            delay: index * 0.8 
          }}
          style={{
            top: `${15 + Math.random() * 70}%`,
            left: index % 2 === 0 ? `${5 + Math.random() * 20}%` : undefined,
            right: index % 2 !== 0 ? `${5 + Math.random() * 20}%` : undefined,
            zIndex: 0
          }}
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg transform rotate-3 border-2 border-white/20">
            <img 
              src={img} 
              alt="Pet" 
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      ))}
      
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-primary/10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-primary/5 animate-pulse delay-300"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4 relative inline-block">
            Help us shape PawConnect
            <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r ${accentClass}`}></div>
          </h2>
          <p className="text-gray-600 text-lg">
            Your feedback will help us build the best pet community
          </p>
        </motion.div>
        
        {isSubmitted ? (
          <motion.div
            className="relative flex flex-col items-center justify-center py-16 bg-gradient-to-br from-white/80 to-white border border-gray-100 rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl -z-10"></div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15, 
                delay: 0.2 
              }}
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
            </motion.div>
            <h3 className="text-green-600 font-semibold text-2xl mb-3">
              Thank you for your feedback!
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              We've added you to our waitlist and your feedback will help shape PawConnect in {city || 'your city'}.
            </p>
            
            {/* Pet images floating around the success message */}
            <div className="absolute -top-10 -right-10 w-32 h-32 opacity-10">
              <img 
                src={petImages[2]} 
                alt="Pet" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 opacity-10">
              <img 
                src={petImages[3]} 
                alt="Pet" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            
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
            className="bg-white rounded-3xl shadow-xl overflow-hidden relative border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Curved accent header */}
            <div className={`h-20 bg-gradient-to-r ${accentClass} relative mb-8`}>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[100%] transform translate-y-8"></div>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <PawPrint className="w-full h-full text-white" />
              </div>
            </div>
            
            <form
              className="grid grid-cols-1 gap-y-6 p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className={`w-1 h-4 rounded-full ${cityTextClass}`}></span>
                    Name
                  </Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full rounded-lg border-gray-200"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <span className={`w-1 h-4 rounded-full ${cityTextClass}`}></span>
                    Email
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="shadow-sm focus:ring-primary focus:border-primary block w-full rounded-lg border-gray-200"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className={`w-1 h-4 rounded-full ${cityTextClass}`}></span>
                  City
                </Label>
                <Input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full rounded-lg border-gray-200"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className={`w-1 h-4 rounded-full ${cityTextClass}`}></span>
                  What type of pets do you own?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {petTypes.map(type => (
                    <div 
                      key={type} 
                      className={`flex items-center space-x-2 p-3 rounded-xl hover:bg-muted/50 transition-colors ${
                        formData.petType.includes(type) 
                          ? `bg-gradient-to-br ${accentClass} bg-opacity-10 shadow-sm` 
                          : 'bg-muted/30'
                      }`}
                    >
                      <Checkbox
                        id={`petType-${type}`}
                        checked={formData.petType.includes(type)}
                        onCheckedChange={(checked) => handleCheckboxChange(checked === true, type)}
                        className={`data-[state=checked]:${cityTextClass} data-[state=checked]:text-primary-foreground`}
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
                  <span className={`w-1 h-4 rounded-full ${cityTextClass}`}></span>
                  What features would you like to see in PawConnect?
                </Label>
                <Textarea
                  rows={4}
                  name="features"
                  id="features"
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full rounded-lg border-gray-200"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Tell us what you're looking for in a pet community..."
                />
                <p className="text-sm text-gray-500 italic flex items-center gap-1 mt-1">
                  <Heart className="w-3 h-3 text-rose-400" />
                  We value your ideas and suggestions!
                </p>
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <span className={`w-1 h-4 rounded-full ${cityTextClass}`}></span>
                  How would you primarily use PawConnect?
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCases.map(useCase => (
                    <div 
                      key={useCase} 
                      className={`flex items-center space-x-2 p-3 rounded-xl transition-colors border ${
                        formData.useCase === useCase 
                          ? `border-${city || 'primary'} bg-muted/20` 
                          : 'border-muted hover:border-primary/30'
                      }`}
                    >
                      <input
                        id={`useCase-${useCase}`}
                        name="useCase"
                        type="radio"
                        value={useCase}
                        checked={formData.useCase === useCase}
                        onChange={(e) => handleUseCaseChange(e.target.value)}
                        className={cityTextClass}
                      />
                      <Label htmlFor={`useCase-${useCase}`} className="text-sm cursor-pointer">
                        {useCase}
                      </Label>
                    </div>
                  ))}
                </div>
                
                {formData.useCase === 'Other' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-4 rounded-lg bg-muted/20"
                  >
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
                  </motion.div>
                )}
              </div>
              
              <div className="flex items-start border-t border-gray-200 pt-6">
                <div className="flex items-center h-5">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacy}
                    onCheckedChange={(checked) => handleCheckboxChange(checked === true, 'privacy')}
                    required
                    className={`focus:ring-${city || 'primary'} h-4 w-4 text-${city || 'primary'}`}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label htmlFor="privacy" className="font-medium text-gray-700">
                    I agree to the <a href="#" className={`${cityTextClass} hover:text-primary/80 underline`}>Privacy Policy</a> and <a href="#" className={`${cityTextClass} hover:text-primary/80 underline`}>Terms of Service</a>.
                  </Label>
                </div>
              </div>
              
              <AnimatedButton
                type="submit"
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-md text-base font-medium text-white bg-${city || 'primary'} hover:bg-${city || 'primary'}/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${city || 'primary'} w-full`}
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
          className="absolute -bottom-10 -right-10 opacity-5 w-40 h-40"
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
          className="absolute -top-10 -left-10 opacity-5 w-40 h-40"
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
