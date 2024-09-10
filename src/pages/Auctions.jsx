import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AuctionPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [newAuction, setNewAuction] = useState({ title: '', description: '', startPrice: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('/api/auctions'); // Replace with API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch auctions');
        }
        const data = await response.json();
        setAuctions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const handleCreateAuction = async () => {
    try {
      const response = await fetch('/api/auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAuction),
      });
      if (!response.ok) {
        throw new Error('Failed to create auction');
      }
      const data = await response.json();
      setAuctions([...auctions, data]);
      setNewAuction({ title: '', description: '', startPrice: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAuction = async (id) => {
    try {
      const response = await fetch(`/api/auctions/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed to delete auction');
      }
      setAuctions(auctions.filter(auction => auction.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <motion.h1
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Auction Page
        </motion.h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Auction</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newAuction.title}
              onChange={(e) => setNewAuction({ ...newAuction, title: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Description"
              value={newAuction.description}
              onChange={(e) => setNewAuction({ ...newAuction, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Starting Price"
              value={newAuction.startPrice}
              onChange={(e) => setNewAuction({ ...newAuction, startPrice: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              onClick={handleCreateAuction}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Create Auction
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Active Auctions</h2>
          <div className="space-y-4">
            {auctions.map((auction) => (
              <motion.div
                key={auction.id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h3 className="text-lg font-bold">{auction.title}</h3>
                  <p>{auction.description}</p>
                  <p className="text-gray-600">Starting Price: ${auction.startPrice}</p>
                </div>
                <button
                  onClick={() => handleDeleteAuction(auction.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionPage;
