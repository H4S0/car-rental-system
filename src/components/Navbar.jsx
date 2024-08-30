import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabase";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

function Navbar() {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const { rentedCars } = useCart(); 
  const [email, setEmail] = useState(null);
  const [isToggle, setIsToggle] = useState(false);

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
      setIsLogged(false);
      setEmail(null);
    }
  };

  return (
    <nav className="p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="w-full flex justify-between items-center">
        <div className="md:hidden">
          <button
            onClick={() => setIsToggle(!isToggle)}
            className="cursor-pointer"
          >
            {isToggle ? (
              <IoCloseOutline className="text-3xl" />
            ) : (
              <CiMenuBurger className="text-3xl" />
            )}
          </button>
        </div>

        <div
          className={`${
            isToggle ? "block" : "hidden"
          } md:flex flex-col md:flex-row justify-start items-start md:items-center gap-4 md:gap-10`}
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-10 text-gray-700">
            <li>
              <Link
                to="/"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                to="/whychoose"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                Why choose us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-5">
          <div className="relative">
            {rentedCars.length > 0 && (
              <>
                <FaCar className="text-gray-700 text-4xl" />
                <span className="absolute top-[-15%] right-[-25%] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {rentedCars.length}
                </span>
              </>
            )}
          </div>

          {isLogged ? (
            <div className="flex flex-row items-center gap-4 text-gray-700">
              <span>{email}</span>
              <button
                onClick={handleLogout}
                className="hover:bg-gray-600 bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-5">
              <Link
                to="/signup"
                className="hover:bg-blue-600 bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 whitespace-nowrap"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="hover:bg-gray-600 bg-gray-500 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 whitespace-nowrap"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>

      {isToggle && (
        <div
          className={`absolute top-0 left-0 bg-[#e6e7e7] w-full h-full z-50 flex flex-col p-4 transition-transform duration-500  ${
            isToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between">
            <button onClick={() => setIsToggle(!isToggle)}>
              <IoCloseOutline className="text-3xl" />
            </button>
          </div>
          <ul className="flex flex-col gap-4 text-gray-700 mt-10 text-xl">
            {" "}
            {/* Adjusted text size for mobile */}
            <li className="">
              <Link
                to="/"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/howworks"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                How it works
              </Link>
            </li>
            <li>
              <Link
                to="/cars"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                Cars
              </Link>
            </li>
            <li>
              <Link
                to="/whychoose"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                Why choose us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex flex-col items-start mt-10 gap-4">
            {isLogged ? (
              <div className="flex flex-col text-gray-700">
                <span>{email}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
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
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
