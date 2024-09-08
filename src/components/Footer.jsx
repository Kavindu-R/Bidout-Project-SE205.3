import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-wrap md:flex-nowrap">
          {/* Left section - Brand and Description */}
          <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5">
            <h2 className="text-2xl font-bold">
              <span className="text-yellow-400">Bid</span>Out
            </h2>
            <p className="mt-2 text-gray-300">
             Best Acution Market. Join us to explore more!
            </p>
          </div>

          {/* Middle section - Links */}
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mt-4 md:mt-0">
            <div className="flex space-x-8">
              <div>
                <h3 className="text-lg font-semibold">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li key="home">
                    <Link to="/" className="hover:text-yellow-300">Home</Link>
                  </li>
                  <li key="login">
                    <Link to="/login" className="hover:text-yellow-300">Login</Link>
                  </li>
                  <li key="signup">
                    <Link to="/signup" className="hover:text-yellow-300">Sign Up</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Support</h3>
                <ul className="mt-4 space-y-2">
                  <li key="help-center">
                    <Link to="/help-center" className="hover:text-yellow-300">Help Center</Link>
                  </li>
                  <li key="contact-us">
                    <Link to="/contact-us" className="hover:text-yellow-300">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right section - Social Icons */}
          <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mt-4 md:mt-0 flex justify-center md:justify-end">
            <div className="flex space-x-4 flex-wrap justify-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                <FontAwesomeIcon icon={faFacebook} size="2x" aria-label="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                <FontAwesomeIcon icon={faTwitter} size="2x" aria-label="Twitter" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                <FontAwesomeIcon icon={faInstagram} size="2x" aria-label="Instagram" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                <FontAwesomeIcon icon={faLinkedin} size="2x" aria-label="LinkedIn" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} BidOut. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;