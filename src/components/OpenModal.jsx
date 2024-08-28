import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Adjust the path as needed
import { Link } from "react-router-dom";
import RentForm from "./RentForm";
import { useCart } from "../contexts/CartContext";

const OpenModal = ({ closeModal, car }) => {
  const { addCarToCart } = useCart();
  const { isLogged } = useContext(AuthContext);

  function handleRentCar() {
    addCarToCart(car);
  }

  if (typeof isLogged === "undefined") {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full animate-scale-up">
        <p className="text-gray-600 mb-4">
          {isLogged ? <RentForm /> : <p>Please login first</p>}
        </p>
        <div className="flex justify-between items-center bg-white">
          <button
            onClick={closeModal}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-300"
          >
            Close
          </button>
          {!isLogged ? (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-300"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleRentCar}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Proceed to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenModal;
