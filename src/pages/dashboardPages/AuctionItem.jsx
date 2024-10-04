import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AuctionItem = () => {
  const { id } = useParams(); // Get the auction ID from the URL
  const [auction, setAuction] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the auction details based on the ID
    const fetchAuctionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5173/api/auctions/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch auction details");
        }
        const data = await response.json();

        // Set auction and seller data from the API response
        setAuction(data.data.auction);
        setSeller(data.data.seller);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAuctionDetails();
  }, [id]);

  if (loading) {
    return <p>Loading auction details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!auction) {
    return <p>Auction not found.</p>;
  }

  return (
    <div className="">
      <img
        src={auction.auctionImage}
        alt={auction.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{auction.title}</h1>
      <p className="text-gray-700 mb-4">{auction.description}</p>
      <p className="text-gray-600 mb-2">Category: {auction.auctionCategory}</p>
      <p className="text-gray-600 mb-2">Starting Bid: ${auction.startingBid}</p>
      <p className="text-gray-600 mb-2">
        Start Date: {new Date(auction.startTime).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        End Date: {new Date(auction.endTime).toLocaleDateString()}
      </p>
      <p
        className={`text-${auction.status === "active" ? "green" : "red"}-600`}
      >
        Status: {auction.status}
      </p>

      <div className="mt-6 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-2">Seller Information</h2>
        <p className="text-gray-600">
          Name: {seller.firstName} {seller.lastName}
        </p>
        <p className="text-gray-600">Username: {seller.username}</p>
        <p className="text-gray-600">Email: {seller.email}</p>
        <p className="text-gray-600">Mobile: {seller.mobile}</p>
        <p className="text-gray-600">Address: {seller.address}</p>
      </div>
    </div>
  );
};

export default AuctionItem;
