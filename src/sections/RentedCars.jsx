import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const RentedCars = () => {
  const { rentedCars, fetchCart } = useCart();
  const { isLogged, isProcessing, updateFlag } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateRentedCars = async () => {
      if (isLogged) {
        setLoading(true);
        await fetchCart(); // Fetch the rented cars for the current user
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    updateRentedCars();
  }, [isLogged, fetchCart, updateFlag]); // Remove `isProcessing` from dependencies

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Rented Cars</h2>
      {isLogged ? (
        <div className="rented-car-list">
          {rentedCars.length === 0 ? (
            <div>No rented cars found.</div>
          ) : (
            rentedCars.map((car) => (
              <div key={car.car_id} className="rented-car-card">
                <img src={car.picture} alt={car.model} className="car-image" />
                <h3>{car.model}</h3>
                <p>Mark: {car.mark}</p>
                <p>Transmission: {car.transmission}</p>
                <p>Price per day: ${car.price}</p>
                <p>Release Date: {car.release_date}</p>
                <p>Seats: {car.seats}</p>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Please login first</p>
      )}
    </div>
  );
};

export default RentedCars;
