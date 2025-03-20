
import React, { createContext, useContext, useState, useEffect } from 'react';

type City = 'amsterdam' | 'dublin' | 'calgary' | null;

interface CityContextType {
  city: City;
  setCity: (city: City) => void;
  cityColor: string;
  cityLightColor: string;
  cityDarkColor: string;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCity] = useState<City>(() => {
    // Try to get city from localStorage on initial load
    const savedCity = localStorage.getItem('pawconnect-city');
    return (savedCity as City) || null;
  });

  // Updated color mappings for each city with warm tones
  const colorMap = {
    amsterdam: {
      main: '#E67E22', // Amsterdam warm orange
      light: '#F8E8D8',
      dark: '#D35400',
    },
    dublin: {
      main: '#2E8B57', // Dublin green with warm undertones
      light: '#E0F2E9',
      dark: '#1E5631',
    },
    calgary: {
      main: '#F39C12', // Calgary golden yellow
      light: '#FFF0DB',
      dark: '#D68910',
    },
  };

  // Default colors when no city is selected - warm orange
  const defaultColors = {
    main: '#E67E22',
    light: '#F8E8D8',
    dark: '#D35400',
  };

  // Get colors based on current city
  const colors = city ? colorMap[city] : defaultColors;

  // Save selected city to localStorage whenever it changes
  useEffect(() => {
    if (city) {
      localStorage.setItem('pawconnect-city', city);
    }
  }, [city]);

  return (
    <CityContext.Provider
      value={{
        city,
        setCity,
        cityColor: colors.main,
        cityLightColor: colors.light,
        cityDarkColor: colors.dark,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = (): CityContextType => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
