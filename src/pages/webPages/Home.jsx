import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  return (
    <div className="bg-[#000435] min-h-screen text-white overflow-hidden">
      <header className="text-center py-20">
        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-yellow-300"
        >
          Welcome to <span className="text-yellow-500">BidOut!!</span>
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg mt-4"
        >
          The best auction platform to bid on your favorite items
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 flex justify-center space-x-4"
        >
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="12113"
            className="bg-yellow-400 text-black px-6 py-3 rounded-full shadow-lg"
          >
            Explore Auctions
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="signup"
            className="bg-blue-600 px-6 py-3 rounded-full shadow-lg"
          >
            Register Now
          </motion.a>
        </motion.div>
      </header>
    </div>
  );
};

export default HomePage;
