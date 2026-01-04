import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import useAxios from '../../hooks/useAxios';
import { toast } from 'react-toastify';
import { Rating } from 'next-flex-rating';
import { FaCheck, FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

const ReviewApproval = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingReviews = async () => {
    try {
      const token = await user.getIdToken();
      const response = await axiosInstance.get('/reviews/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingReviews(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch pending reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const handleApproveReject = async (reviewId, status) => {
    try {
      const token = await user.getIdToken();
      await axiosInstance.patch(
        `/reviews/${reviewId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      toast.success(`Review ${status} successfully!`);
      // Update local state to remove processed review
      setPendingReviews(prev => prev.filter(r => r._id !== reviewId));
    } catch (error) {
      console.error(error);
      toast.error('Action failed');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pending Reviews</h2>
        <div className="badge badge-primary badge-lg">{pendingReviews.length} Pending</div>
      </div>
      
      {pendingReviews.length === 0 ? (
        <div className="alert alert-success bg-green-50 text-green-800 border-green-200">
          <FaCheck className="text-xl" />
          <span>All caught up! No pending reviews to handle.</span>
        </div>
      ) : (
        <div className="grid gap-6">
          {pendingReviews.map((review) => (
            <div key={review._id} className="card lg:card-side bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-all">
              <figure className="lg:w-1/4 h-64 lg:h-auto overflow-hidden">
                <img 
                  src={review.foodImage} 
                  alt={review.foodName}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body lg:w-3/4">
                <div className="flex flex-col md:flex-row justify-between item-start gap-4">
                  <div>
                    <h3 className="card-title text-2xl mb-1">{review.foodName}</h3>
                    <div className="flex items-center gap-2 mb-2 text-base-content/70">
                      <span className="font-semibold">{review.restaurantName}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary" /> {review.restaurantLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <Rating value={review.starRating} readOnly style={{ maxWidth: 100 }} />
                      <span className="badge badge-ghost">by {review.userName}</span>
                      <span className="text-xs opacity-50">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="bg-base-200/50 p-4 rounded-lg italic">"{review.reviewText}"</p>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2 justify-center min-w-[120px]">
                    <button 
                      onClick={() => handleApproveReject(review._id, 'approved')}
                      className="btn btn-success gap-2"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button 
                      onClick={() => handleApproveReject(review._id, 'rejected')}
                      className="btn btn-error gap-2 text-white"
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewApproval;
