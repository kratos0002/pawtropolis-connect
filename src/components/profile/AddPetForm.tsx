
import React, { useState } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Upload, Cat, Dog, Bird, Fish, AlertCircle } from 'lucide-react';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { Toggle } from "@/components/ui/toggle";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const petSchema = z.object({
  name: z.string().min(2, { message: "Pet name must be at least 2 characters" }),
  type: z.enum(["dog", "cat", "bird", "fish", "other"]),
  breed: z.string().min(2, { message: "Breed must be at least 2 characters" }),
  age: z.coerce.number().min(0, { message: "Age must be a positive number" }).max(50, { message: "Age must be less than 50" }),
  bio: z.string().max(500, { message: "Bio cannot be more than 500 characters" }),
});

type PetFormValues = z.infer<typeof petSchema>;

interface AddPetFormProps {
  onAddPet?: (pet: PetFormValues) => void;
  children?: React.ReactNode;
}

const AddPetForm: React.FC<AddPetFormProps> = ({ onAddPet, children }) => {
  const { city } = useCity();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const form = useForm<PetFormValues>({
    defaultValues: {
      name: "",
      type: "dog",
      breed: "",
      age: 0,
      bio: "",
    },
  });

  const petIcons = {
    dog: <Dog className="h-5 w-5" />,
    cat: <Cat className="h-5 w-5" />,
    bird: <Bird className="h-5 w-5" />,
    fish: <Fish className="h-5 w-5" />,
    other: <Plus className="h-5 w-5" />,
  };

  // Determine color accents based on city
  const cityBgClass = cn(
    city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
    city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
    city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
    !city && 'bg-primary hover:bg-primary/90'
  );

  const cityTextClass = cn(
    city === 'amsterdam' && 'text-amsterdam',
    city === 'dublin' && 'text-dublin',
    city === 'calgary' && 'text-calgary',
    !city && 'text-primary'
  );
  
  const cityBorderClass = cn(
    city === 'amsterdam' && 'border-amsterdam',
    city === 'dublin' && 'border-dublin',
    city === 'calgary' && 'border-calgary',
    !city && 'border-primary'
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError(null);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Verify file type
      if (!file.type.match('image.*')) {
        setImageError('Please select an image file');
        return;
      }
      
      // Verify file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageError('Image must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: PetFormValues) => {
    if (!selectedImage) {
      setImageError('Please upload a pet photo');
      return;
    }
    
    if (onAddPet) {
      onAddPet({
        ...data,
        // Additional fields could be added here if needed
      });
    }
    
    // Show success toast
    toast({
      title: "Pet Added!",
      description: `${data.name} has been added to your profile.`,
    });
    
    // Reset the form
    form.reset();
    setSelectedImage(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <Plus className={cn("mr-2 h-5 w-5", cityTextClass)} />
            Add New Pet
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
            {/* Pet Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="pet-photo" className="block">Pet Photo</Label>
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors",
                  imageError ? "border-destructive" : "border-muted",
                  selectedImage && "border-solid"
                )}
              >
                {selectedImage ? (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Pet preview" 
                      className="mx-auto max-h-48 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full hover:bg-black/90 transition-colors"
                    >
                      <Plus className="h-4 w-4 rotate-45" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <Upload className="h-10 w-10 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-1">Click or drag to upload</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or GIF (max. 5MB)</p>
                  </div>
                )}
                <Input
                  id="pet-photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              {imageError && (
                <div className="flex items-center text-destructive text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>{imageError}</span>
                </div>
              )}
            </div>
            
            {/* Pet Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Buddy, Luna, Max..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Pet Type */}
            <div className="space-y-2">
              <Label>Pet Type</Label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(petIcons) as Array<keyof typeof petIcons>).map((type) => (
                  <Toggle
                    key={type}
                    pressed={form.watch("type") === type}
                    onPressedChange={() => form.setValue("type", type)}
                    className={cn(
                      "capitalize flex-1 min-w-24",
                      form.watch("type") === type && cityBgClass,
                      form.watch("type") === type && "text-white"
                    )}
                  >
                    {petIcons[type]}
                    <span className="ml-2">{type}</span>
                  </Toggle>
                ))}
              </div>
            </div>
            
            {/* Breed */}
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Labrador, Siamese, Parakeet..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (years)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" step="0.5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your pet's personality, likes and dislikes..." 
                      className="resize-none h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <AnimatedButton 
                type="submit" 
                className={cityBgClass}
                hoverEffect="lift"
              >
                Add Pet
              </AnimatedButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPetForm;
