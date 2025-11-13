import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-primary to-base-200 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary opacity-20 mb-2">404</h1>
          <div className="text-6xl mb-6">🍴</div>
        </div>

        <h2 className="text-4xl font-bold mb-3 text-gray-800">Oops! Page Not Found</h2>
        <p className="text-gray-600 text-lg mb-2">
          Looks like this recipe doesn't exist in our kitchen!
        </p>
        <p className="text-gray-500 mb-8">
          The page you're looking for has been moved, deleted, or never existed.
        </p>

        <button onClick={() => navigate('/')} className="btn btn-primary btn-lg">
          🏠 Back to Home
        </button>

        <div className="mt-12 text-sm text-gray-600">
          <p>Need help? Try these:</p>
          <div className="flex gap-4 justify-center mt-4 flex-wrap">
            <button onClick={() => navigate('/all-reviews')} className="btn btn-ghost btn-sm">
              Browse All Reviews
            </button>
            <button onClick={() => navigate('/add-review')} className="btn btn-ghost btn-sm">
              Share Your Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
