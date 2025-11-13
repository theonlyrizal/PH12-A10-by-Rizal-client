import React from 'react';
import SectionBody from '../../wrappers/SectionBody';
import ReviewCard from '../ReviewCard/ReviewCard';
import { Link } from 'react-router';

const ReviewsContainer = ({ reviews, emptyMessage }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <SectionBody>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {emptyMessage || 'No reviews available'}
          </h2>
          <p className="text-gray-600 mb-6">
            {emptyMessage
              ? 'Try adjusting your search or filters'
              : 'Start sharing your food experiences!'}
          </p>
          {!emptyMessage && (
            <Link to="/add-review" className="btn btn-primary">
              ✍️ Write Your First Review
            </Link>
          )}
        </div>
      </SectionBody>
    );
  }

  return (
    <SectionBody>
      <div className="grid grid-cols-1 gap-6 py-5">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </SectionBody>
  );
};

export default ReviewsContainer;
