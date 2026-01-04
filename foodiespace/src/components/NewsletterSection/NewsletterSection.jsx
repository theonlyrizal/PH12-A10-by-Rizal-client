import React, { useState } from 'react';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="section-spacing bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-4xl mx-auto container-padding text-center">
        <FaEnvelope className="text-6xl mx-auto mb-6 opacity-90" />
        
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Stay Updated with FoodieSpace</h2>
        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest restaurant reviews, food trends, and exclusive deals delivered to your inbox!
        </p>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <div className="join w-full shadow-lg">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input input-lg join-item w-full focus:outline-none text-base-content"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn btn-lg join-item bg-white text-primary hover:bg-base-100 border-none"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <FaPaperPlane /> Subscribe
                </>
              )}
            </button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
