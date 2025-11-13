import React from 'react';
import { Link } from 'react-router';
import SectionBody from '../../wrappers/SectionBody';
import { FaFire, FaUsers, FaClipboard, FaHeart } from 'react-icons/fa';

const HowItWorksSection = () => {
  return (
    <SectionBody>
      <div className="my-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-2">
            <FaFire size={32} />
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">Join our food-loving community in 3 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="card bg-base-100 shadow-lg border-2 border-primary border-opacity-20 hover:shadow-xl transition-shadow">
            <div className="card-body text-center">
              <div className="text-6xl mb-4 text-primary">
                <FaUsers className="mx-auto" size={48} />
              </div>
              <h3 className="card-title justify-center text-2xl">Sign Up</h3>
              <p className="text-gray-600">
                Create your account and join our growing community of food enthusiasts
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card bg-base-100 shadow-lg border-2 border-primary border-opacity-20 hover:shadow-xl transition-shadow">
            <div className="card-body text-center">
              <div className="text-6xl mb-4 text-primary">
                <FaClipboard className="mx-auto" size={48} />
              </div>
              <h3 className="card-title justify-center text-2xl">Share Reviews</h3>
              <p className="text-gray-600">
                Post your honest food experiences with photos, ratings, and descriptions
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card bg-base-100 shadow-lg border-2 border-primary border-opacity-20 hover:shadow-xl transition-shadow">
            <div className="card-body text-center">
              <div className="text-6xl mb-4 text-primary">
                <FaHeart className="mx-auto text-red-500" size={48} />
              </div>
              <h3 className="card-title justify-center text-2xl">Save Favorites</h3>
              <p className="text-gray-600">
                Mark your favorite reviews and build your personal collection
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 text-lg mb-6">
            Ready to discover amazing food? Join FoodieSpace today!
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started Now
          </Link>
        </div>
      </div>
    </SectionBody>
  );
};

export default HowItWorksSection;
