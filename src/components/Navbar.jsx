import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { CiMenuBurger } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { AuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

function Navbar() {
  const { isLogged, setIsLogged } = useContext(AuthContext);
  const { rentedCars, fetchCart, isProcessing } = useCart();
  const [email, setEmail] = useState(null);
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (isLogged) {
        const res = await supabase.auth.getSession();
        const user = res.data?.session?.user;
        if (user) {
          setEmail(user.email);
          await fetchCart(); // Fetch rented cars for the logged-in user
        }
      } else {
        setEmail(null);
      }
    }
    fetchUser();
  }, [isLogged, fetchCart]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      setIsLogged(false);
      setEmail(null);
    }
  };

  return (
    <nav className="p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="w-full flex justify-between items-center">
        {/* Burger Menu Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsToggle(!isToggle)}
            className="cursor-pointer"
          >
            {isToggle ? (
              <IoCloseOutline className="text-3xl bg-white " />
            ) : (
              <CiMenuBurger className="text-3xl" />
            )}
          </button>
        </div>

        {/* Desktop Menu Links */}
        <div className=" hidden md:flex md:flex-row gap-4 md:gap-10">
          <Link
            to="/"
            className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
          >
            Home
          </Link>
          <Link
            to="/cars"
            className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
          >
            Cars
          </Link>
          <Link
            to="/whychoose"
            className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
          >
            Why choose us
          </Link>
          <Link
            to="/contact"
            className="hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
          >
            Contact
          </Link>
        </div>

        {/* User Buttons */}
        <div className="hidden md:flex gap-4 md:gap-5">
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
                className="hover:bg-green-600 bg-green-500 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 whitespace-nowrap"
              >
                Log In
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isToggle
              ? 'fixed top-0 left-0 w-full h-full bg-white z-50 p-4'
              : 'hidden '
          } md:hidden flex flex-col bg-white`}
        >
          {/* Close Button at the top left */}
          <button
            onClick={() => setIsToggle(false)}
            className="self-start cursor-pointer text-3xl mb-4  rounded-full p-1" // Add bg-white and padding
          >
            <IoCloseOutline className="text-gray-700 bg-white" />
          </button>

          {/* Links under the close button */}
          <ul className="bg-white flex flex-col gap-4 text-gray-700">
            <li className="bg-white">
              <Link
                to="/"
                className="bg-white hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
                onClick={() => setIsToggle(false)}
              >
                Home
              </Link>
            </li>
            <li className="bg-white">
              <Link
                to="/cars"
                className="bg-white hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
                onClick={() => setIsToggle(false)}
              >
                Cars
              </Link>
            </li>
            <li className="bg-white">
              <Link
                to="/whychoose"
                className="bg-white hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
                onClick={() => setIsToggle(false)}
              >
                Why choose us
              </Link>
            </li>
            <li className="bg-white">
              <Link
                to="/contact"
                className="bg-white hover:rounded-lg hover:text-white hover:bg-slate-400 px-2 py-2 transition-colors duration-300 whitespace-nowrap"
                onClick={() => setIsToggle(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* User Buttons on Mobile */}
          <div className="bg-white flex flex-col gap-4 mt-4">
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
              <div className="bg-white flex flex-col gap-4 w-fit">
                <Link
                  to="/signup"
                  className="hover:bg-blue-600 bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 whitespace-nowrap"
                  onClick={() => setIsToggle(false)}
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="hover:bg-green-600 bg-green-500 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 whitespace-nowrap"
                  onClick={() => setIsToggle(false)}
                >
                  Log In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
