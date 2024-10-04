import Navbar from "../screens/Navbar";
import Footer from "../screens/Footer";

const WebTemplate = ({ frame, user, setUser }) => {
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      {frame}
      <Footer />
    </>
  );
};

export default WebTemplate;
