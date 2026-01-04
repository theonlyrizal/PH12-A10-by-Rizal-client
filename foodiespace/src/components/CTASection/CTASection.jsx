import React from 'react';
import { Link } from 'react-router';
import { FaPen, FaArrowRight } from 'react-icons/fa';

const CTASection = () => {
  return (
    <section className="section-spacing bg-base-100">
      <div className="max-w-5xl mx-auto container-padding">
        <div className="card bg-gradient-to-br from-primary via-primary to-secondary text-white shadow-2xl p-12 text-center relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <FaPen className="text-6xl mx-auto mb-6 opacity-90" />
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Share Your Dining Experience Today!
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Your review can help thousands of food lovers discover amazing restaurants and make better dining choices. Join our community and start sharing!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/add-review"
                className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none rounded-full gap-2 shadow-lg"
              >
                <FaPen /> Write a Review
              </Link>
              <Link
                to="/all-reviews"
                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary rounded-full gap-2"
              >
                Browse Reviews <FaArrowRight />
              </Link>
            </div>

            <p className="text-sm opacity-75 mt-6">
              Join over {Math.floor(Math.random() * 5000) + 1000}+ food enthusiasts already sharing their experiences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
