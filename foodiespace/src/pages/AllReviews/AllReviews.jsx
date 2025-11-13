import React, { useContext, useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa6';

import SectionBody from '../../wrappers/SectionBody';
import { DataContext } from '../../context/DataContext/DataContext';
import ReviewsContainer from '../../components/ReviewsContainer/ReviewsContainer';
// toast removed: client-side search no longer uses server notifications

const AllReviews = () => {
  const { reviewsData } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchPayload, setSearchPayload] = useState({ foodName: '' });
  const [filteredReviews, setFilteredReviews] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredReviews(null);
      setHasSearched(false);
    } else {
      const q = searchQuery.toLowerCase();
      const matched = (reviewsData || []).filter((r) =>
        String(r.foodName || '')
          .toLowerCase()
          .includes(q)
      );
      setFilteredReviews(matched);
    }
  }, [reviewsData, searchQuery]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setSearchPayload({ foodName: value });
    setHasSearched(true);

    const q = value.trim().toLowerCase();
    if (!q) {
      setFilteredReviews(null);
      setHasSearched(false);
      return;
    }

    const matched = (reviewsData || []).filter((r) =>
      String(r.foodName || '')
        .toLowerCase()
        .includes(q)
    );
    setFilteredReviews(matched);
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
        <div className="flex items-center gap-3">
          <FaUtensils className="text-secondary-content text-3xl" />
          <h1 className="text-secondary-content text-3xl font-bold">All Genuine Reviews</h1>
        </div>
        <p className="text-secondary-content text-sm mt-2">Explore reviews from our community</p>
      </div>

      <SectionBody>
        {/* Search Bar (client-side, search on change) */}
        <div className="mb-8">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-lg flex items-center gap-2">
                <FaSearch size={18} />
                Search Reviews by Food Name
              </span>
            </label>
            <div className="input-group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by food name (e.g., Biryani, Pizza, Sushi)..."
                className="input input-bordered w-full"
              />
              {/* search is live on input change; no button needed */}
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
                  ? `Showing ${displayReviews.length} result(s) for "${
                      searchPayload.foodName || searchQuery
                    }"`
                  : 'Type to search reviews client-side'}
              </span>
            </label>
          </div>
        </div>

        {hasSearched && (
          <div className="alert alert-info mb-6">
            <div>
              <span>
                {filteredReviews.length === 0
                  ? `No reviews found for "${
                      searchPayload.foodName || searchQuery
                    }". Try a different search term.`
                  : `Found ${filteredReviews.length} review(s) matching "${
                      searchPayload.foodName || searchQuery
                    }"`}
              </span>
            </div>
          </div>
        )}
      </SectionBody>

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
