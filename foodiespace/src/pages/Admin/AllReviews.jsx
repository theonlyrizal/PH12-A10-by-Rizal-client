import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { Rating } from 'next-flex-rating';
import { FaTrash, FaCheck, FaTimes, FaClock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllReviewsAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const token = await user.getIdToken();
      let url = '/reviews/all';
      if (filter !== 'all') {
        url += `?status=${filter}`;
      }

      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(response.data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  const handleDelete = async (reviewId, foodName) => {
    const result = await Swal.fire({
      title: 'Delete Review?',
      text: `Are you sure you want to permanently delete the review for "${foodName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
    });

    if (!result.isConfirmed) return;

    try {
      const token = await user.getIdToken();
      await axiosInstance.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Review deleted successfully');
      fetchReviews(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete review');
    }
  };

  const handleStatusChange = async (reviewId, currentStatus, foodName) => {
    const statusOptions = ['pending', 'approved', 'rejected'].filter((s) => s !== currentStatus);

    const { value: newStatus } = await Swal.fire({
      title: 'Change Review Status',
      text: `Change status for "${foodName}"`,
      icon: 'question',
      input: 'select',
      inputOptions: {
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
      },
      inputValue: currentStatus,
      showCancelButton: true,
      confirmButtonText: 'Update Status',
      cancelButtonText: 'Cancel',
    });

    if (!newStatus || newStatus === currentStatus) return;

    try {
      const token = await user.getIdToken();
      await axiosInstance.patch(
        `/reviews/${reviewId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Review ${newStatus} successfully`);
      fetchReviews(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="badge badge-success gap-1">
            <FaCheck /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="badge badge-error text-white gap-1">
            <FaTimes /> Rejected
          </span>
        );
      case 'pending':
        return (
          <span className="badge badge-warning gap-1">
            <FaClock /> Pending
          </span>
        );
      default:
        return <span className="badge badge-ghost">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Reviews Management</h2>
        <div className="join">
          <button
            className={`join-item btn ${filter === 'all' ? 'btn-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`join-item btn ${filter === 'pending' ? 'btn-active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button
            className={`join-item btn ${filter === 'approved' ? 'btn-active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approved
          </button>
          <button
            className={`join-item btn ${filter === 'rejected' ? 'btn-active' : ''}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full bg-base-100 rounded-lg shadow-sm">
            <thead>
              <tr>
                <th>Food</th>
                <th>Restaurant</th>
                <th>User</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={review.foodImage} alt={review.foodName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{review.foodName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{review.restaurantName}</td>
                  <td>{review.userName}</td>
                  <td>
                    <Rating value={review.starRating} readOnly style={{ maxWidth: 80 }} />
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusChange(review._id, review.status, review.foodName)}
                      className="cursor-pointer hover:scale-110 transition-transform"
                    >
                      {getStatusBadge(review.status)}
                    </button>
                  </td>
                  <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(review._id, review.foodName)}
                        className="btn btn-sm btn-error btn-outline gap-1"
                        title="Delete Review"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-8 opacity-50">
                    No reviews found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllReviewsAdmin;
