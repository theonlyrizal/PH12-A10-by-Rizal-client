import React from 'react';
import { FaCheckCircle, FaUsers, FaStar, FaShieldAlt } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-4xl text-primary" />,
      title: 'Verified Reviews',
      description: 'All reviews are from real users who have dined at these restaurants, ensuring authenticity.',
    },
    {
      icon: <FaStar className="text-4xl text-primary" />,
      title: 'Easy to Use',
      description: 'Simple and intuitive interface to find, read, and share your dining experiences.',
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: 'Community Driven',
      description: 'Join thousands of food enthusiasts sharing their honest opinions and recommendations.',
    },
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: 'Trusted Platform',
      description: 'Our moderation ensures quality content and a safe environment for all users.',
    },
  ];

  return (
    <section className="section-spacing bg-base-200">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose FoodieSpace?</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Discover what makes us the go-to platform for authentic restaurant reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card bg-base-100 card-consistent p-6 text-center hover:scale-105 transition-transform"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
