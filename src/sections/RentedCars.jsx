import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import RentedCarCard from "../components/RentedCarCard";

const RentedCars = () => {
  const { rentedCars, fetchCart } = useCart();
  const { isLogged, isProcessing, updateFlag } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateRentedCars = async () => {
      if (isLogged && !isProcessing) {
        setLoading(true);
        await fetchCart();
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    updateRentedCars();
  }, [isLogged, isProcessing, fetchCart, updateFlag]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Rented Cars</h2>
      {isLogged ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 lg:px-0">
          {rentedCars.length === 0 ? (
            <div>No rented cars found.</div>
          ) : (
            rentedCars.map((car) => (
              <RentedCarCard key={car.id} rentedCar={car} />
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
