import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import TopRatedSection from '../../components/TopRatedSection/TopRatedSection';
import CommunitySection from '../../components/CommunitySection/CommunitySection';
import HowItWorksSection from '../../components/HowItWorksSection/HowItWorksSection';
import HeroSectionAlt from '../../components/HeroSection/HeroSectionAlt';

const Home = () => {
  return (
    <div>
      {/* <HeroSection /> */}
      <HeroSectionAlt/>
      <TopRatedSection />
      <CommunitySection />
      <HowItWorksSection />
    </div>
  );
};

export default Home;
