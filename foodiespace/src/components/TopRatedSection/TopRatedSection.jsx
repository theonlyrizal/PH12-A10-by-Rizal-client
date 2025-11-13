import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import SectionBody from '../../wrappers/SectionBody';
import { DataContext } from '../../context/DataContext/DataContext';
import ReviewCard from '../ReviewCard/ReviewCard';
import { FaStar, FaFire } from 'react-icons/fa';

const TopRatedSection = () => {
  const { reviewsData } = useContext(DataContext);
  const [featuredReviews, setFeaturedReviews] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    if (reviewsData && reviewsData.length > 0) {
      const sorted = [...reviewsData]
        .sort((a, b) => {
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

  return (
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
  );
};

export default TopRatedSection;
