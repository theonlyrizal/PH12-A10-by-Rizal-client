import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import FormInput from '../FormInput/FormInput';
import StarRating from '../StarRating/StarRating';

const ReviewForm = () => {
  const { user } = useContext(AuthContext);
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
          <FormInput
            label="Food Name"
            name="foodName"
            value={formData.foodName}
            onChange={handleInputChange}
            placeholder="e.g., Spicy Chicken Biryani"
            required
          />

          <FormInput
            label="Food Image URL"
            name="foodImage"
            type="url"
            value={formData.foodImage}
            onChange={handleInputChange}
            placeholder="e.g., https://example.com/image.jpg"
            required
          />

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
          <FormInput
            label="Restaurant Name"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleInputChange}
            placeholder="e.g., Tandoori Nights"
            required
          />

          <FormInput
            label="Restaurant Location"
            name="restaurantLocation"
            value={formData.restaurantLocation}
            onChange={handleInputChange}
            placeholder="e.g., Dhaka, Bangladesh"
            required
          />
        </div>
      </div>

      <div className="divider"></div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Your Rating & Review</h3>

        <div className="space-y-4">
          <StarRating value={formData.starRating} onChange={handleStarChange} />

          <FormInput
            label="Review Text"
            name="reviewText"
            value={formData.reviewText}
            onChange={handleInputChange}
            placeholder="Share your honest thoughts about this food..."
            textarea
            required
          />
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
