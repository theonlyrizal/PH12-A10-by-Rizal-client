import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import SectionBody from '../../wrappers/SectionBody';
import { FaEdit, FaTrash, FaClipboard, FaStar, FaPlus, FaHeart } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const MyReviews = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    // Fetch reviews
    const fetchMyReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await user.getIdToken();
        const response = await axiosInstance.get('/reviews/my-reviews', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setReviews([]);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || err.message || 'Failed to load your reviews';
        setError(errorMessage);
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user?.uid) {
      fetchMyReviews();
    } else if (!authLoading && !user?.uid) {
      setReviews([]);
      setLoading(false);
    }
  }, [user, authLoading, axiosInstance]);

  // Handle delete review
  const handleDelete = async (reviewId, foodName) => {
    const result = await Swal.fire({
      title: 'Delete Review?',
      text: `Are you sure you want to delete your review for "${foodName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setDeleting(reviewId);
      const token = await user.getIdToken();

      await axiosInstance.delete(`/reviews/${reviewId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Review deleted successfully');
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete review';
      toast.error(errorMsg);
      console.error('Error deleting review:', err);
    } finally {
      setDeleting(null);
    }
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <SectionBody>
        <div className="flex justify-center items-center min-h-screen">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </SectionBody>
    );
  }

  // Show error state
  if (error) {
    return (
      <SectionBody>
        <div className="alert alert-error shadow-lg my-5">
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
                d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2m4-4l2 2m0 0l2 2m-2-2l-2-2m2 2l2 2"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      </SectionBody>
    );
  }

  // Show empty state
  if (reviews.length === 0) {
    return (
      <SectionBody>
        <div className="text-center py-12">
          <div className="text-6xl mb-4 text-primary">
            <FaClipboard className="mx-auto" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Reviews Yet</h2>
          <p className="text-gray-500 mb-6">
            You haven't created any reviews. Start by reviewing your favorite food!
          </p>
          <Link to="/add-review" className="btn btn-primary gap-2">
            <FaClipboard size={16} />
            Write Your First Review
          </Link>
        </div>
      </SectionBody>
    );
  }

  // Show reviews in table format
  return (
    <SectionBody>
      <div className="flex flex-col justify-center items-center bg-primary p-5 mb-8 rounded-lg">
        <div className="flex items-center gap-3">
          <FaClipboard className="text-secondary-content text-3xl" />
          <h1 className="text-secondary-content text-3xl font-bold">My Reviews</h1>
        </div>
        <p className="text-secondary-content text-sm mt-2">Manage all your food reviews</p>
      </div>

      {/* Table - Hidden on small screens */}
      <div className="hidden sm:block overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          {/* Table head */}
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="text-center">Food Image</th>
              <th>Food Name</th>
              <th>Restaurant</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Posted Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="hover:bg-base-200 transition-colors">
                {/* Food Image */}
                <td className="text-center">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={review.foodImage}
                        alt={review.foodName}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                        }}
                      />
                    </div>
                  </div>
                </td>

                {/* Food Name */}
                <td>
                  <div className="font-semibold text-primary">{review.foodName}</div>
                </td>

                {/* Restaurant */}
                <td>
                  <div>
                    <div className="font-semibold">{review.restaurantName}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MdLocationOn className="text-red-500" size={14} />
                      {review.restaurantLocation}
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" size={14} />
                    <span className="font-bold">{review.starRating}/5</span>
                  </div>
                </td>

                {/* Status */}
                <td>
                  {review.status === 'approved' && <span className="badge badge-success badge-sm">Approved</span>}
                  {review.status === 'rejected' && <span className="badge badge-error badge-sm text-white">Rejected</span>}
                  {(review.status === 'pending' || !review.status) && <span className="badge badge-warning badge-sm">Pending</span>}
                </td>

                {/* Posted Date */}
                <td>
                  <div className="text-sm">
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </td>

                {/* Actions */}
                <td className="text-center">
                  <div className="flex gap-2 justify-center">
                    {/* Edit Button */}
                    <Link
                      to={`/edit-review/${review._id}`}
                      className="btn btn-sm btn-ghost btn-outline text-info hover:bg-info hover:text-white"
                      title="Edit review"
                    >
                      <FaEdit size={16} />
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(review._id, review.foodName)}
                      disabled={deleting === review._id}
                      className="btn btn-sm btn-ghost btn-outline text-error hover:bg-error hover:text-white"
                      title="Delete review"
                    >
                      {deleting === review._id ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        <FaTrash size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout - Visible only on small screens */}
      <div className="sm:hidden space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="card bg-base-100 shadow-md border border-base-300">
            <div className="card-body">
              {/* Header with image and food name */}
              <div className="flex gap-4 mb-4">
                <div className="avatar shrink-0">
                  <div className="mask mask-squircle h-20 w-20">
                    <img
                      src={review.foodImage}
                      alt={review.foodName}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="card-title text-lg text-primary">{review.foodName}</h3>
                  <p className="text-sm font-semibold">{review.restaurantName}</p>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <MdLocationOn size={12} className="text-red-500" />
                    {review.restaurantLocation}
                  </div>
                </div>
              </div>

              {/* Rating and Date */}
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" size={14} />
                  <span className="font-bold">{review.starRating}/5</span>
                </div>
                <div className="text-xs text-gray-500 text-right">
                  <div>
                    {new Date(review.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div>
                    {new Date(review.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="card-actions justify-end gap-2">
                <Link
                  to={`/edit-review/${review._id}`}
                  className="btn btn-sm btn-info text-white gap-2"
                >
                  <FaEdit size={14} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(review._id, review.foodName)}
                  disabled={deleting === review._id}
                  className="btn btn-sm btn-error text-white gap-2"
                >
                  {deleting === review._id ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FaTrash size={14} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Button */}
      <div className="mt-8 flex justify-center">
        <Link to="/add-review" className="btn btn-primary btn-lg gap-2">
          <FaPlus size={16} />
          Add Another Review
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-base-100 shadow-md">
          <div className="card-body text-center">
            <div className="text-4xl text-primary">
              <FaClipboard className="mx-auto" size={32} />
            </div>
            <div className="text-2xl font-bold text-primary mt-2">{reviews.length}</div>
            <div className="text-sm text-gray-600">Total Reviews</div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body text-center">
            <div className="text-4xl text-yellow-400">
              <FaStar className="mx-auto" size={32} />
            </div>
            <div className="text-2xl font-bold text-yellow-500 mt-2">
              {(reviews.reduce((sum, r) => sum + r.starRating, 0) / reviews.length).toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body text-center">
            <div className="text-4xl text-red-500">
              <FaHeart className="mx-auto" size={32} />
            </div>
            <div className="text-2xl font-bold text-red-500 mt-2">
              {reviews.reduce((sum, r) => sum + (r.isFavoriteBy?.length || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Times Favorited</div>
          </div>
        </div>
      </div>
    </SectionBody>
  );
};

export default MyReviews;
