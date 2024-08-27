import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./sections/HomePage";
import Cars from "./sections/Cars";
import About from "./sections/About";
import SignUp from "./sections/SignUp";
import Navbar from "./components/Navbar";
import Login from "./sections/Login";
import HowWorks from "./sections/HowWorks";
import WhyChoose from "./sections/WhyChoose";
import Contact from "./sections/Contact";

function App() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Navbar />

      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/about" element={<About />} />
          <Route path="/howworks" element={<HowWorks />} />
          <Route path="/whychoose" element={<WhyChoose />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
