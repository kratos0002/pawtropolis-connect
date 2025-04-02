
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: string;
  name: string;
  petType: string;
  city: string;
  quote: string;
  rating: number;
  avatarUrl: string;
}

interface CityStats {
  owners: number;
  businesses: number;
  features: number;
}

const SocialProof = () => {
  const { city } = useCity();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [citySpecificStats, setCitySpecificStats] = useState<CityStats>({
    owners: 0,
    businesses: 0,
    features: 0
  });
  
  // City-specific testimonials
  const testimonials: Record<string, Testimonial[]> = {
    amsterdam: [
      {
        id: "am1",
        name: "Sophie van der Berg",
        petType: "Dog",
        city: "Amsterdam",
        quote: "PawConnect helped me find the perfect dog walker in my neighborhood. The local recommendations made all the difference!",
        rating: 5,
        avatarUrl: "/images/avatar-1.jpg"
      },
      {
        id: "am2",
        name: "Lars Jansen",
        petType: "Cat",
        city: "Amsterdam",
        quote: "I've connected with other cat owners in my building through PawConnect. Now our cats have regular playdates!",
        rating: 5,
        avatarUrl: "/images/avatar-2.jpg"
      },
      {
        id: "am3",
        name: "Nienke de Vries",
        petType: "Bird",
        city: "Amsterdam",
        quote: "Finding an avian vet in Amsterdam was so easy with PawConnect. The emergency vet locator is a lifesaver!",
        rating: 4,
        avatarUrl: "/images/avatar-3.jpg"
      }
    ],
    dublin: [
      {
        id: "db1",
        name: "Connor O'Sullivan",
        petType: "Dog",
        city: "Dublin",
        quote: "The pet-friendly parks map on PawConnect has transformed our daily walks. We've discovered so many new spots!",
        rating: 5,
        avatarUrl: "/images/avatar-4.jpg"
      },
      {
        id: "db2",
        name: "Aoife Murphy",
        petType: "Cat",
        city: "Dublin",
        quote: "As a new cat owner in Dublin, the local tips from experienced owners have been invaluable.",
        rating: 4,
        avatarUrl: "/images/avatar-5.jpg"
      },
      {
        id: "db3",
        name: "Sean Byrne",
        petType: "Rabbit",
        city: "Dublin",
        quote: "Finally found an exotic pet community in Dublin! PawConnect connected me with other rabbit owners nearby.",
        rating: 5,
        avatarUrl: "/images/avatar-6.jpg"
      }
    ],
    calgary: [
      {
        id: "cg1",
        name: "Jennifer Fraser",
        petType: "Dog",
        city: "Calgary",
        quote: "The winter pet care resources on PawConnect are perfect for Calgary's climate. So helpful!",
        rating: 5,
        avatarUrl: "/images/avatar-7.jpg"
      },
      {
        id: "cg2",
        name: "Michael Chen",
        petType: "Cat",
        city: "Calgary",
        quote: "I've made great connections with other pet owners in my neighborhood. My cat has more friends than I do now!",
        rating: 4,
        avatarUrl: "/images/avatar-8.jpg"
      },
      {
        id: "cg3",
        name: "Sarah Williams",
        petType: "Dog",
        city: "Calgary",
        quote: "The local business discounts through PawConnect have saved me so much on pet supplies and grooming.",
        rating: 5,
        avatarUrl: "/images/avatar-9.jpg"
      }
    ],
    default: [
      {
        id: "df1",
        name: "Alex Johnson",
        petType: "Dog",
        city: "Beta Tester",
        quote: "PawConnect has transformed how I care for my pets. The local resources and community are fantastic!",
        rating: 5,
        avatarUrl: "/images/avatar-10.jpg"
      },
      {
        id: "df2",
        name: "Jamie Smith",
        petType: "Cat",
        city: "Beta Tester",
        quote: "I've connected with so many pet owners in my area. Great for both me and my cat!",
        rating: 5,
        avatarUrl: "/images/avatar-11.jpg"
      },
      {
        id: "df3",
        name: "Taylor Wong",
        petType: "Reptile",
        city: "Beta Tester",
        quote: "Even as an exotic pet owner, I found a community. The specialized advice has been invaluable.",
        rating: 4,
        avatarUrl: "/images/avatar-12.jpg"
      }
    ]
  };
  
  // Get city-specific testimonials or default ones
  const cityTestimonials = (city && testimonials[city]) ? testimonials[city] : testimonials.default;
  
  // City-specific stats
  const stats: Record<string, CityStats> = {
    amsterdam: { owners: 437, businesses: 28, features: 42 },
    dublin: { owners: 389, businesses: 23, features: 36 },
    calgary: { owners: 412, businesses: 26, features: 39 },
    default: { owners: 1200, businesses: 75, features: 120 }
  };
  
  // Animate the counter
  useEffect(() => {
    if (isInView) {
      const targetStats = (city && stats[city]) ? stats[city] : stats.default;
      let startTime: number | null = null;
      const duration = 2000; // Animation duration in ms
      
      const animateStats = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCitySpecificStats({
          owners: Math.floor(progress * targetStats.owners),
          businesses: Math.floor(progress * targetStats.businesses),
          features: Math.floor(progress * targetStats.features)
        });
        
        if (progress < 1) {
          requestAnimationFrame(animateStats);
        }
      };
      
      requestAnimationFrame(animateStats);
    }
  }, [isInView, city]);
  
  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} 
      />
    ));
  };
  
  return (
    <section 
      ref={ref}
      className="py-20 bg-muted/30" 
      aria-label="Social proof section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} 
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            What Pet Owners Are Saying
          </motion.h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {cityTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/3">
                  <Card className="h-full border shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatarUrl} />
                          <AvatarFallback>{testimonial.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">{testimonial.petType} owner, {testimonial.city}</p>
                        </div>
                      </div>
                      
                      <blockquote className="text-muted-foreground mb-4 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex">
                        {renderStars(testimonial.rating)}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-4">
              <CarouselPrevious className="static translate-y-0 left-auto" />
              <CarouselNext className="static translate-y-0 right-auto" />
            </div>
          </Carousel>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6 bg-background rounded-lg shadow-sm border">
            <h3 className="text-4xl font-bold text-primary mb-2">{citySpecificStats.owners}</h3>
            <p className="text-muted-foreground">Pet Owners Already Waiting</p>
          </div>
          
          <div className="p-6 bg-background rounded-lg shadow-sm border">
            <h3 className="text-4xl font-bold text-primary mb-2">{citySpecificStats.businesses}</h3>
            <p className="text-muted-foreground">Local Businesses Partnered</p>
          </div>
          
          <div className="p-6 bg-background rounded-lg shadow-sm border">
            <h3 className="text-4xl font-bold text-primary mb-2">{citySpecificStats.features}</h3>
            <p className="text-muted-foreground">Features Suggested by Community</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
