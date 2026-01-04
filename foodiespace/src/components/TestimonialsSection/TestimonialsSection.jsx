import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Rating } from 'next-flex-rating';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Ahmed',
      role: 'Food Blogger',
      image: 'https://i.pravatar.cc/150?img=1',
      quote: 'FoodieSpace has become my go-to platform for discovering new restaurants. The reviews are genuine and help me make informed dining choices!',
      rating: 5,
    },
    {
      name: 'Mike Rahman',
      role: 'Restaurant Manager',
      image: 'https://i.pravatar.cc/150?img=12',
      quote: 'As a restaurant owner, I appreciate the honest feedback from foodieSpace users. It helps us improve our service and menu continuously.',
      rating: 5,
    },
    {
      name: 'Ayesha Khan',
      role: 'Food Enthusiast',
      image: 'https://i.pravatar.cc/150?img=5',
      quote: 'I love how easy it is to share my dining experiences and read reviews from fellow food lovers. This platform is amazing!',
      rating: 5,
    },
  ];

  return (
    <section className="section-spacing bg-base-100">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Real experiences from our community of food enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card bg-base-200 card-consistent p-8 relative"
            >
              <FaQuoteLeft className="text-4xl text-primary opacity-20 absolute top-6 left-6" />
              
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg">{testimonial.name}</h4>
                  <p className="text-sm opacity-70">{testimonial.role}</p>
                  <div className="mt-1">
                    <Rating value={testimonial.rating} readOnly />
                  </div>
                </div>
              </div>

              <p className="text-base opacity-90 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
