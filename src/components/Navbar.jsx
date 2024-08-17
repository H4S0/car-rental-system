import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";

function Navbar({ isLogged, setIsLogged }) {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (isLogged) {
        const res = await supabase.auth.getSession();
        const user = res.data?.session?.user;
        if (user) {
          setEmail(user.email);
        }
      } else {
        setEmail(null);
      }
    }
    fetchUser();
  }, [isLogged]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setIsLogged(false); // Update the logged-in state
      setEmail(null); // Clear the email from state
    }
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4">
      <ul className="flex flex-row gap-10 text-gray-700">
        <li>
          <Link
            to="/"
            className="hover:text-sky-500 transition-colors duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/howworks"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            How it works
          </Link>
        </li>
        <li>
          <Link
            to="/cars"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Cars
          </Link>
        </li>
        <li>
          <Link
            to="/whychoose"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Why choose us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            Contact
          </Link>
        </li>
      </ul>
      {isLogged ? (
        <div className="flex flex-row items-center gap-4 text-gray-700">
          <span>{email}</span>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-row gap-5">
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-sky-600 transition-colors duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
