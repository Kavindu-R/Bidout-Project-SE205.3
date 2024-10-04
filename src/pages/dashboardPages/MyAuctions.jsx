import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthNotification from "../../components/screens/AuthNotification";

const MyAuctions = () => {
  const [myAuctions, setMyAuctions] = useState([]);
  const [message, setMessage] = useState("");
  const [message_ok, setMessage_ok] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's auctions from the API
    const id = JSON.parse(localStorage.getItem("user")).id;
    const fetchMyAuctions = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/auctions/my", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id: id }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch auctions");
        }
        const data = await response.json();
        setMyAuctions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setMessage("Failed to load your auctions.");
        setMessage_ok(false);
        setLoading(false);
      }
    };

    fetchMyAuctions();
  }, []);

  const handleCreateAuction = () => {
    // Navigate to create auction page
    navigate("/create-auction");
  };

  const handleAuctionClick = (auctionId) => {
    // Navigate to auction detail page
    navigate(`/auction/${auctionId}`);
  };

  const handleEditAuction = (auctionId) => {
    // Navigate to edit auction page
    navigate(`/edit-auction/${auctionId}`);
  };

  if (loading) {
    return <p>Loading your auctions...</p>;
  }

  if (error) {
    return (
      <div>
        <AuthNotification message={message} message_ok={message_ok} />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="">
      <AuthNotification message={message} message_ok={message_ok} />

      <div className="flex justify-end items-center mb-4">
        <button
          onClick={handleCreateAuction}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Create New Auction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myAuctions.length > 0 ? (
          myAuctions.map((auction) => (
            <div
              key={auction.auctionId}
              className="border rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={auction.auctionImage}
                alt={auction.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{auction.title}</h2>
              <p className="text-gray-700 text-sm mb-2">
                {auction.description}
              </p>
              <p className="text-gray-600 text-sm font-semibold">
                Starting Bid: ${auction.startingBid}
              </p>
              <p className="text-gray-600 text-sm font-semibold">
                Category: ${auction.auctionCategory}
              </p>
              <p className="text-gray-600 text-sm my-2 font-semibold">
                Status: {auction.status}
              </p>
              <p className="text-gray-600 text-sm">
                Start Date: {new Date(auction.startTime).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm mb-2">
                End Date: {new Date(auction.endTime).toLocaleDateString()}
              </p>
              <div className="flex space-x-2 mt-auto">
                <button
                  onClick={() => handleAuctionClick(auction.auctionId)}
                  className="px-3 py-2 bg-green-500 text-white rounded-md"
                >
                  Preview
                </button>
                <button
                  onClick={() => handleEditAuction(auction.auctionId)}
                  className="px-3 py-2 bg-yellow-500 text-white rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No auctions found.</p>
        )}
      </div>
    </div>
  );
};

export default MyAuctions;
