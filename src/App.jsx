import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
// import Auctions from "./pages/Auctions";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import WebTemplate from "./components/template/WebTemplate";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user") && localStorage.getItem("isLogged")) {
      console.log("user:", localStorage.getItem("user"));
      console.log("isLogged:", localStorage.getItem("isLogged"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <main className="mx-auto flex min-h-screen flex-col">
        <div className="">
          <Routes>
            {/* / */}
            <Route
              exact
              path="/"
              element={
                <WebTemplate
                  frame={<Home />}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  setUser={setUser}
                />
              }
            ></Route>
            {/* /home */}
            <Route
              exact
              path="/home"
              element={
                <WebTemplate
                  frame={<Home />}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  setUser={setUser}
                />
              }
            ></Route>
            {/* /login */}
            <Route
              exact
              path="/login"
              element={
                <WebTemplate
                  frame={
                    <Login
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      user={user}
                      setUser={setUser}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setUser={setUser}
                />
              }
            ></Route>
            {/* /signup */}
            <Route
              exact
              path="/signup"
              element={
                <WebTemplate
                  frame={
                    <Signup
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      user={user}
                      setUser={setUser}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setUser={setUser}
                />
              }
            ></Route>
            {/* /dashboard */}
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            {/* <Route exact path="/home/:id" element={<Home />}></Route> */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
