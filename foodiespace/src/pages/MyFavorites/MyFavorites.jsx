import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import SectionBody from '../../wrappers/SectionBody';
import { FaStar, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyFavorites = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && user?.uid) {
      const loadFavorites = async () => {
        try {
          setLoading(true);
          setError(null);

          const token = await user.getIdToken();
          const response = await axiosInstance.get('/reviews', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data && Array.isArray(response.data)) {
            const userFavorites = response.data.filter((review) =>
              review.isFavoriteBy?.includes(user.email)
            );
            setFavorites(userFavorites);
          } else {
            setFavorites([]);
          }
        } catch (err) {
          const errorMessage = err.response?.data?.message || 'Failed to load favorites';
          setError(errorMessage);
          console.error('Error fetching favorites:', err);
        } finally {
          setLoading(false);
        }
      };

      loadFavorites();
    }
  }, [user, authLoading, axiosInstance]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await user.getIdToken();
      const response = await axiosInstance.get('/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && Array.isArray(response.data)) {
        const userFavorites = response.data.filter((review) =>
          review.isFavoriteBy?.includes(user.email)
        );
        setFavorites(userFavorites);
      } else {
        setFavorites([]);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load favorites';
      setError(errorMessage);
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (reviewId) => {
    const result = await Swal.fire({
      title: 'Remove from Favorites?',
      text: 'Are you sure you want to remove this review from your favorites?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Remove',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const token = await user.getIdToken();

      await axiosInstance.patch(
        `/reviews/${reviewId}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('Removed from favorites');
      fetchFavorites();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove from favorites');
      console.error('Error removing favorite:', err);
    }
  };

  if (authLoading) {
    return (
      <SectionBody>
        <div className="flex flex-col items-center justify-center min-h-96 gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </SectionBody>
    );
  }

  if (!user) {
    return (
      <SectionBody>
        <div className="alert alert-warning max-w-md mx-auto my-8">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4v2m0 4v2M7.457 5.457a9 9 0 0111.086 0M5.5 12a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
              />
            </svg>
            <span>You must be logged in to view favorites.</span>
          </div>
        </div>
      </SectionBody>
    );
  }

  return (
    <SectionBody>
      <div className="flex flex-col justify-center items-center bg-primary p-5 my-5">
        <h1 className="text-secondary-content text-3xl font-bold">❤️ My Favorite Reviews</h1>
      </div>

      {error && (
        <div className="alert alert-error max-w-2xl mx-auto mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-96 gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-600 font-semibold">Loading favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🍽️</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">No Favorites Yet</h2>
          <p className="text-gray-600 mb-6">
            Start marking your favorite reviews to see them here!
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((review) => (
              <div
                key={review._id}
                className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <figure className="px-4 pt-4">
                  <img
                    src={review.foodImage}
                    alt={review.foodName}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title text-primary">{review.foodName}</h2>

                  <p className="text-sm text-gray-600 font-semibold">🏪 {review.restaurantName}</p>
                  <p className="text-sm text-gray-600">📍 {review.restaurantLocation}</p>

                  <div className="flex items-center gap-2 my-2">
                    {[...Array(review.starRating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" size={16} />
                    ))}
                    <span className="text-sm font-semibold text-yellow-500">
                      {review.starRating}/5
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-3 italic">"{review.reviewText}"</p>

                  <div className="text-xs text-gray-500 mt-3">
                    By {review.userName} • {new Date(review.createdAt).toLocaleDateString()}
                  </div>

                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleRemoveFavorite(review._id)}
                      className="btn btn-error btn-sm text-white"
                    >
                      <FaTrash size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SectionBody>
  );
};

export default MyFavorites;
