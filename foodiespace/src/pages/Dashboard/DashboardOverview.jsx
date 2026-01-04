import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router';
import { DataContext } from '../../context/DataContext/DataContext';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { FaStar, FaHeart, FaPen, FaUtensils } from 'react-icons/fa';
import { Rating } from 'next-flex-rating';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const DashboardOverview = () => {
  const { reviewsData } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  // Calculate user statistics
  const userStats = useMemo(() => {
    const userReviews = reviewsData?.filter(r => r.userEmail === user?.email) || [];
    const totalReviews = userReviews.length;
    const totalFavorites = userReviews.reduce((sum, r) => sum + (r.isFavoriteBy?.length || 0), 0);
    const avgRating = totalReviews > 0
      ? (userReviews.reduce((sum, r) => sum + r.starRating, 0) / totalReviews).toFixed(1)
      : 0;

    // Rating distribution for pie chart
    const ratingDist = [1, 2, 3, 4, 5].map(rating => ({
      name: `${rating} Stars`,
      value: userReviews.filter(r => r.starRating === rating).length,
    }));

    // Reviews by month for line chart (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      const count = userReviews.filter(r => {
        const reviewDate = new Date(r.timestamp);
        return reviewDate.getMonth() === date.getMonth() && 
               reviewDate.getFullYear() === date.getFullYear();
      }).length;
      monthlyData.push({ month: monthYear, reviews: count });
    }

    return {
      totalReviews,
      totalFavorites,
      avgRating,
      ratingDist,
      monthlyData,
      recentReviews: userReviews.slice(0, 5),
    };
  }, [reviewsData, user]);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-primary to-primary-focus text-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Reviews</p>
                <p className="text-4xl font-bold">{userStats.totalReviews}</p>
              </div>
              <FaStar className="text-5xl opacity-50" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-secondary to-secondary-focus text-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Favorites</p>
                <p className="text-4xl font-bold">{userStats.totalFavorites}</p>
              </div>
              <FaHeart className="text-5xl opacity-50" />
            </div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-accent to-accent-focus text-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Average Rating</p>
                <p className="text-4xl font-bold">{userStats.avgRating}</p>
              </div>
              <FaUtensils className="text-5xl opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Distribution - Pie Chart */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">Rating Distribution</h3>
            <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <PieChart>
                  <Pie
                    data={userStats.ratingDist}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userStats.ratingDist.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Reviews Over Time - Line Chart */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h3 className="card-title">Reviews Over Time</h3>
            <div style={{ width: '100%', height: '300px', minHeight: '300px' }}>
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <LineChart data={userStats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="reviews" stroke="#c68a55" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reviews Table */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title">Recent Reviews</h3>
            <Link to="/my-reviews" className="btn btn-sm btn-primary">
              View All
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Restaurant</th>
                  <th>Rating</th>
                  <th>Favorites</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userStats.recentReviews.length > 0 ? (
                  userStats.recentReviews.map((review, index) => (
                    <tr key={index}>
                      <td className="font-semibold">{review.foodName}</td>
                      <td>{review.restaurantName}</td>
                      <td>
                        <Rating value={review.starRating} readOnly />
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FaHeart className="text-error" />
                          {review.isFavoriteBy?.length || 0}
                        </div>
                      </td>
                      <td>
                        <Link
                          to={`/reviews/${review._id}`}
                          className="btn btn-xs btn-primary"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 opacity-60">
                      No reviews yet. Start by{' '}
                      <Link to="/add-review" className="link link-primary">
                        adding a review
                      </Link>
                      !
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
        <div className="card-body text-center">
          <h3 className="text-2xl font-bold mb-4">Share Your Next Experience</h3>
          <Link to="/add-review" className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none rounded-full gap-2">
            <FaPen /> Write a Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
