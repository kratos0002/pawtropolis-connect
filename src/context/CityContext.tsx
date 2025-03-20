
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

  // Color mappings for each city
  const colorMap = {
    amsterdam: {
      main: '#1E88E5', // Amsterdam blue
      light: '#E4F0F6',
      dark: '#1565C0',
    },
    dublin: {
      main: '#26A69A', // Dublin green
      light: '#E0F2E9',
      dark: '#00796B',
    },
    calgary: {
      main: '#F57C00', // Calgary orange
      light: '#F9EBE0',
      dark: '#E65100',
    },
  };

  // Default colors when no city is selected
  const defaultColors = {
    main: '#1E88E5',
    light: '#E4F0F6',
    dark: '#1565C0',
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
