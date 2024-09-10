import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to <span className="text-yellow-400">BidOut</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            The premier auction site where you can find the best deals on exclusive items.
          </p>
          <Link to="/signup">
            <button className="mt-6 px-6 py-3 bg-yellow-400 text-indigo-900 rounded-lg font-semibold text-lg hover:bg-yellow-300">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Auctions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Auctions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Auction Item 1 */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <img
                src="/auction-item-1.jpg"
                alt="Auction Item 1"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">Vintage Watch</h3>
              <p className="text-gray-500 mt-2">Starting bid: $150</p>
              <Link to="/auction/1">
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Bid Now
                </button>
              </Link>
            </div>

            {/* Example Auction Item 2 */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <img
                src="/auction-item-2.jpg"
                alt="Auction Item 2"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">Art Piece</h3>
              <p className="text-gray-500 mt-2">Starting bid: $500</p>
              <Link to="/auction/2">
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Bid Now
                </button>
              </Link>
            </div>

            {/* Example Auction Item 3 */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <img
                src="/auction-item-3.jpg"
                alt="Auction Item 3"
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold mt-4">Luxury Car</h3>
              <p className="text-gray-500 mt-2">Starting bid: $25,000</p>
              <Link to="/auction/3">
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Bid Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Explore Categories</h2>
          <div className="flex justify-center space-x-8">
            <Link to="/category/antiques">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Antiques
              </button>
            </Link>
            <Link to="/category/art">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Art
              </button>
            </Link>
            <Link to="/category/cars">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Cars
              </button>
            </Link>
            <Link to="/category/electronics">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Electronics
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold">
            Ready to start bidding?
          </h2>
          <p className="mt-4 text-lg">
            Join the BidOut community today and find the best deals.
          </p>
          <Link to="/signup">
            <button className="mt-6 px-6 py-3 bg-yellow-400 text-indigo-900 rounded-lg font-semibold text-lg hover:bg-yellow-300">
              Sign Up Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
