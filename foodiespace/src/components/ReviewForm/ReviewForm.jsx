import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { DataContext } from '../../context/DataContext/DataContext';
import useAxios from '../../hooks/useAxios';
import { auth } from '../../firebase/firebase.init';
// Form inputs inlined to keep review form self-contained
import { Rating } from 'next-flex-rating';
import CloudinaryUploadWidget from '../CloudinaryUploadWidget/CloudinaryUploadWidget';

const ReviewForm = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { setReviewsData } = useContext(DataContext);

  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    restaurantName: '',
    restaurantLocation: '',
    reviewText: '',
  });

  // Rating state (uses next-flex-rating)
  const [rating, setRating] = useState(3);

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

  const handleImageUpload = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      foodImage: imageUrl,
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      foodImage: '',
    }));
  };

  const validateForm = () => {
    if (!formData.foodName.trim()) {
      setError('Food name is required');
      return false;
    }
    if (!formData.foodImage.trim()) {
      setError('Please upload a food image');
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
    if (rating === 0) {
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
      // Support both when `user` is a full Firebase User (has getIdToken)
      // and when `user` is a plain object (some flows may replace it).
      let token = null;
      if (user && typeof user.getIdToken === 'function') {
        token = await user.getIdToken();
      } else if (auth && auth.currentUser && typeof auth.currentUser.getIdToken === 'function') {
        token = await auth.currentUser.getIdToken();
      }

      if (!token) {
        throw new Error('Authentication token not available. Please login again.');
      }

      const reviewData = {
        foodName: formData.foodName,
        foodImage: formData.foodImage,
        restaurantName: formData.restaurantName,
        restaurantLocation: formData.restaurantLocation,
        starRating: parseInt(rating),
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
        // Update local context so new review appears immediately
        try {
          const created = response.data;
          if (created) {
            setReviewsData((prev) => [created, ...(prev || [])]);
          }
        } catch (err) {
          // ignore context update failures
          console.warn('Failed to update reviewsData in context', err);
        }

        setFormData({
          foodName: '',
          foodImage: '',
          restaurantName: '',
          restaurantLocation: '',
          reviewText: '',
        });
        setRating(3);

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

  return (
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
                Food Image
                <span className="text-red-500 ml-1">*</span>
              </span>
            </label>
            <CloudinaryUploadWidget
              onUploadSuccess={handleImageUpload}
              currentImage={formData.foodImage}
              onRemove={handleRemoveImage}
              folder="foodiespace-reviews"
            />
          </div>
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
            <div className="flex items-center gap-4">
              <Rating value={rating} onChange={setRating} />
              {rating > 0 && (
                <span className="ml-4 font-semibold text-yellow-500">{rating} / 5</span>
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
  );
};

export default ReviewForm;
