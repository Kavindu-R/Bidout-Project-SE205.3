/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import AuthNotification from "../../components/screens/AuthNotification"; // Import the AuthNotification component

const Profile = ({ user, setUser }) => {
  const userData = JSON.parse(localStorage.getItem("user"));

  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [mobile, setMobile] = useState(userData?.mobile || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [username, setUsername] = useState(userData?.username || "");
  const [message, setMessage] = useState("");
  const [messageOk, setMessageOk] = useState(true); // To control message type (success or error)

  const handleSave = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !gender.trim() ||
      !mobile ||
      !address.trim() ||
      !email.trim() ||
      !username.trim()
    ) {
      setMessage("Please fill in all fields.");
      setMessageOk(false);
      return;
    }
    if (mobile.length !== 10) {
      setMessage("Mobile number must be 10 digits.");
      setMessageOk(false);
      return;
    }
    const updatedUser = {
      ...userData,
      firstName,
      lastName,
      gender,
      mobile,
      address,
      email,
      username,
    };

    try {
      const response = await fetch("http://localhost:5173/api/users/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      const res = await response.json();
      if (response.ok) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));

        setMessageOk(true);
        setMessage(`${res.message}`);
      } else {
        setMessageOk(false);
        setMessage(`${res.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageOk(false);
      setMessage("Server error occurred. Please try again.");
    }

    // Update user data in localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // Set success message and type
    setMessage("Profile updated successfully.");
    setMessageOk(true);
  };

  const handleReset = () => {
    setFirstName(userData?.firstName || "");
    setLastName(userData?.lastName || "");
    setGender(userData?.gender || "");
    setMobile(userData?.mobile || "");
    setAddress(userData?.address || "");
    setEmail(userData?.email || "");
    setUsername(userData?.username || "");

    // Set reset message and type
    setMessage("Changes have been reset.");
    setMessageOk(true);
  };

  return (
    <div className="bg-white flex items-center justify-center">
      <motion.div
        className="w-full p-6 bg-white shadow-md rounded-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-2xl font-bold text-center mb-6 text-indigo-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Edit Profile
        </motion.h2>

        {/* Show AuthNotification if there's a message */}
        <AuthNotification message={message} message_ok={messageOk} />

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile
              </label>
              <input
                id="mobile"
                name="mobile"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username (This cannot be changed)
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                disabled
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.button
              type="button"
              className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
            >
              Save
            </motion.button>

            <motion.button
              type="button"
              className="w-full px-4 py-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
            >
              Reset
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile;
