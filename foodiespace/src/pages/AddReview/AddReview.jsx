import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import SectionBody from '../../wrappers/SectionBody';
import ReviewForm from '../../components/ReviewForm/ReviewForm';

const AddReview = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <SectionBody>
        <div className="flex flex-col items-center justify-center min-h-96 gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </SectionBody>
    );
  }

  if (!user) {
    return (
      <SectionBody>
        <div className="alert alert-warning max-w-md mx-auto my-8">
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
                d="M12 9v2m0 4v2m0 4v2M7.457 5.457a9 9 0 0111.086 0M5.5 12a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
              />
            </svg>
            <span>You must be logged in to add a review.</span>
          </div>
        </div>
      </SectionBody>
    );
  }

  return (
    <SectionBody>
      <ReviewForm />
    </SectionBody>
  );
};

export default AddReview;
