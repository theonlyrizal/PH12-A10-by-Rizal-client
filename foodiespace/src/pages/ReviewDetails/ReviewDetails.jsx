import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router';
import SectionBody from '../../wrappers/SectionBody';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { FaHeart, FaStar, FaArrowLeft, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
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
      {/* Hero Section with Image Background */}
      <div className="relative w-full h-96 md:h-[500px] bg-linear-to-b from-primary to-primary-focus overflow-hidden mb-12">
        <img
          src={review.foodImage}
          alt={review.foodName}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>

        {/* Back Button */}
        <Link
          to="/all-reviews"
          className="absolute top-6 left-6 btn btn-circle btn-lg btn-primary hover:scale-110 transition-transform shadow-lg"
        >
          <FaArrowLeft className="text-xl" />
        </Link>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">{review.foodName}</h1>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-2xl" />
            <p className="text-xl opacity-90">{review.restaurantName}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Review Details */}
          <div className="lg:col-span-2">
            {/* Rating Card */}
            <div className="card bg-base-200 shadow-lg mb-6">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="badge badge-lg badge-primary text-lg font-bold py-4 px-6">
                      <FaStar className="mr-2" /> {review.starRating}/5
                    </div>
                    <div>
                      <p className="text-sm opacity-70">Overall Rating</p>
                      <p className="text-lg font-semibold">
                        {'⭐'.repeat(Math.round(review.starRating))}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleFavorite}
                    disabled={favoring}
                    className={`btn btn-lg gap-2 ${isFavorite ? 'btn-error' : 'btn-outline'}`}
                  >
                    <FaHeart /> {isFavorite ? 'Favorited' : 'Favorite'}
                  </button>
                </div>
              </div>
            </div>

            {/* Review Text Card */}
            <div className="card bg-base-100 shadow-lg border border-base-300 mb-6">
              <div className="card-body">
                <h2 className="card-title text-2xl mb-4">Review</h2>
                <p className="text-lg leading-relaxed text-justify italic text-gray-700">
                  "{review.reviewText}"
                </p>
              </div>
            </div>

            {/* Restaurant Details Card */}
            <div className="card bg-base-100 shadow-lg border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-xl mb-4">Restaurant Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                    <MdLocationOn className="text-2xl text-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-sm opacity-70 font-semibold">Location</p>
                      <p className="text-lg">{review.restaurantLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                    <FaUser className="text-2xl text-primary mt-1 shrink-0" />
                    <div>
                      <p className="text-sm opacity-70 font-semibold">Reviewed by</p>
                      <p className="text-lg">{review.userName || 'Anonymous'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary Card */}
          <div>
            {/* Summary Card */}
            <div className="card bg-linear-to-br from-primary to-primary-focus shadow-2xl sticky top-24">
              <div className="card-body text-white">
                <h2 className="card-title text-white text-2xl mb-6">Summary</h2>

                <div className="divider divider-neutral"></div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm opacity-80 font-semibold">Dish Name</p>
                    <p className="text-xl font-bold wrap-break-word">{review.foodName}</p>
                  </div>

                  <div>
                    <p className="text-sm opacity-80 font-semibold">Restaurant</p>
                    <p className="text-xl font-bold wrap-break-word">{review.restaurantName}</p>
                  </div>

                  <div>
                    <p className="text-sm opacity-80 font-semibold">Rating</p>
                    <div className="flex items-center gap-2 text-2xl font-bold">
                      <FaStar className="text-yellow-300" />
                      {review.starRating}/5
                    </div>
                  </div>

                  <div>
                    <p className="text-sm opacity-80 font-semibold">Favorites</p>
                    <p className="text-xl font-bold flex items-center gap-2">
                      <FaHeart /> {review.isFavoriteBy?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="divider divider-neutral"></div>

                <button
                  onClick={handleFavorite}
                  disabled={favoring}
                  className={`btn btn-wide w-full gap-2 ${
                    isFavorite ? 'btn-warning text-white' : 'btn-secondary'
                  }`}
                >
                  <FaHeart /> {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>

                <Link to="/all-reviews" className="btn btn-outline btn-wide w-full gap-2">
                  <FaArrowLeft /> Back to Reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </SectionBody>
  );
};

export default ReviewDetails;
