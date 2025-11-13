import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import SectionBody from '../../wrappers/SectionBody';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditReview = () => {
  const { id } = useParams();
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

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Fetch review data on mount
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axiosInstance.get(`/reviews/${id}`);
        const review = response.data;

        // Check if user is the owner
        if (review.userEmail !== user?.email) {
          toast.error('You can only edit your own reviews');
          navigate('/my-reviews');
          return;
        }

        setFormData({
          foodName: review.foodName || '',
          foodImage: review.foodImage || '',
          restaurantName: review.restaurantName || '',
          restaurantLocation: review.restaurantLocation || '',
          starRating: review.starRating || 0,
          reviewText: review.reviewText || '',
        });
        setImagePreview(review.foodImage || '');
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load review for editing');
        toast.error('Failed to load review');
        console.error('Error fetching review:', err);
        setTimeout(() => navigate('/my-reviews'), 2000);
      }
    };

    if (!authLoading && user?.email && id) {
      fetchReview();
    }
  }, [id, user, authLoading, axiosInstance, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update image preview
    if (name === 'foodImage') {
      setImagePreview(value);
    }
  };

  const handleStarChange = (rating) => {
    setFormData((prev) => ({
      ...prev,
      starRating: rating,
    }));
  };

  const validateForm = () => {
    if (!formData.foodName.trim()) {
      toast.error('Food name is required');
      return false;
    }
    if (!formData.foodImage.trim()) {
      toast.error('Food image URL is required');
      return false;
    }
    if (!formData.restaurantName.trim()) {
      toast.error('Restaurant name is required');
      return false;
    }
    if (!formData.restaurantLocation.trim()) {
      toast.error('Restaurant location is required');
      return false;
    }
    if (formData.starRating === 0) {
      toast.error('Please select a star rating');
      return false;
    }
    if (!formData.reviewText.trim()) {
      toast.error('Review text is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await user.getIdToken();

      await axiosInstance.put(`/reviews/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Review updated successfully!');
      setTimeout(() => navigate('/my-reviews'), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update review';
      toast.error(errorMsg);
      console.error('Error updating review:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <SectionBody>
        <div className="flex flex-col items-center justify-center min-h-96 gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-600 font-semibold">Loading review...</p>
        </div>
      </SectionBody>
    );
  }

  if (error) {
    return (
      <SectionBody>
        <div className="alert alert-error max-w-md mx-auto my-8">
          <div>
            <span>{error}</span>
          </div>
        </div>
      </SectionBody>
    );
  }

  return (
    <SectionBody>
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex flex-col justify-center items-center bg-primary p-5 mb-8 rounded-lg">
          <h1 className="text-secondary-content text-3xl font-bold">✏️ Edit Your Review</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Details Section */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-primary mb-4">🍽️ Food Details</h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Food Name *</span>
                </label>
                <input
                  type="text"
                  name="foodName"
                  value={formData.foodName}
                  onChange={handleInputChange}
                  placeholder="e.g., Biryani, Pizza, Sushi"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Food Image URL *</span>
                </label>
                <input
                  type="url"
                  name="foodImage"
                  value={formData.foodImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Preview</span>
                  </label>
                  <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300?text=Invalid+Image';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Restaurant Info Section */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-primary mb-4">🏪 Restaurant Info</h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Restaurant Name *</span>
                </label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleInputChange}
                  placeholder="e.g., Taj Indian Restaurant"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Location *</span>
                </label>
                <input
                  type="text"
                  name="restaurantLocation"
                  value={formData.restaurantLocation}
                  onChange={handleInputChange}
                  placeholder="e.g., Downtown, Main Street"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
          </div>

          {/* Rating & Review Section */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-primary mb-4">⭐ Rating & Review</h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Star Rating (1-5) *</span>
                </label>
                <div className="flex gap-2 my-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarChange(star)}
                      className={`text-4xl transition-transform hover:scale-110 ${
                        star <= formData.starRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Selected: {formData.starRating}/5 stars</p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Review *</span>
                </label>
                <textarea
                  name="reviewText"
                  value={formData.reviewText}
                  onChange={handleInputChange}
                  placeholder="Share your honest thoughts about this food... (min 10 characters)"
                  className="textarea textarea-bordered h-32"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.reviewText.length} characters
                </p>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-center pt-4">
            <button
              type="button"
              onClick={() => navigate('/my-reviews')}
              className="btn btn-ghost btn-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Updating...
                </>
              ) : (
                '💾 Update Review'
              )}
            </button>
          </div>
        </form>
      </div>
    </SectionBody>
  );
};

export default EditReview;
