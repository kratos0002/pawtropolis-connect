import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { toast } from '@/hooks/use-toast';
import { CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AnimatedButton from '@/components/ui/AnimatedButton';

// Define the form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your full name" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  city: z.string().min(1, { message: "Please select your city" }),
  otherCity: z.string().optional(),
  petTypes: z.array(z.string()).min(1, { message: "Please select at least one pet type" }),
  features: z.string().min(50, { message: "Please provide at least 50 characters of feedback" }),
  usageType: z.string().min(1, { message: "Please select how you would use PawConnect" }),
  otherUsage: z.string().optional(),
  privacy: z.boolean().refine(val => val === true, { message: "You must agree to receive updates" })
});

type FormValues = z.infer<typeof formSchema>;

const petOptions = [
  { id: "dog", label: "Dog" },
  { id: "cat", label: "Cat" },
  { id: "bird", label: "Bird" },
  { id: "fish", label: "Fish" },
  { id: "reptile", label: "Reptile" },
  { id: "small_mammal", label: "Small mammal" },
  { id: "other", label: "Other" }
];

const usageOptions = [
  { id: "finding_services", label: "Finding pet services" },
  { id: "meeting_owners", label: "Meeting other pet owners" },
  { id: "discovering_locations", label: "Discovering pet-friendly locations" },
  { id: "learning_regulations", label: "Learning about local pet regulations" },
  { id: "other", label: "Other" }
];

const FeedbackSection = () => {
  const { city } = useCity();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      city: city || "",
      otherCity: "",
      petTypes: [],
      features: "",
      usageType: "",
      otherUsage: "",
      privacy: false
    }
  });
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Show success toast
      toast({
        title: "Thank you for your feedback!",
        description: `We've added you to our waitlist and your feedback will help shape PawConnect in ${data.city === 'other' ? data.otherCity : data.city}.`,
        variant: "success",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  // Watch for form values that affect conditional fields
  const selectedCity = form.watch("city");
  const selectedUsage = form.watch("usageType");
  
  return (
    <section 
      ref={ref}
      className="py-20 relative bg-muted/20" 
      aria-label="Feedback section"
    >
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ 
          backgroundImage: "url('/images/diverse-pets.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Shape PawConnect's Future
          </motion.h2>
          
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your input directly influences what we build next
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-3xl mx-auto"
        >
          <Card className="border shadow-sm bg-card/95 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              {isSuccess ? (
                <div className="py-10 flex flex-col items-center justify-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    We've added you to our waitlist and your feedback will help shape PawConnect.
                  </p>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Email Field */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* City Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className={selectedCity === 'other' ? 'md:col-span-1' : 'md:col-span-2'}>
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your city" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="amsterdam">Amsterdam</SelectItem>
                                  <SelectItem value="dublin">Dublin</SelectItem>
                                  <SelectItem value="calgary">Calgary</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Other City Field (conditional) */}
                      {selectedCity === 'other' && (
                        <FormField
                          control={form.control}
                          name="otherCity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Specify City</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    {/* Pet Types */}
                    <FormField
                      control={form.control}
                      name="petTypes"
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel>Pet Type (select all that apply)</FormLabel>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                            {petOptions.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name="petTypes"
                                render={({ field }) => {
                                  return (
                                    <FormItem key={option.id} className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(option.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, option.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== option.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Feature Feedback */}
                    <FormField
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What features would you love to see?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us what features would make PawConnect most useful for you and your pets..."
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Please provide at least 50 characters of feedback
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Usage Type */}
                    <FormField
                      control={form.control}
                      name="usageType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>How would you use PawConnect?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {usageOptions.map((option) => (
                                <FormItem 
                                  key={option.id} 
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={option.id} />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {option.label}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Other Usage Field (conditional) */}
                    {selectedUsage === 'other' && (
                      <FormField
                        control={form.control}
                        name="otherUsage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Please specify how you would use PawConnect</FormLabel>
                            <FormControl>
                              <Input placeholder="Please describe..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    {/* Privacy Agreement */}
                    <FormField
                      control={form.control}
                      name="privacy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-normal cursor-pointer">
                              I agree to receive updates about PawConnect
                            </FormLabel>
                            <FormDescription>
                              We'll keep you informed about our launch and new features
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <AnimatedButton
                      type="submit"
                      className="w-full bg-[#FF6B6B] hover:bg-[#FF5252] text-white py-3"
                      disabled={isSubmitting}
                      hoverEffect="lift"
                    >
                      {isSubmitting ? "Sending..." : "Send Feedback & Join Waitlist"}
                    </AnimatedButton>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackSection;
