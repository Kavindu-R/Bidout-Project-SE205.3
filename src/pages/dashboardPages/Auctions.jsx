import { useState, useEffect } from "react";
import AuthNotification from "../../components/screens/AuthNotification";

const AuctionPage = () => {
  const [auctions, setAuctions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    startingBid: "",
    startTime: "",
    endTime: "",
    status: "",
    category: "",
  });
  const [message, setMessage] = useState("");
  const [message_ok, setMessage_ok] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch auction data from the API
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/auctions");
        if (!response.ok) {
          throw new Error("Failed to fetch auctions");
        }
        const data = await response.json();
        setAuctions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setMessage("Failed to load auctions.");
        setMessage_ok(false);
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredAuctions = auctions.filter((auction) => {
    // Extract the date part from startTime and endTime
    const auctionStartDate = new Date(auction.startTime)
      .toISOString()
      .split("T")[0];
    const auctionEndDate = new Date(auction.endTime)
      .toISOString()
      .split("T")[0];

    return (
      (filters.startingBid === "" ||
        auction.startingBid >= filters.startingBid) &&
      (filters.startTime === "" || auctionStartDate >= filters.startTime) &&
      (filters.endTime === "" || auctionEndDate <= filters.endTime) &&
      (filters.status === "" || auction.status === filters.status) &&
      (filters.category === "" ||
        auction.auctionCategory === filters.category) &&
      (searchTerm === "" ||
        auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auction.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setFilters({
      startingBid: "",
      startTime: "",
      endTime: "",
      status: "",
      category: "",
    });
    setSearchTerm("");
  };

  if (loading) {
    return <p>Loading auctions...</p>;
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

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="number"
          name="startingBid"
          placeholder="Starting Bid"
          value={filters.startingBid}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          name="startTime"
          value={filters.startTime}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          name="endTime"
          value={filters.endTime}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          <option value="Art and Antiques">Art and Antiques</option>
          <option value="Fashion and Accessories">
            Fashion and Accessories
          </option>
          <option value="Home and Garden">Home and Garden</option>
          <option value="Electronics and Gadgets">
            Electronics and Gadgets
          </option>
          <option value="Vehicles">Vehicles</option>
          <option value="Collectibles">Collectibles</option>
          <option value="Sports and Outdoors">Sports and Outdoors</option>
          <option value="Toys and Games">Toys and Games</option>
          <option value="Books and Media">Books and Media</option>
          <option value="Photography">Photography</option>
          <option value="Crafts and Hobbies">Crafts and Hobbies</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Wine and Spirits">Wine and Spirits</option>
          <option value="Tickets and Experiences">
            Tickets and Experiences
          </option>
          <option value="Health and Beauty">Health and Beauty</option>
        </select>
        <button
          onClick={handleReset}
          className="p-2 bg-gray-500 text-white rounded-md"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAuctions.length > 0 ? (
          filteredAuctions.map((auction) => (
            <div
              key={auction.auctionId}
              className="border rounded-lg shadow-md p-4"
            >
              <img
                src={auction.auctionImage}
                alt={auction.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-bold">{auction.title}</h2>
              <p className="text-gray-700">{auction.description}</p>
              <p className="text-gray-600">
                Category: {auction.auctionCategory}
              </p>
              <p className="text-gray-600">
                Starting Bid: ${auction.startingBid}
              </p>
              <p className="text-gray-600">
                Start Date: {new Date(auction.startTime).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                End Date: {new Date(auction.endTime).toLocaleDateString()}
              </p>
              <p
                className={`text-${
                  auction.status === "active" ? "green" : "red"
                }-600`}
              >
                Status: {auction.status}
              </p>
            </div>
          ))
        ) : (
          <p>No auctions found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AuctionPage;
