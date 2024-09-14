import { useState } from "react";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ boxShadow: "0px 0px 20px rgba(0,0,0,0.4)" }}
      >
        <motion.h2
          className="text-4xl font-extrabold text-center mb-8 text-[#000435]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ease: "easeOut" }}
          whileHover={{ rotate: 2 }}
        >
          <span className="text-yellow-400">Bid</span> <span className="text-[#000435]">Out</span>
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <motion.input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[white] focus:border-[#000435]"
              whileFocus={{ scale: 1.03, borderColor: "#7c3aed" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <motion.input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-[white] focus:border-[#000435]"
              whileFocus={{ scale: 1.03, borderColor: "#7c3aed" }}
            />
          </motion.div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <motion.input
                type="checkbox"
                className="form-checkbox text-[#000435]"
                whileTap={{ scale: 1.2 }}
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-[#000435] hover:underline">
              Forgot password?
            </a>
          </div>

          <motion.button
            type="submit"
            className="w-full px-4 py-3 bg-[#000435] text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-600 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, ease: "easeOut" }}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginForm;
