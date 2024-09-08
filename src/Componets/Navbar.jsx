// Navbar.jsx
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-yellow-400">Bid</span>Out
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-yellow-300">Home</Link>
            <Link to="/login" className="hover:text-yellow-300">Login</Link>
            <Link to="/signup" className="hover:text-yellow-300">Signup</Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-blue-600 p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <i className="fas fa-times w-6 h-6"></i>
              ) : (
                <i className="fas fa-bars w-6 h-6"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-600">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
          >
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
