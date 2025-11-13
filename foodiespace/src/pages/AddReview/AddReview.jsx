import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import SectionBody from '../../wrappers/SectionBody';
import { FaStar } from 'react-icons/fa';

const AddReview = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    restaurantName: '',
    restaurantLocation: '',
    starRating: 0,
    reviewText: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStarChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      starRating: rating,
    }));
  };

  const validateForm = () => {
    if (!formData.foodName.trim()) {
      setError('Food name is required');
      return false;
    }
    if (!formData.foodImage.trim()) {
      setError('Food image URL is required');
      return false;
    }
    if (!formData.restaurantName.trim()) {
      setError('Restaurant name is required');
      return false;
    }
    if (!formData.restaurantLocation.trim()) {
      setError('Restaurant location is required');
      return false;
    }
    if (formData.starRating === 0) {
      setError('Please select a star rating');
      return false;
    }
    if (!formData.reviewText.trim()) {
      setError('Review text is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await user.getIdToken();

      const reviewData = {
        foodName: formData.foodName,
        foodImage: formData.foodImage,
        restaurantName: formData.restaurantName,
        restaurantLocation: formData.restaurantLocation,
        starRating: parseInt(formData.starRating),
        reviewText: formData.reviewText,
        userEmail: user.email,
        userName: user.displayName || 'Anonymous',
        userId: user.uid,
        createdAt: new Date().toISOString(),
        isFavoriteBy: [],
      };

      const response = await axiosInstance.post('/reviews', reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setFormData({
          foodName: '',
          foodImage: '',
          restaurantName: '',
          restaurantLocation: '',
          starRating: 0,
          reviewText: '',
        });

        // Redirect to All Reviews after 2 seconds
        setTimeout(() => {
          navigate('/all-reviews');
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit review';
      setError(errorMessage);
      console.error('Error submitting review:', err);
    } finally {
      setIsSubmitting(false);
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
            <span>You must be logged in to add a review.</span>
          </div>
        </div>
      </SectionBody>
    );
  }

  return (
    <SectionBody>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-6 bg-base-100 rounded-lg shadow-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Share Your Food Experience</h2>
          <p className="text-gray-600">
            Help others discover great food by sharing your honest review
          </p>
        </div>

        {error && (
          <div className="alert alert-error shadow-lg mb-6">
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

        {success && (
          <div className="alert alert-success shadow-lg mb-6">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Review submitted successfully! Redirecting...</span>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Food Details</h3>

          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Food Name
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="foodName"
                value={formData.foodName}
                onChange={handleInputChange}
                placeholder="e.g., Spicy Chicken Biryani"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Food Image URL
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <input
                type="url"
                name="foodImage"
                value={formData.foodImage}
                onChange={handleInputChange}
                placeholder="e.g., https://example.com/image.jpg"
                className="input input-bordered w-full"
              />
            </div>

            {formData.foodImage && (
              <div className="mt-4">
                <p className="label-text font-semibold mb-2">Image Preview</p>
                <img
                  src={formData.foodImage}
                  alt={formData.foodName}
                  className="w-full max-h-64 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>
        </div>

        <div className="divider"></div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Restaurant Information</h3>

          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Restaurant Name
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleInputChange}
                placeholder="e.g., Tandoori Nights"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Restaurant Location
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <input
                type="text"
                name="restaurantLocation"
                value={formData.restaurantLocation}
                onChange={handleInputChange}
                placeholder="e.g., Dhaka, Bangladesh"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Your Rating & Review</h3>

          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Star Rating
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarChange(star)}
                    className="transition-all duration-200 hover:scale-110"
                    aria-label={`${star} stars`}
                  >
                    <FaStar
                      size={32}
                      className={formData.starRating >= star ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
                {formData.starRating > 0 && (
                  <span className="ml-4 font-semibold text-yellow-500">
                    {formData.starRating} / 5
                  </span>
                )}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Review Text
                  <span className="text-red-500 ml-1">*</span>
                </span>
              </label>
              <textarea
                name="reviewText"
                value={formData.reviewText}
                onChange={handleInputChange}
                placeholder="Share your honest thoughts about this food..."
                className="textarea textarea-bordered w-full"
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button type="submit" className="btn btn-primary flex-1" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            className="btn btn-ghost flex-1"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </SectionBody>
  );
};

export default AddReview;
