import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  if (!user) return <div className="text-white">No user data available</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex justify-center items-center text-white p-6">
      <div className="container mx-auto max-w-4xl bg-white text-indigo-900 rounded-lg shadow-lg p-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.img
            src={user.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="mx-auto h-32 w-32 rounded-full border-4 border-yellow-400 shadow-lg"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <motion.h1
            className="text-3xl font-bold mt-4"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            {user.name}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            {user.email}
          </motion.p>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            className="bg-indigo-200 p-6 rounded-lg shadow-md"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="text-xl font-bold">User Details</h2>
            <ul className="mt-4 space-y-2 text-indigo-700">
              <li><strong>Username:</strong> {user.username}</li>
              <li><strong>Telephone:</strong> {user.telephone}</li>
              <li><strong>Postal Code:</strong> {user.postalCode}</li>
              <li><strong>Gender:</strong> {user.gender}</li>
              <li><strong>Location:</strong> {user.location}</li>
              <li><strong>Joined:</strong> {new Date(user.joined).toLocaleDateString()}</li>
            </ul>
          </motion.div>
        </motion.div>

      
        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
