import React, { useContext } from 'react';
import SectionBody from '../../wrappers/SectionBody';
import { DataContext } from '../../context/DataContext/DataContext';
import { IoSparkles } from 'react-icons/io5';
import { FaClipboard, FaHeart, FaUsers } from 'react-icons/fa';

const CommunitySection = () => {
  const { reviewsData } = useContext(DataContext);

  const totalReviews = reviewsData?.length || 0;
  const totalFavorites =
    reviewsData?.reduce((sum, review) => sum + (review.isFavoriteBy?.length || 0), 0) || 0;

  return (
    <div className="bg-linear-to-r from-primary to-primary-focus py-12 text-white">
      <SectionBody>
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-3 flex items-center justify-center gap-2">
            <IoSparkles size={32} />
            Our Community
          </h2>
          <p className="text-lg text- opacity-90">
            Join thousands of food lovers sharing authentic experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Reviews Card */}
          <div className="bg-primary bg-opacity-10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all duration-300">
            <div className="text-5xl mb-4">
              <FaClipboard className="mx-auto" size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">{totalReviews}+</h3>
            <p className="text-lg">Authentic Reviews</p>
            <p className="text-sm opacity-75 mt-2">Real experiences from real food lovers</p>
          </div>

          {/* Total Favorites Card */}
          <div className="bg-primary bg-opacity-10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all duration-300">
            <div className="text-5xl mb-4">
              <FaHeart className="mx-auto text-red-400" size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">{totalFavorites}+</h3>
            <p className="text-lg">Favorite Marks</p>
            <p className="text-sm opacity-75 mt-2">Recipes saved for future adventures</p>
          </div>

          {/* Join Community Card */}
          <div className="bg-primary bg-opacity-10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all duration-300">
            <div className="text-5xl mb-4">
              <FaUsers className="mx-auto" size={48} />
            </div>
            <h3 className="text-2xl font-bold mb-2">Active</h3>
            <p className="text-lg">Food Enthusiasts</p>
            <p className="text-sm opacity-75 mt-2">Growing community of food explorers</p>
          </div>
        </div>
      </SectionBody>
    </div>
  );
};

export default CommunitySection;
