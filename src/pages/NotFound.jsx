import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound= () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h1
            className="text-9xl font-bold"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            404:
          </motion.h1>
          <motion.h2
            className="text-4xl mt-4"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            This page is missing like a sock after laundry day.
          </motion.h2>
          <motion.p
            className="text-lg mt-2 text-gray-300"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            Oops! It looks like this page doesn't exist.
          </motion.p>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Link
              to="/"
              className="bg-yellow-400 text-indigo-800 px-6 py-3 font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-500"
            >
              Go Back Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
