import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSearch,
  faGavel,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const AuctionProcess = () => {
  const steps = [
    {
      title: "Sign Up",
      description: "Create an account to start bidding on your favorite items.",
      icon: faUserPlus, // Font Awesome icon for Sign Up
    },
    {
      title: "Browse Auctions",
      description: "Explore various auctions and find items you want.",
      icon: faSearch, // Font Awesome icon for Browse Auctions
    },
    {
      title: "Place Bids",
      description: "Submit your bids and compete with other bidders.",
      icon: faGavel, // Font Awesome icon for Place Bids
    },
    {
      title: "Win & Checkout",
      description:
        "If you win, complete your purchase easily through our platform.",
      icon: faShoppingCart, // Font Awesome icon for Win & Checkout
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-4xl font-semibold text-center mb-12"
      >
        Auction Process
      </motion.h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center transition-transform duration-300"
          >
            <div className="flex flex-col items-center mb-6">
              <FontAwesomeIcon
                icon={step.icon}
                className="w-12 h-12 text-blue-600"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {step.title}
            </h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AuctionProcess;
