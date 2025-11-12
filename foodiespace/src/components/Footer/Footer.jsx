import React from 'react';
import logogif from '../../assets/images/logoGif.gif';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer flex justify-around items-center sm:footer-horizontal bg-base-300 text-base-content  p-10">
      <p
        className="text-2xl bg-clip-text text-transparent"
        style={{
          WebkitTextStroke: '0.3px gray',
          backgroundImage: `url(${logogif})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        foodieSpace
      </p>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <FaXTwitter className="text-2xl" />
          <FaYoutube className="text-2xl" />
          <FaFacebook className="text-2xl" />
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
