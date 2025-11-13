import React from 'react';
import SectionBody from '../../wrappers/SectionBody';
import ReviewCard from '../ReviewCard/ReviewCard';

const ReviewsContainer = ({ reviews }) => {
  return (
    <SectionBody>
      <div className="grid grid-cols-1 gap-4 py-5">
        {reviews.map((review) => (
          <ReviewCard key={review.createdAt} review={review} />
        ))}
      </div>
    </SectionBody>
  );
};

export default ReviewsContainer;
