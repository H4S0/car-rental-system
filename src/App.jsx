import { Routes, Route } from "react-router-dom";
import HomePage from "./sections/HomePage";
import Cars from "./sections/Cars";
import About from "./sections/About";
import SignUp from "./sections/SignUp";
import Navbar from "./components/Navbar";
import Login from "./sections/Login";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
