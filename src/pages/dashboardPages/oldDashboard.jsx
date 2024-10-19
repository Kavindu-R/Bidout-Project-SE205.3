import { Link } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-gray-600">
            Overview of your auction system performance
          </p>
        </div>
        <Link
          to={"/create-auction"}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Create Auction
        </Link>
      </div>

      {/* KPIs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Total Auctions
          </h2>
          <p className="text-3xl font-bold text-blue-600">120</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Active Bids</h2>
          <p className="text-3xl font-bold text-green-600">50</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Pending Payments
          </h2>
          <p className="text-3xl font-bold text-red-600">$1,200</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Completed Auctions
          </h2>
          <p className="text-3xl font-bold text-indigo-600">85</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Auction Trends
          </h2>
          <div className="mt-4">
            {/* Placeholder for Area Chart */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              Area Chart Placeholder
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Auction Categories
          </h2>
          <div className="mt-4">
            {/* Placeholder for Pie Chart */}
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              Pie Chart Placeholder
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Activities
        </h2>
        <ul className="mt-4 space-y-2">
          <li>• Bid of $150 placed on "Vintage Car Auction"</li>
          <li>• New auction created for "Antique Clock"</li>
          <li>• Payment received for "Handcrafted Watch"</li>
          <li>• Auction for "Luxury Yacht" closed</li>
        </ul>
      </div>

      {/* Auction Overview Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Auction Overview
        </h2>
        <div className="flex items-center justify-between mt-4">
          <input
            type="text"
            placeholder="Search Auctions..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-sm"
          />
        </div>
        <table className="w-full mt-4 text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b-2 font-semibold text-gray-700">
                Auction
              </th>
              <th className="p-2 border-b-2 font-semibold text-gray-700">
                Status
              </th>
              <th className="p-2 border-b-2 font-semibold text-gray-700">
                Bids
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-b">Vintage Car</td>
              <td className="p-2 border-b">Active</td>
              <td className="p-2 border-b">5</td>
            </tr>
            <tr>
              <td className="p-2 border-b">Antique Clock</td>
              <td className="p-2 border-b">Ended</td>
              <td className="p-2 border-b">3</td>
            </tr>
            <tr>
              <td className="p-2 border-b">Luxury Yacht</td>
              <td className="p-2 border-b">Active</td>
              <td className="p-2 border-b">12</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bidding Leaderboard */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">
          Bidding Leaderboard
        </h2>
        <ul className="mt-4 space-y-2">
          <li>1. John Doe - $10,500</li>
          <li>2. Jane Smith - $9,750</li>
          <li>3. Mark Wilson - $8,320</li>
          <li>4. Alice Johnson - $7,990</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
