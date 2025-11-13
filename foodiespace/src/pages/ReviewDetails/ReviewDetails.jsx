import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router';
import SectionBody from '../../wrappers/SectionBody';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { FaHeart, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ReviewDetails = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favoring, setFavoring] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/reviews/${id}`);
        setReview(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load review');
        console.error('Fetch review error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchReview();
  }, [id, axiosInstance]);

  const handleFavorite = async () => {
    if (!user) {
      toast.warn('Please login to add favorites');
      return;
    }

    setFavoring(true);
    try {
      const token = await user.getIdToken();
      await axiosInstance.patch(
        `/reviews/${id}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refresh review
      const { data } = await axiosInstance.get(`/reviews/${id}`);
      setReview(data);

      toast.success('Favorite updated');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update favorite');
      console.error('Favorite error:', err);
    } finally {
      setFavoring(false);
    }
  };

  if (loading) {
    return (
      <SectionBody>
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </SectionBody>
    );
  }

  if (error) {
    return (
      <SectionBody>
        <div className="alert alert-error my-5">
          <div>{error}</div>
        </div>
      </SectionBody>
    );
  }

  if (!review) {
    return (
      <SectionBody>
        <div className="text-center py-12">No review found.</div>
      </SectionBody>
    );
  }

  const isFavorite = user && review.isFavoriteBy?.includes(user.email);

  return (
    <SectionBody>
      <div className="max-w-4xl mx-auto bg-base-100 shadow-md rounded-md p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={review.foodImage}
            alt={review.foodName}
            className="w-full md:w-1/3 h-64 object-cover rounded"
          />

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">{review.foodName}</h1>
            <p className="text-sm text-gray-500 mb-2">
              <span className="font-semibold">{review.restaurantName}</span> —{' '}
              {review.restaurantLocation}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <FaStar className="text-yellow-400" />
              <span className="font-bold">{review.starRating}/5</span>
            </div>

            <p className="text-gray-700 italic mb-4">"{review.reviewText}"</p>

            <div className="flex items-center gap-3">
              <button
                onClick={handleFavorite}
                disabled={favoring}
                className={`btn ${isFavorite ? 'btn-error' : 'btn-outline'} gap-2`}
              >
                <FaHeart /> {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </button>

              <Link to="/all-reviews" className="btn btn-ghost">
                Back to all reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionBody>
  );
};

export default ReviewDetails;
