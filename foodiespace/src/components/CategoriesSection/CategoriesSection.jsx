import React from 'react';
import { FaBurger, FaPizzaSlice, FaIceCream, FaFish, FaDrumstickBite } from 'react-icons/fa6';
import { FaCoffee } from 'react-icons/fa';
import { GiNoodles, GiSushis } from 'react-icons/gi';

const CategoriesSection = () => {
  const categories = [
    { icon: <FaBurger className="text-5xl" />, name: 'Fast Food', color: 'text-orange-500' },
    { icon: <FaPizzaSlice className="text-5xl" />, name: 'Pizza', color: 'text-red-500' },
    { icon: <GiSushis className="text-5xl" />, name: 'Sushi', color: 'text-pink-500' },
    { icon: <GiNoodles className="text-5xl" />, name: 'Noodles', color: 'text-yellow-600' },
    { icon: <FaFish className="text-5xl" />, name: 'Seafood', color: 'text-blue-500' },
    { icon: <FaDrumstickBite className="text-5xl" />, name: 'BBQ', color: 'text-amber-700' },
    { icon: <FaCoffee className="text-5xl" />, name: 'Cafes', color: 'text-brown-600' },
    { icon: <FaIceCream className="text-5xl" />, name: 'Desserts', color: 'text-purple-500' },
  ];

  return (
    <section className="section-spacing bg-base-100">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Explore by Category</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Find your favorite cuisine from our diverse range of food categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-base-200 hover:bg-base-300 transition-all cursor-pointer hover:scale-110 card-consistent"
            >
              <div className={category.color}>{category.icon}</div>
              <p className="font-semibold text-sm text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
