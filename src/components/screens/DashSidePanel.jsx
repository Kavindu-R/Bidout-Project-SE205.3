import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LogOut from "../functions/LogOut";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faGavel,
  faBell,
  faTags,
  faMoneyBill,
  faUser,
  faSignOutAlt,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const DashSidePanel = ({ setUser }) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For controlling sidebar state
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0); // For unread notifications count
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dashLogout = () => {
    setUser(null);
    LogOut();
    navigate("/login");
  };

  // Function to fetch unread notifications count
  const fetchUnreadNotificationsCount = async () => {
    try {
      const response = await fetch(
        "http://localhost:5173/api/notifications/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: 1 }), // Replace with the actual user ID
        }
      );
      const data = await response.json();
      if (data.success) {
        setUnreadNotificationsCount(data.data);
      }
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  useEffect(() => {
    fetchUnreadNotificationsCount(); // Initial fetch on mount

    const intervalId = setInterval(() => {
      fetchUnreadNotificationsCount(); // Fetch every 30 seconds
    }, 5000); // 30 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <>
      {/* Menu Button for Mobile */}
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex absolute right-5 flex-row-reverse items-center p-2 text-sm rounded-lg sm:hidden hover:bg-gray-200 text-black border-gray-800 border-2"
      >
        <span className="sr-only">Open sidebar</span>
        Menu
      </button>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#000435] sm:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 py-4 overflow-y-auto">
          {/* General Section */}
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              General
            </h2>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/dashboard"
                  onClick={toggleSidebar}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faChartSimple} className="mr-2" />
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/auctions"
                  onClick={toggleSidebar}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                  <span className="ml-3">Auctions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/notifications"
                  onClick={toggleSidebar}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faBell} className="mr-2" />
                  <span className="ml-3">Notifications</span>
                  {unreadNotificationsCount > 0 && ( // Show count if greater than 0
                    <span className="ml-2 text-red-500 font-bold">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>

          {/* My Activities Section */}
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              My Activities
            </h2>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/myauctions"
                  onClick={toggleSidebar}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faTags} className="mr-2" />
                  <span className="ml-3">My Auctions</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/mybids"
                  onClick={toggleSidebar}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faGavel} className="mr-2" />
                  <span className="ml-3">My Bids</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/mypayments"
                  onClick={toggleSidebar}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                  <span className="ml-3">My Payments</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Account
            </h2>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/profile"
                  onClick={toggleSidebar}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  <span className="ml-3">Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={dashLogout}
                  className="flex items-center p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  <span className="ml-3">Logout</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashSidePanel;
