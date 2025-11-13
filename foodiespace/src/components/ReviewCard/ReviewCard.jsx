import React, { useContext, useState } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const ReviewCard = ({ review, onFavoriteChange }) => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [isFavoring, setIsFavoring] = useState(false);

  const {
    _id,
    foodName,
    foodImage,
    restaurantName,
    restaurantLocation,
    starRating,
    reviewText,
    userName,
    createdAt,
    isFavoriteBy = [],
  } = review;

  const isFavorite = user && isFavoriteBy.includes(user.email);

  const handleFavorite = async () => {
    if (!user) {
      toast.warn('Please login to add favorites');
      return;
    }

    setIsFavoring(true);
    try {
      const token = await user.getIdToken();
      await axiosInstance.patch(
        `/reviews/${_id}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (onFavoriteChange) {
        onFavoriteChange(_id);
      }

      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update favorite');
      console.error('Error updating favorite:', err);
    } finally {
      setIsFavoring(false);
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-sm hover:shadow-md transition-all duration-300">
      <figure className="lg:w-1/3">
        <img src={foodImage} alt={foodName} className="w-full h-full object-cover" />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-primary">{foodName}</h2>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">{restaurantName}</span> — {restaurantLocation}
        </p>

        <div className="flex items-center gap-2 my-2">
          {[...Array(starRating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
        </div>

        <p className="text-base text-gray-700 italic">"{reviewText}"</p>

        <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
          <p>
            By <span className="font-medium text-gray-700">{userName}</span>
          </p>
          <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>

        <div className="card-actions justify-end gap-2">
          <button
            onClick={handleFavorite}
            disabled={isFavoring}
            className={`btn btn-sm ${isFavorite ? 'btn-error' : 'btn-outline'} gap-2`}
          >
            <FaHeart size={14} />
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
          </button>
          <Link to={`/reviews/${_id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
