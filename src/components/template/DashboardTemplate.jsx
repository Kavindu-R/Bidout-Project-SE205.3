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
    <div className="relative">
      <DashSidePanel setUser={setUser} />
      {/* Main Content */}
      <div className="p-4 sm:ml-64">
        <h2>{title}</h2>
        {frame}
      </div>
    </div>
  );
};

export default DashboardTemplate;
