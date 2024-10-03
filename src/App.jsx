import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Auctions from "./pages/Auctions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("isLogged")) {
      console.log("user:", localStorage.getItem("user"));
      console.log("user:", localStorage.getItem("isLogged"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isLogged={isLoggedIn} />
      <main className="mx-auto flex min-h-screen flex-col">
        <div className="">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
            <Route
              exact
              path="/login"
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  setUser={setUser}
                />
              }
            ></Route>
            <Route
              exact
              path="/signup"
              element={
                <Signup
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  setUser={setUser}
                />
              }
            ></Route>
            <Route exact path="/home/:id" element={<Home />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route exact path="/auctions" element={<Auctions />}></Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
