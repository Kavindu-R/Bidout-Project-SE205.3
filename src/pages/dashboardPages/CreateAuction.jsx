import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthNotification from "../../components/screens/AuthNotification";

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    auctionCategory: "",
    startTime: "",
    endTime: "",
    startingBid: "",
  });
  const [images, setImages] = useState([]); // State for the main image
  const [additionalImages, setAdditionalImages] = useState([]); // State for additional images (titles, descriptions)
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && images.length < 5) {
      setImages((prev) => [...prev, file]); // Add the selected file to the images array
    }
  };

  const handleAdditionalImageChange = (index, field, value) => {
    const updatedImages = [...additionalImages];
    if (!updatedImages[index])
      updatedImages[index] = { itemName: "", itemDescription: "" };
    updatedImages[index][field] = value;
    setAdditionalImages(updatedImages);
  };

  const uploadImage = async (image) => {
    const formDataImage = new FormData();
    formDataImage.append("file", image);

    const uploadResponse = await fetch(
      "http://localhost:5173/api/auctions/upload-image",
      {
        method: "POST",
        body: formDataImage,
      }
    );

    const uploadResult = await uploadResponse.json();

    if (!uploadResponse.ok) {
      throw new Error(uploadResult.message || "Image upload failed.");
    }

    return `http://localhost:5173/uploads/${uploadResult.data.fileName}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const sellerId = JSON.parse(localStorage.getItem("user")).id;

    try {
      // Upload the main auction image
      let mainImageUrl = "";
      if (images.length > 0) {
        mainImageUrl = await uploadImage(images[0]); // Upload only the first image as the main auction image
      }

      const auctionData = {
        ...formData,
        sellerId,
        auctionImage: mainImageUrl,
      };

      // Send auction creation request
      const response = await fetch(
        "http://localhost:5173/api/auctions/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

      const auctionId = result.data.auctionId;

      // Upload additional images
      await Promise.all(
        additionalImages.map(async (imageData, index) => {
          if (images[index + 1]) {
            // Upload additional images, skipping the first one
            const itemImage = await uploadImage(images[index + 1]); // Upload the additional image

            // Send additional image details
            await fetch("http://localhost:5173/api/auctions/additem", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                auctionId,
                itemName: imageData.itemName,
                itemDescription: imageData.itemDescription,
                itemImage,
                itemCategory: formData.auctionCategory, // You can adjust this based on your needs
              }),
            });
          }
        })
      );
      navigate(`/auction/${result.data.auctionId}`);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setMessage_ok(false);
    } finally {
      setLoading(false);
    }
  };

  const addAdditionalImageFields = () => {
    if (additionalImages.length < 5) {
      setAdditionalImages((prev) => [
        ...prev,
        { itemName: "", itemDescription: "" },
      ]);
    }
  };

  return (
    <div className="">
      <AuthNotification message={message} message_ok={message_ok} />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Existing form fields for auction data */}
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
        <div className="w-full flex justify-between align-middle gap-4">
          <div className="w-full">
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
          </div>
          <div className="w-full">
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
        </div>
        <div className="w-full flex justify-between align-middle gap-4">
          <div className="w-full">
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

          <div className="w-full">
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
        </div>

        {/* Upload Main Auction Image */}
        <div>
          <label
            htmlFor="auctionImage"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Banner Image
          </label>
          <input
            type="file"
            name="auctionImage"
            id="auctionImage"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Additional Image Uploads */}
        <div className="flex align-middle gap-5">
          <h3 className="m-0 p-2 text-lg font-medium">
            Additional Images (Up to 5)
          </h3>
          <button
            type="button"
            onClick={addAdditionalImageFields}
            className="p-2 bg-blue-500 text-white rounded-md"
          >
            Add Another Image
          </button>
        </div>
        {additionalImages.map((img, index) => (
          <div key={index} className="flex flex-col space-y-2 bg-blue-100 p-2">
            <div className="flex justify-between align-middle gap-4">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, index)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Image Title"
                value={img.itemName}
                onChange={(e) =>
                  handleAdditionalImageChange(index, "itemName", e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <textarea
              placeholder="Image Description (optional)"
              value={img.itemDescription}
              onChange={(e) =>
                handleAdditionalImageChange(
                  index,
                  "itemDescription",
                  e.target.value
                )
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 p-2 bg-green-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? "Creating Auction..." : "Create Auction"}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  );
};

export default CreateAuction;
