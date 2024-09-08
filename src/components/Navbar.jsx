import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold">
                <span className="text-yellow-400">Bid</span>Out
              </Link>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                to="/"
                className="hover:text-yellow-300 text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="hover:text-yellow-300 text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-yellow-300 text-base font-medium"
              >
                Signup
              </Link>
            </div>
            <div className="flex md:hidden">
              <button
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none w-8"
              >
                <span className="sr-only">Open main menu</span>
                <FontAwesomeIcon size="lg" icon={!isOpen ? faBars : faXmark} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "max-h-40" : "max-h-0"
          } md:hidden absolute w-full overflow-hidden transition-max-height duration-500`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-600">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              Home
            </Link>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
