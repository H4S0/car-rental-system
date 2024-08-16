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
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cars">Cars</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      {isLogged ? (
        <div>
          <span>{email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
