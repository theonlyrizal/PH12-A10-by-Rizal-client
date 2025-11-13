import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">
          Star Rating
          <span className="text-red-500 ml-1">*</span>
        </span>
      </label>
      <div className="flex items-center gap-2">
        {stars.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-all duration-200 hover:scale-110"
            aria-label={`${star} stars`}
          >
            <FaStar size={32} className={value >= star ? 'text-yellow-400' : 'text-gray-300'} />
          </button>
        ))}
        {value > 0 && <span className="ml-4 font-semibold text-yellow-500">{value} / 5</span>}
      </div>
    </div>
  );
};

export default StarRating;
