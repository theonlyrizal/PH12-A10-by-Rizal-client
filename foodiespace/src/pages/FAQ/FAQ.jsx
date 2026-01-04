import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const faqCategories = [
    { id: 'all', name: 'All' },
    { id: 'general', name: 'General' },
    { id: 'account', name: 'Account' },
    { id: 'reviews', name: 'Reviews' },
    { id: 'technical', name: 'Technical' },
  ];

  const faqs = [
    {
      category: 'general',
      question: 'What is FoodieSpace?',
      answer: 'FoodieSpace is a community-driven platform where food enthusiasts can share and discover authentic restaurant reviews. We help you make informed dining decisions by providing genuine experiences from real diners.',
    },
    {
      category: 'general',
      question: 'Is FoodieSpace free to use?',
      answer: 'Yes! FoodieSpace is completely free for all users. You can browse reviews, write your own reviews, and participate in our community at no cost.',
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click the "Login" button in the top right corner, then select "Register" or "Sign Up with Google" to create your account. You can sign up using your email address or Google account.',
    },
    {
      category: 'account',
      question: 'Can I change my profile information?',
      answer: 'Yes! Once logged in, go to your Dashboard and click on "My Profile" to update your name, profile picture, and other information.',
    },
    {
      category: 'account',
      question: 'I forgot my password. What should I do?',
      answer: 'Click the "Login" button, then select "Forgot Password". Enter your email address and we\'ll send you instructions to reset your password.',
    },
    {
      category: 'reviews',
      question: 'How do I add a review?',
      answer: 'Sign in to your account, click "Add Review" in the navigation menu, fill in the restaurant and food details, rate your experience, and share your thoughts. It\'s that simple!',
    },
    {
      category: 'reviews',
      question: 'Can I edit or delete my reviews?',
      answer: 'Absolutely! Go to "My Reviews" in your profile dropdown. There you can edit or delete any of your previously submitted reviews.',
    },
    {
      category: 'reviews',
      question: 'Are all reviews verified?',
      answer: 'All reviews come from registered users. While we don\'t verify that every user has visited the restaurant, we have moderation in place to detect and remove fake or spam reviews.',
    },
    {
      category: 'reviews',
      question: 'How can I save my favorite reviews?',
      answer: 'Click the heart icon on any review to add it to your favorites. You can access all your saved reviews in the "My Favorites" section from your profile dropdown.',
    },
    {
      category: 'reviews',
      question: 'Can I search for specific restaurants or foods?',
      answer: 'Yes! Use the search bar on the "All Reviews" page to search by food name or restaurant name. You can also filter reviews by rating, category, and date.',
    },
    {
      category: 'technical',
      question: 'Why can\'t I see images loading?',
      answer: 'This might be due to slow internet connection or browser cache issues. Try refreshing the page or clearing your browser cache. If the problem persists, please contact our support team.',
    },
    {
      category: 'technical',
      question: 'Is there a mobile app?',
      answer: 'Currently, FoodieSpace is a web-based platform optimized for all devices including mobile browsers. A dedicated mobile app is in our roadmap for future development.',
    },
    {
      category: 'technical',
      question: 'Which browsers are supported?',
      answer: 'FoodieSpace works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.',
    },
    {
      category: 'technical',
      question: 'How do I report a bug or issue?',
      answer: 'You can report bugs or technical issues through our Contact page. Please provide as much detail as possible including your browser, device, and steps to reproduce the issue.',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Find answers to common questions about FoodieSpace
          </p>
        </div>
      </div>

      <div className="section-spacing bg-base-100">
        <div className="max-w-4xl mx-auto container-padding">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search FAQs..."
                className="input input-bordered w-full pl-12 input-lg"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50" />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {faqCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`btn btn-sm rounded-full ${
                  activeCategory === category.id
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="collapse collapse-plus bg-base-200 shadow-md rounded-xl">
                  <input type="checkbox" name="faq-accordion" defaultChecked={index === 0} />
                  <div className="collapse-title text-lg font-semibold pr-12">
                    <span className="badge badge-primary badge-sm mr-3">{faq.category}</span>
                    {faq.question}
                  </div>
                  <div className="collapse-content">
                    <p className="opacity-80 leading-relaxed pt-2">{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-xl opacity-80">No FAQs found matching your search.</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-12 p-8 bg-gradient-to-r from-primary to-secondary rounded-xl text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
            <p className="mb-6 opacity-90">Can't find what you're looking for? Feel free to reach out to us!</p>
            <a href="/contact" className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none rounded-full">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
