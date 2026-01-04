import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQPreviewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: 'How do I add a review?',
      answer: 'Simply sign up or log in, click on "Add Review" in the navigation menu, fill in the restaurant and food details, rate your experience, and share your thoughts!',
    },
    {
      question: 'Are all reviews verified?',
      answer: 'All reviews come from registered users who have visited the restaurants. We have moderation in place to ensure authenticity and quality.',
    },
    {
      question: 'Can I edit or delete my reviews?',
      answer: 'Yes! You can view all your reviews in the "My Reviews" section and edit or delete them anytime.',
    },
    {
      question: 'How can I save my favorite reviews?',
      answer: 'Click the heart icon on any review to add it to your favorites. Access all your saved reviews in the "My Favorites" section.',
    },
  ];

  return (
    <section className="section-spacing bg-base-200">
      <div className="max-w-4xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg opacity-80">
            Quick answers to common questions about FoodieSpace
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse collapse-plus bg-base-100 shadow-md rounded-xl"
            >
              <input
                type="radio"
                name="faq-accordion"
                checked={activeIndex === index}
                onChange={() => setActiveIndex(index)}
              />
              <div className="collapse-title text-xl font-semibold flex items-center justify-between">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="opacity-80 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/faq" className="btn btn-primary btn-lg rounded-full">
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQPreviewSection;
