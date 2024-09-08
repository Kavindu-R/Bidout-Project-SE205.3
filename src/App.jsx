import Home from "./pages/home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="mx-auto flex min-h-screen flex-col">
        <div className="">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/home/:id" element={<Home />}></Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
