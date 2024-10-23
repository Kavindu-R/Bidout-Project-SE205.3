/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import CheckUser from "../functions/CheckUser";
import { useNavigate } from "react-router-dom";
import DashSidePanel from "../screens/DashSidePanel";

const DashboardTemplate = ({ frame, title, user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = CheckUser();
    if (!checkLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="relative bg-gray-100 min-h-screen">
      <div className="px-4 py-4 sm:ml-64 fixed w-full border-b-2 bg-slate-50 flex align-middle border-blue-700">
        <DashSidePanel setUser={setUser} />
        {/* Main Content */}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <div className="p-4 sm:ml-64 pt-20">{frame}</div>
    </div>
  );
};

export default DashboardTemplate;
