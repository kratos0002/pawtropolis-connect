
import React, { useState } from 'react';
import { useCity } from '@/context/CityContext';
import { cn } from '@/lib/utils';
import { Plus, PlusCircle, UserPlus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/profile/ProfileCard';
import PetProfileCard from '@/components/profile/PetProfileCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import { mockUsers, mockPets } from '@/lib/mockData';

const Profile = () => {
  const { city } = useCity();
  const [selectedTab, setSelectedTab] = useState<'profile' | 'pets'>('profile');

  // Get mock data based on city
  const filteredUsers = mockUsers.filter(user => user.city === city);
  const currentUser = filteredUsers.length > 0 ? filteredUsers[0] : mockUsers[0];
  const userPets = mockPets.filter(pet => currentUser.pets.includes(pet.id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-16 mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row md:space-x-8">
            {/* Left Column - Profile Info */}
            <div className="md:w-1/3 space-y-6 mt-6 md:mt-0">
              <ProfileCard 
                id={currentUser.id}
                name={currentUser.name}
                bio={currentUser.bio}
                city={currentUser.city}
                avatar={currentUser.avatar}
                petCount={userPets.length}
                isCurrentUser={true}
              />
              
              <div className="rounded-xl overflow-hidden bg-card shadow-sm border p-4">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <AnimatedButton 
                    variant="outline" 
                    className="w-full justify-center"
                    hoverEffect="scale"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Find Pet Owners
                  </AnimatedButton>
                  
                  <AnimatedButton 
                    variant="outline" 
                    className="w-full justify-center"
                    hoverEffect="scale"
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Pet Profile
                  </AnimatedButton>
                </div>
              </div>
            </div>
            
            {/* Right Column - Pet Profiles */}
            <div className="md:w-2/3">
              <div className="border-b border-border mb-6">
                <div className="flex space-x-4">
                  <button
                    className={cn(
                      "px-4 py-2 font-medium text-sm border-b-2 -mb-px transition-colors",
                      selectedTab === 'profile' 
                        ? cn(
                            'border-current text-foreground',
                            city === 'amsterdam' && 'text-amsterdam border-amsterdam',
                            city === 'dublin' && 'text-dublin border-dublin',
                            city === 'calgary' && 'text-calgary border-calgary',
                            !city && 'text-primary border-primary'
                          )
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    )}
                    onClick={() => setSelectedTab('profile')}
                  >
                    Profile
                  </button>
                  <button
                    className={cn(
                      "px-4 py-2 font-medium text-sm border-b-2 -mb-px transition-colors",
                      selectedTab === 'pets' 
                        ? cn(
                            'border-current text-foreground',
                            city === 'amsterdam' && 'text-amsterdam border-amsterdam',
                            city === 'dublin' && 'text-dublin border-dublin',
                            city === 'calgary' && 'text-calgary border-calgary',
                            !city && 'text-primary border-primary'
                          )
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    )}
                    onClick={() => setSelectedTab('pets')}
                  >
                    Pets ({userPets.length})
                  </button>
                </div>
              </div>
              
              {selectedTab === 'profile' ? (
                <div className="space-y-6">
                  <div className="bg-card border shadow-sm rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                    <p className="text-muted-foreground mb-4">
                      Manage your personal information and preferences.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                        <input 
                          type="text" 
                          className="w-full p-2 border border-input rounded-md bg-background" 
                          defaultValue={currentUser.name}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Bio</label>
                        <textarea 
                          className="w-full p-2 border border-input rounded-md bg-background h-24" 
                          defaultValue={currentUser.bio}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Location</label>
                        <div className="w-full p-2 border border-input rounded-md bg-background flex items-center">
                          <span className="text-muted-foreground">{city?.charAt(0).toUpperCase() + city?.slice(1) || 'Select a city'}</span>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <AnimatedButton 
                          className={cn(
                            city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
                            city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
                            city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
                            !city && 'bg-primary'
                          )}
                          hoverEffect="lift"
                        >
                          Save Changes
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">My Pets</h2>
                    <AnimatedButton 
                      className={cn(
                        city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
                        city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
                        city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
                        !city && 'bg-primary'
                      )}
                      size="sm"
                      hoverEffect="scale"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Pet
                    </AnimatedButton>
                  </div>
                  
                  {userPets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {userPets.map(pet => (
                        <PetProfileCard
                          key={pet.id}
                          id={pet.id}
                          name={pet.name}
                          type={pet.type}
                          breed={pet.breed}
                          age={pet.age}
                          bio={pet.bio}
                          image={pet.image}
                          icon={pet.icon}
                          isOwner={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <PlusCircle className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No pets added yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Add your furry, feathery, or scaly friends to your profile.
                      </p>
                      <AnimatedButton 
                        className={cn(
                          city === 'amsterdam' && 'bg-amsterdam hover:bg-amsterdam-dark',
                          city === 'dublin' && 'bg-dublin hover:bg-dublin-dark',
                          city === 'calgary' && 'bg-calgary hover:bg-calgary-dark',
                          !city && 'bg-primary'
                        )}
                        hoverEffect="lift"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add First Pet
                      </AnimatedButton>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
