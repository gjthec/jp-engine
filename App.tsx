
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TechStack } from './components/TechStack';
import { Features } from './components/Features';
import { Credentials } from './components/Credentials';
import { Portfolio } from './components/Portfolio';
import { HowItWorks } from './components/HowItWorks';
import { CaseStudies } from './components/CaseStudies';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { GeminiAIAssistant } from './components/GeminiAIAssistant';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] selection:bg-blue-500/30 selection:text-white relative">
      <div className="relative z-10">
        <Header scrolled={scrolled} />
        
        <main>
          <Hero />
          <TechStack />
          <Features />
          <Credentials />
          <Portfolio />
          <HowItWorks />
          <CaseStudies />
          <FAQ />
        </main>

        <Footer />
        <GeminiAIAssistant />
      </div>
    </div>
  );
};

export default App;
