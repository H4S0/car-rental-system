import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import RentForm from "./RentForm";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const OpenModal = ({ closeModal, car }) => {
  const { addCarToCart } = useCart();
  const { isLogged, user } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleRentCar = async () => {
    setIsProcessing(true);
    try {
      await addCarToCart(user.id, car.id); // Add car to cart

      closeModal();
      navigate("/rentedcars");
    } catch (error) {
      console.error("Error during payment process:", error.message);
    } finally {
      setIsProcessing(false); // End processing
    }
  };

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
              disabled={isProcessing} // Disable button while processing
            >
              {isProcessing ? "Processing..." : "Proceed to Payment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenModal;
