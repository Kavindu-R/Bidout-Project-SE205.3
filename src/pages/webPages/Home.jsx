/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import AuctionProcess from "./HowItWorks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCircle,
  faClock,
  faCreditCard,
  faDollarSign,
  faHandHoldingUsd,
  faSearch,
  faTrophy,
  faUserPlus,
  faUsers,
  faLock, // Icon for Secure Bidding
  faBolt, // Icon for Fast Transactions
  faHeadset, // Icon for 24/7 Support
  faGlobe, // Icon for Global Auctions
} from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const features = [
    {
      title: "Secure Bidding",
      description:
        "Top-notch security ensuring your bids are safe and reliable.",
      icon: faLock, // Updated to Font Awesome icon
    },
    {
      title: "Fast Transactions",
      description: "Experience instant and smooth transactions with no delays.",
      icon: faBolt, // Updated to Font Awesome icon
    },
    {
      title: "24/7 Support",
      description: "Our support team is always available to assist you.",
      icon: faHeadset, // Updated to Font Awesome icon
    },
    {
      title: "Global Auctions",
      description: "Access auctions from all over the world with ease.",
      icon: faGlobe, // Updated to Font Awesome icon
    },
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      feedback:
        "BidOut is by far the best auction platform. I've won incredible items and the process was seamless.",
    },
    {
      name: "Samantha Lee",
      feedback:
        "Professional, secure, and easy to use. BidOut exceeded my expectations with its clean interface.",
    },
    {
      name: "Chris Martin",
      feedback:
        "Great experience from start to finish. Fast transactions and excellent customer support.",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="text-center py-20 bg-white shadow-md">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-extrabold tracking-tight flex align-middle text-center items-center justify-center"
        >
          Discover{" "}
          <div className="font-bold flex items-center ml-3 space-x-2">
            <span className="text-yellow-500">Bid</span>Out
          </div>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-lg text-gray-600"
        >
          The ultimate platform for secure, global auctions.
        </motion.p>
      </header>

      {/* Auction Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold text-center mb-8 text-[#000435]"
          >
            How Our Auction Process Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-700 mb-8 text-center"
          >
            Our auction process is designed to be straightforward and
            user-friendly. Here's how it works:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                step: "1. Register",
                description:
                  "Create an account with us to start participating in auctions. Registration is free and only takes a few minutes.",
                icon: faUserPlus,
              },
              {
                step: "2. Browse Auctions",
                description:
                  "Explore our extensive list of active auctions and find items that interest you.",
                icon: faSearch,
              },
              {
                step: "3. Place Your Bid",
                description:
                  "To place a bid, you must pay an upfront fee of 10% of the auction value. Bids can only increase in increments of $10.",
                icon: faHandHoldingUsd,
              },
              {
                step: "4. Winning Bidder",
                description:
                  "If you have the highest bid at the end of the auction, you win! You will have 24 hours to complete your purchase.",
                icon: faTrophy,
              },
              {
                step: "5. Complete Payment",
                description:
                  "Follow the payment instructions to finalize your purchase. Your upfront fee will be refunded upon successful payment.",
                icon: faCreditCard,
              },
              {
                step: "6. Enjoy Your Item!",
                description:
                  "After payment is confirmed, enjoy your new item. We will ship it directly to you!",
                icon: faBoxOpen,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="p-6 bg-white rounded-lg shadow-lg text-center"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-5xl text-blue-600 mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{item.step}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-gray-700 mb-4">
              Remember, if payment is not completed within 24 hours after
              winning, your bid will be voided, and the next highest bidder will
              be notified.
            </p>
            <p className="text-lg text-gray-700">
              Join us today and start winning exciting items through our auction
              process!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold text-center mb-12"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="mx-auto mb-6 text-blue-600 text-5xl"
                />
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold text-center mb-12"
          >
            What Our Users Say
          </motion.h2>
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-lg shadow-md"
              >
                <p className="text-lg italic text-gray-700 mb-4">
                  "{testimonial.feedback}"
                </p>
                <p className="text-lg font-semibold text-[#000435]">
                  - {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AuctionProcess />
    </div>
  );
};

export default HomePage;
