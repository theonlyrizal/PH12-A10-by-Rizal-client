import React, { useContext, useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaFilter, FaSort } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa6';
import { Rating } from 'next-flex-rating';

import SectionBody from '../../wrappers/SectionBody';
import { DataContext } from '../../context/DataContext/DataContext';
import ReviewsContainer from '../../components/ReviewsContainer/ReviewsContainer';

const AllReviews = () => {
  const { reviewsData } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReviews, setFilteredReviews] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Filter states
  const [ratingFilter, setRatingFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Sort state
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    let result = reviewsData || [];

    // Apply search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((r) => {
        const food = String(r.foodName || '').toLowerCase();
        const rest = String(r.restaurantName || '').toLowerCase();
        return food.includes(q) || rest.includes(q);
      });
    }

    // Apply rating filter
    if (ratingFilter !== 'all') {
      const rating = parseInt(ratingFilter);
      result = result.filter(r => r.starRating === rating);
    }

    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      result = result.filter(r => {
        const reviewDate = new Date(r.timestamp);
        const diffDays = (now - reviewDate) / (1000 * 60 * 60 * 24);
        
        if (dateFilter === 'week') return diffDays <= 7;
        if (dateFilter === 'month') return diffDays <= 30;
        if (dateFilter === 'year') return diffDays <= 365;
        return true;
      });
    }

    // Apply sorting
    if (sortBy === 'rating-high') {
      result = [...result].sort((a, b) => b.starRating - a.starRating);
    } else if (sortBy === 'rating-low') {
      result = [...result].sort((a, b) => a.starRating - b.starRating);
    } else if (sortBy === 'favorites') {
      result = [...result].sort((a, b) => 
        (b.isFavoriteBy?.length || 0) - (a.isFavoriteBy?.length || 0)
      );
    } else if (sortBy === 'oldest') {
      result = [...result].sort((a, b) => 
        new Date(a.timestamp) - new Date(b.timestamp)
      );
    } else { // newest  
      result = [...result].sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
    }

    setFilteredReviews(result);
  }, [reviewsData, searchQuery, ratingFilter, dateFilter, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setRatingFilter('all');
    setDateFilter('all');
    setSortBy('newest');
    setHasSearched(false);
  };

  const activeFiltersCount = 
    (ratingFilter !== 'all' ? 1 : 0) +
    (dateFilter !== 'all' ? 1 : 0) +
    (sortBy !== 'newest' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const displayReviews = filteredReviews || reviewsData || [];

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-primary p-5 my-5">
        <div className="flex items-center gap-3">
          <FaUtensils className="text-secondary-content text-3xl" />
          <h1 className="text-secondary-content text-3xl font-bold">All Genuine Reviews</h1>
        </div>
        <p className="text-secondary-content text-sm mt-2">Explore reviews from our community</p>
      </div>

      <SectionBody>
        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg flex items-center gap-2">
                <FaSearch size={18} />
                Search Reviews
              </span>
            </label>
            <div className="input-group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHasSearched(true);
                }}
                placeholder="Search by food or restaurant name..."
                className="input input-bordered w-full"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="btn btn-ghost"
                  title="Clear search"
                >
                  <FaTimes size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Rating Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaFilter size={14} />
                  Rating
                </span>
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="all">All Ratings</option>
                <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                <option value="3">⭐⭐⭐ (3 Stars)</option>
                <option value="2">⭐⭐ (2 Stars)</option>
                <option value="1">⭐ (1 Star)</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaFilter size={14} />
                  Date Added
                </span>
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="year">Last Year</option>
              </select>
            </div>

            {/* Sort */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <FaSort size={14} />
                  Sort By
                </span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating-high">Highest Rated</option>
                <option value="rating-low">Lowest Rated</option>
                <option value="favorites">Most Favorited</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <div className="form-control">
              <label className="label">
                <span className="label-text opacity-0">.</span>
              </label>
              <button
                onClick={handleClearFilters}
                disabled={activeFiltersCount === 0}
                className="btn btn-outline btn-error w-full"
              >
                <FaTimes /> Clear All {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </button>
            </div>
          </div>

          {/* Active Filters Info */}
          {activeFiltersCount > 0 && (
            <div className="alert alert-info">
              <div className="flex-1">
                <span>
                  Showing {displayReviews.length} result(s) with {activeFiltersCount} active filter(s)
                </span>
              </div>
            </div>
          )}
        </div>
      </SectionBody>

      <ReviewsContainer
        reviews={displayReviews || []}
        emptyMessage={
          activeFiltersCount > 0
            ? 'No reviews match your filters. Try adjusting your search criteria.'
            : 'No reviews available'
        }
      />
    </div>
  );
};

export default AllReviews;
