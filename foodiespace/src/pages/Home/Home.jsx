import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import HeroSection from '../../components/HeroSection/HeroSection';
import SectionBody from '../../wrappers/SectionBody';
import { DataContext } from '../../context/DataContext/DataContext';
import { IoSparkles } from 'react-icons/io5';

import ReviewCard from '../../components/ReviewCard/ReviewCard';
import { FaClipboard, FaFire, FaHeart, FaStar, FaUsers } from 'react-icons/fa';

const Home = () => {
  const { reviewsData } = useContext(DataContext);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  // Get top 6 reviews by star rating
  useEffect(() => {
    if (reviewsData && reviewsData.length > 0) {
      const sorted = [...reviewsData]
        .sort((a, b) => {
          // Sort by rating descending, then by date descending
          if (b.starRating !== a.starRating) {
            return b.starRating - a.starRating;
          }
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, 6);
      setFeaturedReviews(sorted);
      setLoadingFeatured(false);
    }
  }, [reviewsData]);

  // Calculate community stats
  const totalReviews = reviewsData?.length || 0;
  const totalFavorites =
    reviewsData?.reduce((sum, review) => sum + (review.isFavoriteBy?.length || 0), 0) || 0;

  return (
    <div>
      <HeroSection />

      {/* Featured Reviews Section */}
      <SectionBody>
        <div className="my-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-2">
              <FaStar className="text-yellow-400" size={32} />
              Top Rated Reviews
            </h2>
            <p className="text-gray-600 text-lg">
              Discover the most loved food experiences from our community
            </p>
          </div>

          {loadingFeatured ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : featuredReviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reviews yet. Be the first to share!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredReviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/all-reviews" className="btn btn-primary btn-lg gap-2">
              <FaFire size={18} />
              View All Reviews
            </Link>
          </div>
        </div>
      </SectionBody>

      {/* Community Highlights Section */}
      <div className="bg-linear-to-r from-primary to-primary-focus py-12 text-white">
        <SectionBody>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold mb-3 flex items-center justify-center gap-2">
              <IoSparkles size={32} />
              Our Community
            </h2>
            <p className="text-lg opacity-90">
              Join thousands of food lovers sharing authentic experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Reviews Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all duration-300">
              <div className="text-5xl mb-4">
                <FaClipboard className="mx-auto" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{totalReviews}+</h3>
              <p className="text-lg">Authentic Reviews</p>
              <p className="text-sm opacity-75 mt-2">Real experiences from real food lovers</p>
            </div>

            {/* Total Favorites Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all duration-300">
              <div className="text-5xl mb-4">
                <FaHeart className="mx-auto text-red-400" size={48} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{totalFavorites}+</h3>
              <p className="text-lg">Favorite Marks</p>
              <p className="text-sm opacity-75 mt-2">Recipes saved for future adventures</p>
            </div>

            {/* Join Community Card */}
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-opacity-20 transition-all duration-300">
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

      {/* How It Works Section */}
      <SectionBody>
        <div className="my-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-primary mb-3 flex items-center justify-center gap-2">
              <FaFire size={32} />
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Join our food-loving community in 3 simple steps
            </p>
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
    </div>
  );
};

export default Home;
