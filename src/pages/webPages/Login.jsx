import { useState } from "react";
import { motion } from "framer-motion";
import AuthNotification from "../../components/screens/AuthNotification";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types, no-unused-vars
const LoginForm = ({ user, setUser }) => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [message_ok, setMessage_ok] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Please fill in all fields.");
      return;
    }

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:5173/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const res = await response.json();
      if (response.ok) {
        setMessage_ok(true);
        setMessage(`${res.message}`);

        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setMessage_ok(false);
        setMessage(`${res.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage_ok(false);
      setMessage("Server error occurred. Please try again.");
    }
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
          <span className="text-yellow-400">Bid</span>{" "}
          <span className="text-[#000435]">Out</span>
        </motion.h2>
        <AuthNotification message={message} message_ok={message_ok} />
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
              Username or Email
            </label>
            <motion.input
              id="username"
              name="username"
              type="text"
              value={username}
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
