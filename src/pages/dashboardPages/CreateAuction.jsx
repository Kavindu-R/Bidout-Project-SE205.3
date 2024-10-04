import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNotification from "../../components/screens/AuthNotification";

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    auctionImage: "",
    auctionCategory: "",
    startTime: "",
    endTime: "",
    startingBid: "",
  });
  const [message, setMessage] = useState("");
  const [message_ok, setMessage_ok] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const sellerId = JSON.parse(localStorage.getItem("user")).id; // Assumes user data is stored in localStorage
    const auctionData = { ...formData, sellerId };

    try {
      const response = await fetch(
        "http://localhost:5173/api/auctions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assumes token is stored in localStorage
          },
          body: JSON.stringify(auctionData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create auction.");
      }

      setMessage("Auction created successfully!");
      setMessage_ok(true);
      navigate(`/auction/${result.data.auctionId}`);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setMessage_ok(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <AuthNotification message={message} message_ok={message_ok} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="auctionImage"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            name="auctionImage"
            id="auctionImage"
            value={formData.auctionImage}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="auctionCategory"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="auctionCategory"
            id="auctionCategory"
            value={formData.auctionCategory}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="Art and Antiques">Art and Antiques</option>
            <option value="Fashion and Accessories">
              Fashion and Accessories
            </option>
            <option value="Home and Garden">Home and Garden</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <input
            type="datetime-local"
            name="startTime"
            id="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <input
            type="datetime-local"
            name="endTime"
            id="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="startingBid"
            className="block text-sm font-medium text-gray-700"
          >
            Starting Bid
          </label>
          <input
            type="number"
            name="startingBid"
            id="startingBid"
            value={formData.startingBid}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Creating Auction..." : "Create Auction"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateAuction;
