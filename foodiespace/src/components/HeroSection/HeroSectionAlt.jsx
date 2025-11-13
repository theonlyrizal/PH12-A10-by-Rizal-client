import React from 'react';
import gallery1 from '../../assets/images/gallery-1.jpg';
import gallery2 from '../../assets/images/gallery-2.jpg';
import gallery3 from '../../assets/images/gallery-3.jpg';

const HeroSectionAlt = () => {
  return (
    <div className="w-full py-12 bg-linear-to-b from-primary to-base-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Text */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Discover Amazing Food</h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Share your food experiences and explore reviews from our community
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={gallery1}
              alt="Delicious Food"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={gallery2}
              alt="Food Gallery"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={gallery3}
              alt="Food Gallery"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionAlt;
