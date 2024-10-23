/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faX } from "@fortawesome/free-solid-svg-icons";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Pie, Doughnut, Bar } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userId = currentUser.id;

  useEffect(() => {
    fetch("http://localhost:5173/api/dashboard/all", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setDashboardData(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  const {
    auctions: {
      totalAuctions,
      activeAuctions,
      closedAuctions,
      liveAuctions,
      removedFromLiveAuctions,
    },
    dash: { activeBids, totalAuctionIncome, completedAuctions },
    tables: { auctionOverview, paidAuctions, activities },
    charts: { auctionCategories, auctionTrends },
  } = dashboardData;

  const pieChart = {
    labels: auctionCategories.map((category) => category.category), // this needs to be as a list of categories
    datasets: [
      {
        data: auctionCategories.map((category) => category.count), // this needs to be as a list of counts
        backgroundColor: auctionCategories.map((category, index) => {
          const categoryColors = {
            "Art and Antiques": "#8B4513", // Brown, representing classic and antique
            "Fashion and Accessories": "#E91E63", // Pink, stylish and trendy
            "Home and Garden": "#4CAF50", // Green, symbolizing nature and growth
            "Electronics and Gadgets": "#00BCD4", // Cyan, modern and tech-oriented
            Vehicles: "#FF5722", // Orange, representing speed and action
            Collectibles: "#9C27B0", // Purple, unique and rare
            "Sports and Outdoors": "#009688", // Teal, associated with outdoor and activity
            "Toys and Games": "#FFEB3B", // Yellow, playful and fun
            "Books and Media": "#795548", // Brown, signifying knowledge and literature
            Photography: "#607D8B", // Grayish blue, representing the camera lens
            "Crafts and Hobbies": "#FFC107", // Amber, representing creativity and crafting
            "Real Estate": "#3F51B5", // Blue, symbolizing stability and trust
            "Wine and Spirits": "#8D2828", // Deep red, like the color of red wine
            "Tickets and Experiences": "#FF9800", // Bright orange, representing excitement
            "Health and Beauty": "#E91E63", // Pink, symbolizing beauty and self-care
          };

          const colors = auctionCategories.map(
            (category) => categoryColors[category.category] || "#000000"
          );
          return colors[index % colors.length];
        }),
        hoverOffset: 5,
      },
    ],
  };

  const barChart = {
    labels: auctionTrends.map((category) => category.category), // this needs to be as a list of categories
    datasets: [
      {
        data: auctionTrends.map((category) => category.count), // this needs to be as a list of counts
        backgroundColor: auctionTrends.map((category, index) => {
          const categoryColors = {
            "Art and Antiques": "#8B4513", // Brown, representing classic and antique
            "Fashion and Accessories": "#E91E63", // Pink, stylish and trendy
            "Home and Garden": "#4CAF50", // Green, symbolizing nature and growth
            "Electronics and Gadgets": "#00BCD4", // Cyan, modern and tech-oriented
            Vehicles: "#FF5722", // Orange, representing speed and action
            Collectibles: "#9C27B0", // Purple, unique and rare
            "Sports and Outdoors": "#009688", // Teal, associated with outdoor and activity
            "Toys and Games": "#FFEB3B", // Yellow, playful and fun
            "Books and Media": "#795548", // Brown, signifying knowledge and literature
            Photography: "#607D8B", // Grayish blue, representing the camera lens
            "Crafts and Hobbies": "#FFC107", // Amber, representing creativity and crafting
            "Real Estate": "#3F51B5", // Blue, symbolizing stability and trust
            "Wine and Spirits": "#8D2828", // Deep red, like the color of red wine
            "Tickets and Experiences": "#FF9800", // Bright orange, representing excitement
            "Health and Beauty": "#E91E63", // Pink, symbolizing beauty and self-care
          };

          const colors = auctionTrends.map(
            (category) => categoryColors[category.category] || "#000000"
          );
          return colors[index % colors.length];
        }),
        borderRadius: 5,
      },
    ],
  };
  const pieOptions = {
    responsive: true,
  };
  const barOptions = {};

  return (
    <div className=" min-h-screen">
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
          <p className="text-3xl font-bold text-blue-600">{totalAuctions}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">Active Bids</h2>
          <p className="text-3xl font-bold text-green-600">{activeBids}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Auction Income
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            ${totalAuctionIncome}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Completed Auctions
          </h2>
          <p className="text-3xl font-bold text-indigo-600">
            {completedAuctions}
          </p>
        </div>
      </div>

      {/* Auctions Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Auction Data
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Active Auctions
            </h3>
            <p className="text-2xl font-bold text-green-600">
              {activeAuctions}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Closed Auctions
            </h3>
            <p className="text-2xl font-bold text-red-600">{closedAuctions}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Live Auctions
            </h3>
            <p className="text-2xl font-bold text-yellow-600">{liveAuctions}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Removed from Live
            </h3>
            <p className="text-2xl font-bold text-orange-600">
              {removedFromLiveAuctions}
            </p>
          </div>
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
            <div className="h-48 flex items-center justify-center">
              <Bar data={barChart} options={barOptions} />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800">
            Auction Categories
          </h2>
          <div className="mt-4">
            {/* Placeholder for Pie Chart */}
            <div className="h-48  flex items-center justify-center">
              {auctionCategories.length > 0 && (
                <Doughnut data={pieChart} options={pieOptions} />
              )}
              {auctionCategories.length == 0 && (
                <div className="flex flex-col justify-center items-center">
                  <h3>No Data Available</h3>
                  <p>Create auctions to see the details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auction Overview Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold text-gray-800">
          Latest Auctions Overview
        </h2>
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
              <th className="p-2 border-b-2 font-semibold text-gray-700">
                Winner
              </th>
            </tr>
          </thead>
          <tbody>
            {auctionOverview.map(({ auction, bidCount }) => (
              <tr key={auction.auctionId}>
                <td className="p-2 border-b hover:underline decoration-blue-500 text-sm">
                  <Link to={"/auction/" + auction.auctionId}>
                    <p className="font-bold">{auction.title}</p>
                  </Link>
                </td>
                <td
                  className={
                    "p-2 border-b " +
                    (auction.status === "active" ? "text-green-500" : "")
                  }
                >
                  {auction.status}
                </td>
                <td className="p-2 border-b">{bidCount}</td>
                <td className="p-2 border-b">
                  {auction.winnerId ? (
                    <FontAwesomeIcon
                      icon={faCrown}
                      className="text-yellow-500"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faX} className="text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={"/myauctions"}>
          <p className="mt-4 text-blue-500 hover:underline text-sm">
            View more...
          </p>
        </Link>
      </div>

      {/* My Activities */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="p-2 border-b-2 font-semibold text-gray-700">
                Recent Activities
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="group">
                <td className="p-2 border-b group-hover:cursor-pointer">
                  <div className="">
                    <Link className="" to={activity.link}>
                      <p className="font-bold group-hover:text-blue-600 transition-colors duration-200 mb-1">
                        {activity.title}
                      </p>
                      <p className="text-sm">{activity.message}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(activity.createdAt).toLocaleString()}
                      </p>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={"/notifications"}>
          <p className="mt-4 text-blue-500 hover:underline text-sm">
            View more...
          </p>
        </Link>
      </div>

      {/* Paid Auctions */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-semibold text-gray-800">Paid Auctions</h2>
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
                Winning Bid
              </th>
              <th className="p-2 border-b-2 font-semibold text-gray-700">
                Winner
              </th>
            </tr>
          </thead>
          <tbody>
            {paidAuctions.map((item) => (
              <tr key={item.auction.auctionId}>
                <td className="p-2 border-b decoration-blue-500 hover:underline text-sm">
                  <Link to={"/auction/" + item.auction.auctionId}>
                    <p className="font-bold">{item.auction.title}</p>
                  </Link>
                </td>
                <td
                  className={
                    "p-2 border-b " +
                    (item.auction.status === "active" ? "text-green-500" : "")
                  }
                >
                  {item.auction.status}
                </td>
                <td className="p-2 border-b">${item.winningBid.bidAmount}</td>
                <td className="p-2 border-b">{item.winningBid.bidderName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
