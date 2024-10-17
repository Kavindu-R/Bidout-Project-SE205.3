import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AuctionItemComp = () => {
  const { id } = useParams(); // Get the auction ID from the URL
  const [auction, setAuction] = useState(null);
  const [seller, setSeller] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bidAmount, setBidAmount] = useState(10); // Default bid amount is $10
  const [bidError, setBidError] = useState("");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Fetch the auction details based on the ID
    const fetchAuctionDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5173/api/auctions/${id}`
        );
        if (!response.ok) {
          throw new Error("Auction not found.");
        }
        const data = await response.json();

        // Set auction and seller data from the API response
        setAuction(data.data.auction);
        setSeller(data.data.seller);
        if (data.data.winner) {
          setWinner(data.data.winner);
        }

        // Calculate the highest bid amount from the bids array
        const highestBid =
          data.data.auction.bids.length > 0
            ? Math.max(...data.data.auction.bids.map((bid) => bid.bidAmount))
            : data.data.auction.startingBid;

        // Set the minimum bid amount to highest bid + $10
        setBidAmount(highestBid + 10);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAuctionDetails();
  }, [id]);

  useEffect(() => {
    if (auction) {
      const countdownInterval = setInterval(() => {
        const endTime = new Date(auction.endTime);
        const now = new Date();
        const timeRemaining = endTime - now;

        if (timeRemaining <= 0) {
          clearInterval(countdownInterval);
          setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
          const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
          setCountdown({ days, hours, minutes, seconds });
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [auction]);

  // Handle bid submission
  const handleBid = async () => {
    const highestBid =
      auction.bids.length > 0
        ? Math.max(...auction.bids.map((bid) => bid.bidAmount))
        : auction.startingBid;

    const minimumBid = highestBid + 10;

    if (bidAmount < minimumBid) {
      setBidError(`Bid amount must be at least $${minimumBid}.`);
      return;
    }

    try {
      const response = await fetch("http://localhost:5173/api/bids/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auctionId: auction.auctionId,
          bidderId: currentUser.id,
          status: "active",
          bidAmount: bidAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place bid.");
      }

      // Re-fetch auction details after successful bid
      const updatedResponse = await fetch(
        `http://localhost:5173/api/auctions/${id}`
      );
      const updatedData = await updatedResponse.json();
      setAuction(updatedData.data.auction);

      // Recalculate the highest bid after placing a bid
      const highestBidAfterBid =
        updatedData.data.auction.bids.length > 0
          ? Math.max(
              ...updatedData.data.auction.bids.map((bid) => bid.bidAmount)
            )
          : updatedData.data.auction.startingBid;

      // Update the minimum bid amount to highest bid + 10
      setBidAmount(highestBidAfterBid + 10);

      setBidError(""); // Clear any bid error
    } catch (err) {
      setBidError(err.message);
    }
  };

  if (loading) {
    return <p>Loading auction details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!auction) {
    return <p>Auction not found.</p>;
  }

  // Check if the auction is closed
  const isClosed = auction.status === "closed";

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
      <p className={`text-${isClosed ? "red" : "green"}-600`}>
        Status: {isClosed ? "closed" : auction.status}
      </p>
      {/* Display the winner if the auction is closed */}
      {/* {isClosed && auction.winnerId && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Auction Winner</h2>
          <p>
            Winner:{" "}
            {
              auction.bids.find((bid) => bid.bidderId === auction.winnerId)
                ?.bidderName
            }{" "}
            with a bid of ${auction.winningBid}.
          </p>
        </div>
      )} */}

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

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Additional Images</h2>
        {auction.auctionItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {auction.auctionItems.map((item, index) => (
              <div key={index} className="rounded-md border overflow-hidden">
                <img
                  src={item.itemImage}
                  alt={`Additional Image ${index + 1}`}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2 text-center">
                  <p className="text-gray-600 font-bold">
                    {item.itemName || `Image ${index + 1}`}
                  </p>
                  {item.itemDescription && (
                    <p className="text-gray-500">{item.itemDescription}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No additional images available.</p>
        )}
      </div>

      {/* Countdown Timer */}
      {!isClosed && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mt-4">Time Remaining:</h2>
          <p>
            {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
            {countdown.seconds}s
          </p>
        </div>
      )}
      {/* Bidding section */}
      {auction.status === "active" &&
        currentUser.id !== seller.id &&
        !isClosed && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Place a Bid</h2>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="border rounded-md p-2 mb-2 w-full"
              placeholder="Enter your bid amount"
              min={10}
            />
            {bidError && <p className="text-red-600">{bidError}</p>}
            <button
              onClick={handleBid}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Place Bid
            </button>
          </div>
        )}
      {isClosed && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-bold mb-2">Auction Closed</h2>
          {winner && (
            // Find the winning bid
            <p>
              Winner: {winner.firstName + " " + winner.lastName} with a bid of $
              {auction.winningBid}
            </p>
          )}
          {!auction.winnerId && <p>Auction closed without a winner.</p>}
        </div>
      )}

      {/* /* Bids Table */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Bids</h2>
        {auction.bids.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Date & Time</th>
                <th className="border border-gray-300 p-2">Bidder Name</th>
                <th className="border border-gray-300 p-2">Bid Amount</th>
                <th className="border border-gray-300 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {auction.bids
                .slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date and time (newest first)
                .map((bid) => (
                  <tr key={bid.bidId}>
                    <td className="border border-gray-300 p-2">
                      {new Date(bid.createdAt).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {bid.bidderName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      ${bid.bidAmount}
                    </td>
                    <td className="border border-gray-300 p-2">{bid.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>No bids placed yet.</p>
        )}
      </div>
    </div>
  );
};

export default AuctionItemComp;
