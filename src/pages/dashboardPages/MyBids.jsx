import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const MyBids = () => {
  const [auctions, setAuctions] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const response = await fetch(
          "http://localhost:5173/api/auctions/mybids",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchMyBids();
  }, [userId]);

  return (
    <div className="">
      <div className="space-y-6">
        {auctions.map((auctionItem) => (
          <Link
            key={auctionItem.auction.auctionId}
            to={`/auction/${auctionItem.auction.auctionId}`} // Dynamic link to auction details
            className="block bg-white shadow-md rounded-lg p-4 border-2 hover:bg-gray-100 transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={auctionItem.auction.auctionImage}
                alt={auctionItem.auction.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {auctionItem.auction.title}
                </h2>
                <p className="text-gray-600">
                  {auctionItem.auction.description}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {auctionItem.auction.auctionCategory}
                </p>
                <p className="text-sm text-gray-500">
                  Starting Bid: ${auctionItem.auction.startingBid}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Your Bids:</h3>
              <ul className="list-disc list-inside">
                {auctionItem.userBids.map((bid) => (
                  <li key={bid.bidId} className="text-gray-700">
                    Bid Amount: ${bid.bidAmount} - Placed on:{" "}
                    {new Date(bid.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyBids;
