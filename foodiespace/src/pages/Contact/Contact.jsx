import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { FaXTwitter, FaFacebook, FaInstagram } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto container-padding text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="section-spacing bg-base-100">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Your Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Subject</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Message</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    className="textarea textarea-bordered h-32 w-full"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg w-full rounded-full gap-2"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="card bg-base-200 p-6 card-consistent">
                  <div className="flex items-start gap-4">
                    <FaEnvelope className="text-3xl text-primary mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email</h3>
                      <p className="opacity-80">support@foodiespace.com</p>
                      <p className="opacity-80">contact@foodiespace.com</p>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-200 p-6 card-consistent">
                  <div className="flex items-start gap-4">
                    <FaPhone className="text-3xl text-primary mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Phone</h3>
                      <p className="opacity-80">+1 (555) 123-4567</p>
                      <p className="opacity-80 text-sm">Mon-Fri, 9am-6pm EST</p>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-200 p-6 card-consistent">
                  <div className="flex items-start gap-4">
                    <FaMapMarkerAlt className="text-3xl text-primary mt-1" />
                    <div>
                      <h3 className="font-bold text-lg mb-2">Address</h3>
                      <p className="opacity-80">123 Food Street</p>
                      <p className="opacity-80">Culinary City, FC 12345</p>
                      <p className="opacity-80">United States</p>
                    </div>
                  </div>
                </div>

                <div className="card bg-gradient-to-br from-primary to-secondary text-white p-6">
                  <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-lg bg-white/20 hover:bg-white/30 border-none">
                      <FaFacebook className="text-2xl" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-lg bg-white/20 hover:bg-white/30 border-none">
                      <FaXTwitter className="text-2xl" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-lg bg-white/20 hover:bg-white/30 border-none">
                      <FaInstagram className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
