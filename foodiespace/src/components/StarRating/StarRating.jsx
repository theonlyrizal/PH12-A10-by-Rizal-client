import React from 'react';
import { Rating } from 'next-flex-rating';

const StarRating = ({ value, onChange }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">
          Star Rating
          <span className="text-red-500 ml-1">*</span>
        </span>
      </label>
      <div className="flex items-center gap-4">
        <Rating value={value} onChange={onChange} />
        {value > 0 && <span className="ml-4 font-semibold text-yellow-500">{value} / 5</span>}
      </div>
    </div>
  );
};

export default StarRating;
