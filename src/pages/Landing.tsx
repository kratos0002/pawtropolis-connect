
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useCity } from '@/context/CityContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ValueProposition from '@/components/landing/ValueProposition';
import Roadmap from '@/components/landing/Roadmap';
import FeedbackSection from '@/components/landing/FeedbackSection';
import FeatureVoting from '@/components/landing/FeatureVoting';
import SocialProof from '@/components/landing/SocialProof';
import CallToAction from '@/components/landing/CallToAction';

const Landing = () => {
  const { city, setCity } = useCity();
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16">
        <HeroSection />
        <ValueProposition />
        <Roadmap />
        <FeedbackSection />
        <FeatureVoting />
        <SocialProof />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
