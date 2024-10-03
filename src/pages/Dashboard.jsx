import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckUser from "../components/functions/CheckUser";

const Dashboard = ({ frame }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogin = CheckUser();
    if (!checkLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div>Dashboard</div>;{frame}
    </>
  );
};

export default Dashboard;
