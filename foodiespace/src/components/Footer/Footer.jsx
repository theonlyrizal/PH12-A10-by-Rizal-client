import React from 'react';
import logogif from '../../assets/images/logoGif.gif';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content p-10">
      <div className="max-w-7xl mx-auto">
        {/* Desktop Footer - Horizontal Layout */}
        <div className="hidden sm:flex justify-around items-start flex-wrap gap-8">
          <div>
            <p
              className="text-2xl bg-clip-text text-transparent font-bold"
              style={{
                WebkitTextStroke: '0.3px gray',
                backgroundImage: `url(${logogif})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              foodieSpace
            </p>
          </div>

          <nav>
            <h6 className="footer-title text-lg font-bold mb-3">Services</h6>
            <div className="space-y-2">
              <a className="link link-hover block">Branding</a>
              <a className="link link-hover block">Design</a>
              <a className="link link-hover block">Marketing</a>
              <a className="link link-hover block">Advertisement</a>
            </div>
          </nav>

          <nav>
            <h6 className="footer-title text-lg font-bold mb-3">Company</h6>
            <div className="space-y-2">
              <a className="link link-hover block">About us</a>
              <a className="link link-hover block">Contact</a>
              <a className="link link-hover block">Jobs</a>
              <a className="link link-hover block">Press kit</a>
            </div>
          </nav>

          <nav>
            <h6 className="footer-title text-lg font-bold mb-3">Social</h6>
            <div className="flex gap-4">
              <FaXTwitter className="text-2xl cursor-pointer hover:text-primary transition" />
              <FaYoutube className="text-2xl cursor-pointer hover:text-primary transition" />
              <FaFacebook className="text-2xl cursor-pointer hover:text-primary transition" />
            </div>
          </nav>
        </div>

        {/* Mobile Footer - Stacked Layout */}
        <div className="sm:hidden space-y-6">
          <div className="text-center">
            <p
              className="text-2xl bg-clip-text text-transparent font-bold"
              style={{
                WebkitTextStroke: '0.3px gray',
                backgroundImage: `url(${logogif})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              foodieSpace
            </p>
          </div>

          <nav className="text-center">
            <h6 className="footer-title text-lg font-bold mb-3">Services</h6>
            <div className="space-y-2">
              <a className="link link-hover block">Branding</a>
              <a className="link link-hover block">Design</a>
              <a className="link link-hover block">Marketing</a>
              <a className="link link-hover block">Advertisement</a>
            </div>
          </nav>

          <nav className="text-center">
            <h6 className="footer-title text-lg font-bold mb-3">Company</h6>
            <div className="space-y-2">
              <a className="link link-hover block">About us</a>
              <a className="link link-hover block">Contact</a>
              <a className="link link-hover block">Jobs</a>
              <a className="link link-hover block">Press kit</a>
            </div>
          </nav>

          <nav className="text-center">
            <h6 className="footer-title text-lg font-bold mb-3">Follow Us</h6>
            <div className="flex gap-4 justify-center">
              <FaXTwitter className="text-2xl cursor-pointer hover:text-primary transition" />
              <FaYoutube className="text-2xl cursor-pointer hover:text-primary transition" />
              <FaFacebook className="text-2xl cursor-pointer hover:text-primary transition" />
            </div>
          </nav>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm opacity-70">
          <p>&copy; 2024 foodieSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
