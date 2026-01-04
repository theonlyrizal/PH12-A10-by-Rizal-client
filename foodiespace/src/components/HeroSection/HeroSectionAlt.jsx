import React from 'react';
import { Link } from 'react-router';
import { FaChevronDown, FaPen, FaSearch } from 'react-icons/fa';
import gallery1 from '../../assets/images/gallery-1.jpg';
import gallery2 from '../../assets/images/gallery-2.jpg';
import gallery3 from '../../assets/images/gallery-3.jpg';

const HeroSectionAlt = () => {
  const scrollToNextSection = () => {
    window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[60vh] max-h-[70vh] py-12 bg-gradient-to-b from-primary via-primary to-base-100 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        {/* Hero Text */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in">
            Discover Amazing Food
          </h1>
          <p className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
            Share your food experiences and explore authentic reviews from our community of food enthusiasts
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/add-review"
              className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none rounded-full gap-2 shadow-lg"
            >
              <FaPen /> Write a Review
            </Link>
            <Link
              to="/all-reviews"
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary rounded-full gap-2"
            >
              <FaSearch /> Browse Reviews
            </Link>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="h-48 md:h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={gallery1}
              alt="Delicious Food"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-48 md:h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={gallery2}
              alt="Food Gallery"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-48 md:h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={gallery3}
              alt="Food Gallery"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-80 hover:opacity-100 transition-opacity scroll-indicator cursor-pointer"
        aria-label="Scroll to next section"
      >
        <FaChevronDown className="text-4xl" />
      </button>
    </div>
  );
};

export default HeroSectionAlt;
