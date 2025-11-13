import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-primary to-base-200 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-content opacity-20 mb-2">404</h1>
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
      </div>
    </div>
  );
};

export default NotFound;
