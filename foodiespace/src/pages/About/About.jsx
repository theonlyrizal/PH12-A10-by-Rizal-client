import React from 'react';
import { FaUsers, FaHeart, FaStar, FaUtensils } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About FoodieSpace</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Your trusted platform for authentic restaurant reviews and culinary discoveries
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="section-spacing bg-base-100">
        <div className="max-w-4xl mx-auto container-padding">
          <h2 className="text-4xl font-bold mb-6 text-center">Our Mission</h2>
          <p className="text-lg opacity-80 leading-relaxed text-center mb-8">
            At FoodieSpace, we believe that every dining experience deserves to be shared. Our mission is to create a vibrant community of food enthusiasts who help each other discover the best restaurants, hidden gems, and culinary delights. We're committed to providing a platform where honest reviews and authentic experiences guide fellow foodies to make informed dining decisions.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="section-spacing bg-base-200">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-100 p-8 text-center card-consistent">
              <FaHeart className="text-5xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Authenticity</h3>
              <p className="opacity-80">We value genuine experiences and honest reviews from real diners.</p>
            </div>
            
            <div className="card bg-base-100 p-8 text-center card-consistent">
              <FaUsers className="text-5xl text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Community</h3>
              <p className="opacity-80">Building a supportive community of food lovers who share their passion.</p>
            </div>
            
            <div className="card bg-base-100 p-8 text-center card-consistent">
              <FaStar className="text-5xl text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Quality</h3>
              <p className="opacity-80">Maintaining high standards for content and user experience.</p>
            </div>
            
            <div className="card bg-base-100 p-8 text-center card-consistent">
              <FaUtensils className="text-5xl text-warning mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Discovery</h3>
              <p className="opacity-80">Helping you explore new cuisines and find your next favorite restaurant.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="section-spacing bg-base-100">
        <div className="max-w-7xl mx-auto container-padding">
          <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-200 card-consistent overflow-hidden">
              <figure>
                <img src="https://i.pravatar.cc/400?img=33" alt="Team Member" className="w-full h-72 object-cover" />
              </figure>
              <div className="card-body text-center">
                <h3 className="card-title justify-center">Alex Johnson</h3>
                <p className="text-primary font-semibold">Founder & CEO</p>
                <p className="opacity-80">Passionate food blogger turned entrepreneur, dedicated to creating the ultimate review platform.</p>
              </div>
            </div>
            
            <div className="card bg-base-200 card-consistent overflow-hidden">
              <figure>
                <img src="https://i.pravatar.cc/400?img=44" alt="Team Member" className="w-full h-72 object-cover" />
              </figure>
              <div className="card-body text-center">
                <h3 className="card-title justify-center">Sarah Chen</h3>
                <p className="text-primary font-semibold">Head of Community</p>
                <p className="opacity-80">Building and nurturing our vibrant community of food enthusiasts worldwide.</p>
              </div>
            </div>
            
            <div className="card bg-base-200 card-consistent overflow-hidden">
              <figure>
                <img src="https://i.pravatar.cc/400?img=15" alt="Team Member" className="w-full h-72 object-cover" />
              </figure>
              <div className="card-body text-center">
                <h3 className="card-title justify-center">Michael Rodriguez</h3>
                <p className="text-primary font-semibold">Lead Developer</p>
                <p className="opacity-80">Crafting the best user experience with cutting-edge technology and design.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="section-spacing bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto container-padding text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl opacity-90 mb-8">
            Be part of a growing community of food lovers sharing their experiences
          </p>
          <a href="/register" className="btn btn-lg bg-white text-primary hover:bg-base-100 border-none rounded-full">
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
