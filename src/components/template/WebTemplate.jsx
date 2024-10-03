import Navbar from "../Navbar";

const WebTemplate = ({ frame, isLoggedIn, setIsLoggedIn, setUser }) => {
  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
      />
      {frame}
    </>
  );
};

export default WebTemplate;
