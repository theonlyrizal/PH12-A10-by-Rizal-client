import React, { useContext, useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import SectionBody from '../../wrappers/SectionBody';
import { DataContext } from '../../context/DataContext/DataContext';
import useAxios from '../../hooks/useAxios';
import ReviewsContainer from '../../components/ReviewsContainer/ReviewsContainer';
import { toast } from 'react-toastify';

const AllReviews = () => {
  const { reviewsData } = useContext(DataContext);
  const axiosInstance = useAxios();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReviews, setFilteredReviews] = useState(null);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.warning('Please enter a food name to search');
      return;
    }

    try {
      setSearching(true);
      setHasSearched(true);
      const response = await axiosInstance.get(
        `/reviews/search?q=${encodeURIComponent(searchQuery)}`
      );
      setFilteredReviews(response.data);

      if (response.data.length === 0) {
        toast.info(`No reviews found for "${searchQuery}"`);
      } else {
        toast.success(`Found ${response.data.length} review(s)`);
      }
    } catch (err) {
      toast.error('Failed to search reviews');
      console.error('Search error:', err);
      setFilteredReviews([]);
    } finally {
      setSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredReviews(null);
    setHasSearched(false);
  };

  const displayReviews = filteredReviews !== null ? filteredReviews : reviewsData;

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-primary p-5 my-5">
        <h1 className="text-secondary-content text-3xl font-bold">All Genuine Reviews 🍴</h1>
        <p className="text-secondary-content text-sm mt-2">Explore reviews from our community</p>
      </div>

      <SectionBody>
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg">
                🔍 Search Reviews by Food Name
              </span>
            </label>
            <div className="input-group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by food name (e.g., Biryani, Pizza, Sushi)..."
                className="input input-bordered w-full"
              />
              <button type="submit" disabled={searching} className="btn btn-primary" title="Search">
                {searching ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <FaSearch size={18} />
                )}
              </button>
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="btn btn-ghost"
                  title="Clear search"
                >
                  <FaTimes size={18} />
                </button>
              )}
            </div>
            <label className="label">
              <span className="label-text-alt text-gray-500">
                {hasSearched
                  ? `Showing ${displayReviews.length} result(s) for "${searchQuery}"`
                  : 'Search reviews using MongoDB for fast, accurate results'}
              </span>
            </label>
          </div>
        </form>

        {/* Results Info */}
        {hasSearched && (
          <div className="alert alert-info mb-6">
            <div>
              <span>
                {filteredReviews.length === 0
                  ? `No reviews found for "${searchQuery}". Try a different search term.`
                  : `Found ${filteredReviews.length} review(s) matching "${searchQuery}"`}
              </span>
            </div>
          </div>
        )}
      </SectionBody>

      {/* Reviews Container */}
      <ReviewsContainer
        reviews={displayReviews || []}
        emptyMessage={
          hasSearched && filteredReviews?.length === 0
            ? `No reviews found for "${searchQuery}". Browse other reviews instead!`
            : 'No reviews available'
        }
      />
    </div>
  );
};

export default AllReviews;
