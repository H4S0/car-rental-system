import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Adjust the path as needed
import { Link } from "react-router-dom";
import RentForm from "./RentForm";
import { useCart } from "../contexts/CartContext";
import { supabase } from "../services/supabase"; // Adjust the path as needed

const OpenModal = ({ closeModal, car }) => {
  const { addCarToCart } = useCart();
  const { isLogged, user } = useContext(AuthContext);

  const handleRentCar = async () => {
    // Check if the user is logged in
    if (isLogged && user) {
      try {
        // Insert rental record into the rented_cars table
        const { error } = await supabase.from("rented_cars").insert([
          {
            car_id: car.id,
            user_id: user.id,
            rental_date: new Date().toISOString(),
            // Optionally, you can set a return_date if needed
          },
        ]);

        if (error) {
          throw error;
        }

        // Optionally, add the car to the cart as well
        addCarToCart(car);

        // Close the modal after successful rental
        closeModal();
        alert("Car rented successfully!");
      } catch (error) {
        console.error("Error renting car:", error.message);
        alert("Failed to rent the car. Please try again.");
      }
    } else {
      alert("Please log in to rent a car.");
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
