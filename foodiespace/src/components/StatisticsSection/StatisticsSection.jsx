import React, { useContext, useState, useEffect } from 'react';
import { FaStar, FaUsers, FaUtensils } from 'react-icons/fa';
import { DataContext } from '../../context/DataContext/DataContext';

const StatisticsSection = () => {
  const { reviewsData } = useContext(DataContext);
  const [stats, setStats] = useState({
    reviews: 0,
    restaurants: 0,
    users: 0,
  });

  useEffect(() => {
    if (reviewsData && reviewsData.length > 0) {
      const uniqueRestaurants = new Set(reviewsData.map(r => r.restaurantName)).size;
      const uniqueUsers = new Set(reviewsData.map(r => r.userEmail)).size;
      
      setStats({
        reviews: reviewsData.length,
        restaurants: uniqueRestaurants,
        users: uniqueUsers,
      });
    }
  }, [reviewsData]);

  const statistics = [
    {
      icon: <FaStar className="text-5xl text-yellow-500" />,
      value: stats.reviews,
      label: 'Reviews Shared',
      suffix: '+',
    },
    {
      icon: <FaUtensils className="text-5xl text-primary" />,
      value: stats.restaurants,
      label: 'Restaurants Reviewed',
      suffix: '+',
    },
    {
      icon: <FaUsers className="text-5xl text-secondary" />,
      value: stats.users,
      label: 'Active Foodies',
      suffix: '+',
    },
  ];

  return (
    <section className="section-spacing bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Impact in Numbers</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join our growing community of food enthusiasts making informed dining decisions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="card bg-white/10 backdrop-blur-sm p-8 text-center hover:bg-white/20 transition-all border border-white/20"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-5xl md:text-6xl font-bold mb-2">
                {stat.value}{stat.suffix}
              </div>
              <p className="text-xl opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
