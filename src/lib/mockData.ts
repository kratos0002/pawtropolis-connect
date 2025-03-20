
import { PawPrint, DogIcon, Cat, Bird, Fish, ShoppingBag, Stethoscope, Scissors, Home, Utensils, Car, Heart, GraduationCap } from 'lucide-react';

// Mock user profiles
export const mockUsers = [
  {
    id: 1,
    name: 'Sophie Johnson',
    bio: 'Dog lover and outdoor enthusiast living in Amsterdam',
    city: 'amsterdam',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    pets: [1, 3]
  },
  {
    id: 2,
    name: 'Miguel Alvarez',
    bio: 'Cat dad and software engineer in Dublin',
    city: 'dublin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    pets: [2]
  },
  {
    id: 3,
    name: 'Emma Williams',
    bio: 'Veterinary assistant with a house full of rescues in Calgary',
    city: 'calgary',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
    pets: [4, 5, 6]
  }
];

// Mock pet profiles
export const mockPets = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    bio: 'Friendly and energetic, loves swimming in Amsterdam canals',
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    icon: DogIcon,
    ownerId: 1
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    breed: 'British Shorthair',
    age: 5,
    bio: 'Elegant and calm, enjoys watching Dublin rain from the windowsill',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    icon: Cat,
    ownerId: 2
  },
  {
    id: 3,
    name: 'Charlie',
    type: 'Bird',
    breed: 'Cockatiel',
    age: 2,
    bio: 'Talkative and musical, brightens up Amsterdam apartments',
    image: 'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    icon: Bird,
    ownerId: 1
  },
  {
    id: 4,
    name: 'Buddy',
    type: 'Dog',
    breed: 'Husky',
    age: 4,
    bio: 'High-energy companion, perfect for Calgary winters',
    image: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    icon: DogIcon,
    ownerId: 3
  },
  {
    id: 5,
    name: 'Oliver',
    type: 'Cat',
    breed: 'Maine Coon',
    age: 6,
    bio: 'Majestic and gentle giant, rules the Calgary household',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    icon: Cat,
    ownerId: 3
  },
  {
    id: 6,
    name: 'Bubbles',
    type: 'Fish',
    breed: 'Betta',
    age: 1,
    bio: 'Vibrant and peaceful, adds color to Calgary home office',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    icon: Fish,
    ownerId: 3
  }
];

// Mock service categories
export const serviceCategories = [
  { 
    id: 1, 
    name: 'Pet Shops', 
    icon: ShoppingBag, 
    description: 'Quality food, toys, and accessories'
  },
  { 
    id: 2, 
    name: 'Veterinary', 
    icon: Stethoscope, 
    description: 'Healthcare for your furry friends'
  },
  { 
    id: 3, 
    name: 'Grooming', 
    icon: Scissors, 
    description: 'Styling and care services'
  },
  { 
    id: 4, 
    name: 'Boarding', 
    icon: Home, 
    description: 'Safe stays while you\'re away'
  },
  { 
    id: 5, 
    name: 'Pet-Friendly Cafés', 
    icon: Utensils, 
    description: 'Eateries that welcome pets'
  },
  { 
    id: 6, 
    name: 'Pet Transport', 
    icon: Car, 
    description: 'Safe travel solutions'
  },
];

// Mock service providers
export const mockServiceProviders = [
  {
    id: 1,
    name: 'Amsterdam Pet Emporium',
    category: 1,
    city: 'amsterdam',
    address: 'Prinsengracht 263, Amsterdam',
    phone: '+31 20 123 4567',
    website: 'www.amsterdampets.nl',
    email: 'info@amsterdampets.nl',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1604148482093-d55d6fc62400?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    description: 'Premium pet supplies with organic food options and locally made accessories.',
    tags: ['Organic', 'Local Products', 'Wide Selection']
  },
  {
    id: 2,
    name: 'Dublin Animal Hospital',
    category: 2,
    city: 'dublin',
    address: '42 O\'Connell Street, Dublin',
    phone: '+353 1 234 5678',
    website: 'www.dublinanimalhospital.ie',
    email: 'care@dublinanimalhospital.ie',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1584059403045-941774a3b5de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    description: 'Full-service veterinary care with specialists in exotic pets and 24/7 emergency service.',
    tags: ['Emergency Care', 'Exotic Pets', 'Surgical Services']
  },
  {
    id: 3,
    name: 'Calgary Pawfect Grooming',
    category: 3,
    city: 'calgary',
    address: '123 Stephen Avenue, Calgary',
    phone: '+1 403 987 6543',
    website: 'www.pawfectgrooming.ca',
    email: 'appointments@pawfectgrooming.ca',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1581125691454-e76dd0dc41fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    description: 'Professional grooming services with specialty treatments and anxiety-free environments.',
    tags: ['Anxiety-Free', 'All Breeds', 'Natural Products']
  },
  {
    id: 4,
    name: 'Amsterdam Pet Hotel',
    category: 4,
    city: 'amsterdam',
    address: 'Overtoom 21, Amsterdam',
    phone: '+31 20 765 4321',
    website: 'www.amsterdampethotel.nl',
    email: 'stay@amsterdampethotel.nl',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    description: 'Luxury pet boarding with webcam access and daily activities in a canal house setting.',
    tags: ['Luxury', 'Webcam Access', 'Daily Activities']
  },
  {
    id: 5,
    name: 'The Dublin Dog Café',
    category: 5,
    city: 'dublin',
    address: '7 Temple Bar, Dublin',
    phone: '+353 1 876 5432',
    website: 'www.dublindogcafe.ie',
    email: 'woof@dublindogcafe.ie',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    description: 'Ireland\'s first dog-friendly café with special menus for both humans and canines.',
    tags: ['Pet Menu', 'Outdoor Seating', 'Social Events']
  },
  {
    id: 6,
    name: 'Calgary Pet Transit',
    category: 6,
    city: 'calgary',
    address: '456 Macleod Trail, Calgary',
    phone: '+1 403 123 7890',
    website: 'www.calgarypettransit.ca',
    email: 'rides@calgarypettransit.ca',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1540326676925-a7e7abdea580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    description: 'Safe and comfortable transportation for pets across the city and to vet appointments.',
    tags: ['Climate Controlled', 'Vet Visits', 'Airport Transfers']
  }
];

// Mock information hub articles
export const mockArticles = [
  {
    id: 1,
    title: 'Amsterdam Pet Regulations Guide',
    city: 'amsterdam',
    category: 'Legal',
    icon: GraduationCap,
    image: 'https://images.unsplash.com/photo-1605633561363-15a0c5b8f8c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Everything you need to know about pet ownership laws in Amsterdam including registration requirements.',
    content: 'Amsterdam has specific regulations for pet owners, including mandatory dog tax (hondenbelasting) and registration for certain breeds. All dogs must be microchipped and registered with the municipality within 14 days of acquisition. In public areas, dogs must be kept on leashes unless in designated dog parks (losloopgebieden). Dog owners are required to clean up after their pets, with potential fines for non-compliance. For cats, there are fewer regulations, but microchipping is still recommended for identification purposes. Exotic pet owners should be aware of CITES regulations and ensure their pets are legally obtained with proper documentation.',
    date: '2023-11-10',
    tags: ['Legal', 'Registration', 'Dog Tax']
  },
  {
    id: 2,
    title: 'Best Dog-Friendly Parks in Dublin',
    city: 'dublin',
    category: 'Recreation',
    icon: PawPrint,
    image: 'https://images.unsplash.com/photo-1548164806-9709e7660b5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover Dublin\'s top green spaces where your dogs can run, play and socialize freely.',
    content: 'Dublin offers numerous parks where dogs can enjoy off-leash recreation in beautiful surroundings. Phoenix Park, one of Europe\'s largest enclosed urban parks, provides vast spaces for dogs to explore, though they must be kept on leashes in certain wildlife areas. St. Anne\'s Park in Raheny features dedicated dog runs and scenic walking paths. Marlay Park in Rathfarnham offers extensive grounds and a dedicated dog park with agility equipment. Herbert Park in Ballsbridge is smaller but has a designated off-leash area and is centrally located. Bushy Park in Terenure provides a fenced dog park suitable for training and socialization. Remember that even in dog-friendly areas, owners are responsible for controlling their pets and cleaning up after them.',
    date: '2023-12-05',
    tags: ['Parks', 'Recreation', 'Dog-Friendly']
  },
  {
    id: 3,
    title: 'Calgary Winter Pet Care Tips',
    city: 'calgary',
    category: 'Health',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Essential advice for keeping your pets safe and comfortable during Calgary\'s cold winters.',
    content: 'Calgary winters present unique challenges for pet owners due to extreme cold temperatures and snow. Short-haired dogs and small breeds should wear insulated jackets during outdoor activities. Protect paws from ice and road salt with booties or paw wax, and clean paws after walks to remove potential toxins. Limit outdoor time during extreme cold snaps, particularly for elderly pets or those with health conditions. Maintain indoor humidity to prevent dry skin and keep pets away from antifreeze, which is toxic but has an attractive sweet taste. Groom regularly as indoor heating can cause skin dryness, and adjust food intake if activity levels decrease. Provide proper shelter for outdoor pets with insulated, wind-protected spaces, though bringing pets indoors during extreme weather is ideal. Watch for signs of hypothermia or frostbite such as shivering, lethargy, or discolored skin, and seek veterinary care immediately if concerned.',
    date: '2024-01-15',
    tags: ['Winter', 'Health', 'Safety']
  },
  {
    id: 4,
    title: 'Navigating Amsterdam\'s Pet-Friendly Public Transport',
    city: 'amsterdam',
    category: 'Transportation',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1565255310577-15af63aa9093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    excerpt: 'How to travel around Amsterdam with your pets using the city\'s comprehensive transport network.',
    content: 'Amsterdam\'s public transportation system accommodates pets with specific guidelines. On GVB trams, metros, and buses, small pets in carriers travel free, while larger dogs require a reduced-fare ticket (\'Dagkaart Hond\') and must be leashed. During peak hours, pets are permitted but discretion is advised in crowded vehicles. On NS trains, small pets in carriers travel free, larger dogs require a dog day ticket (€3.20), and service animals always travel free of charge. Ferries across the IJ allow pets free of charge, but they must be leashed. Taxis have individual policies, so calling ahead is recommended to confirm pet acceptance. When using transportation, ensure your pet is well-behaved and comfortable in public settings. During hot summer days, avoid traveling during peak hours as vehicles can become uncomfortably warm for pets. Always carry water, waste bags, and consider your pet\'s comfort and safety requirements throughout the journey.',
    date: '2023-10-20',
    tags: ['Transportation', 'Travel', 'Public Transport']
  },
  {
    id: 5,
    title: 'Dublin\'s Emergency Veterinary Services Guide',
    city: 'dublin',
    category: 'Health',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1584059304626-7ce21a5dbbd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    excerpt: 'A comprehensive list of 24/7 veterinary clinics and emergency services throughout Dublin.',
    content: 'Dublin offers several options for emergency veterinary care outside regular hours. UCD Veterinary Hospital in Belfield provides 24/7 emergency service with state-of-the-art facilities and specialists in various fields. Veterinary Emergency Hospital Dublin (VEHD) in Ballyowen operates 24/7 with a focus exclusively on emergencies and critical care. MiNight Vet in Cabra offers evening, overnight, and weekend emergency services when regular practices are closed. These facilities provide critical care, emergency surgery, diagnostic imaging, and laboratory services for urgent cases. Before an emergency occurs, save these contact numbers, know their locations, and discuss with your regular vet which emergency service they recommend. When possible, call ahead so the emergency team can prepare for your arrival. Bring your pet\'s medical records or contact details for your regular vet. Remember that emergency services prioritize patients based on severity, so non-critical cases may experience wait times.',
    date: '2023-09-30',
    tags: ['Veterinary', 'Emergency', 'Healthcare']
  },
  {
    id: 6,
    title: 'Calgary Pet-Friendly Housing Guide',
    city: 'calgary',
    category: 'Housing',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1574002332972-fd2e0f7f1ea9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Finding pet-friendly apartments and understanding rental regulations for pet owners in Calgary.',
    content: 'Calgary offers various pet-friendly housing options, but navigating the rental market requires understanding local policies. Many buildings permit pets with restrictions on type, size, and number. Typical pet deposits range from $250-500, separate from standard security deposits, and are potentially refundable depending on the lease agreement. Neighborhoods particularly pet-friendly include Kensington, Mission, and Bridgeland, with proximity to parks and pet services. When applying for rentals, create a "pet resume" including vaccination records, training certificates, and references from previous landlords. Understand building-specific rules regarding common areas and designated pet relief areas. Calgary has no city-wide restrictions on pet types in private housing, but individual landlords or condo boards may impose limitations. Always get pet agreements in writing as part of your lease. For condo owners, review the condo corporation bylaws regarding pets before purchasing, as these rules can be more restrictive than general apartments and may change with board decisions.',
    date: '2024-02-01',
    tags: ['Housing', 'Rentals', 'Pet-Friendly']
  }
];

export const cityDescriptions = {
  amsterdam: {
    title: "Amsterdam",
    subtitle: "Netherlands",
    description: "Discover Amsterdam's unique pet culture amid picturesque canals and bike-friendly streets. Connect with local pet owners in a city where dogs cruise in bicycle baskets and cats watch from historic windows.",
    image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    features: [
      "Extensive canal-side walking paths",
      "Numerous dog-friendly parks and cafés",
      "Pet-friendly public transportation"
    ]
  },
  dublin: {
    title: "Dublin",
    subtitle: "Ireland",
    description: "Experience Dublin's warm, pet-loving community in a city of literary heritage and green spaces. Join fellow pet owners in exploring the many parks and coastal walks that make Dublin a pet paradise.",
    image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    features: [
      "Expansive Phoenix Park and dog-friendly beaches",
      "Growing number of pet-welcoming pubs",
      "Active pet meetup communities"
    ]
  },
  calgary: {
    title: "Calgary",
    subtitle: "Canada",
    description: "Connect in Calgary's dynamic pet community, where urban amenities meet outdoor adventures. From river valley paths to mountain getaways, Calgary offers versatile experiences for pets and their owners.",
    image: "https://images.unsplash.com/photo-1513805579359-7e8b1b5e2b3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
    features: [
      "Extensive off-leash dog parks",
      "Year-round outdoor activities",
      "Robust pet service infrastructure"
    ]
  }
};
