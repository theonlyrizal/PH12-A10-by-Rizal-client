import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import TopRatedSection from '../../components/TopRatedSection/TopRatedSection';
import CommunitySection from '../../components/CommunitySection/CommunitySection';
import HowItWorksSection from '../../components/HowItWorksSection/HowItWorksSection';
import HeroSectionAlt from '../../components/HeroSection/HeroSectionAlt';
import FeaturesSection from '../../components/FeaturesSection/FeaturesSection';
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection';
import StatisticsSection from '../../components/StatisticsSection/StatisticsSection';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import NewsletterSection from '../../components/NewsletterSection/NewsletterSection';
import FAQPreviewSection from '../../components/FAQPreviewSection/FAQPreviewSection';
import CTASection from '../../components/CTASection/CTASection';

const Home = () => {
  return (
    <div>
      {/* Section 1: Hero */}
      <HeroSectionAlt/>
      
      {/* Section 2: Features */}
      <FeaturesSection />
      
      {/* Section 3: Top Rated Reviews */}
      <TopRatedSection />
      
      {/* Section 4: Categories */}
      <CategoriesSection />
      
      {/* Section 5: Statistics */}
      <StatisticsSection />
      
      {/* Section 6: How It Works */}
      <HowItWorksSection />
      
      {/* Section 7: Testimonials */}
      <TestimonialsSection />
      
      {/* Section 8: Community */}
      <CommunitySection />
      
      {/* Section 9: Newsletter */}
      <NewsletterSection />
      
      {/* Section 10: FAQ Preview / CTA */}
      <FAQPreviewSection />
      <CTASection />
    </div>
  );
};

export default Home;
