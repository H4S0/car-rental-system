import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./sections/HomePage";
import Cars from "./sections/Cars";
import About from "./sections/About";
import SignUp from "./sections/SignUp";
import Navbar from "./components/Navbar";
import Login from "./sections/Login";
import { supabase } from "./services/supabase";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    // Check session on app load to see if user is already logged in
    const checkSession = async () => {
      const session = await supabase.auth.getSession();
      if (session.data?.session) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    checkSession();
  }, []);

  return (
    <div>
      {/* Pass isLogged and setIsLogged to Navbar */}
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setIsLogged={setIsLogged} />} />
      </Routes>
    </div>
  );
}

export default App;
