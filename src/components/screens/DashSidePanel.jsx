import { Link } from "react-router-dom";
import { useState } from "react";
import LogOut from "../functions/LogOut";
import { useNavigate } from "react-router-dom";

const DashSidePanel = ({ setUser }) => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For controlling sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dashLogout = () => {
    setUser(null);
    LogOut();
    navigate("/login");
  };

  return (
    <>
      {/* Menu Button for Mobile */}
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex absolute right-5 flex-row-reverse items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        menu
      </button>

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#000435] sm:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/dashboard"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/auctions"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">Auctions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/myauctions"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">My Auctions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mybids"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">My Bids</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                onClick={toggleSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">Profile</span>
              </Link>
            </li>

            {/* logout */}
            <li>
              <button
                onClick={dashLogout}
                className="flex items-center p-2 w-full text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="ml-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashSidePanel;
