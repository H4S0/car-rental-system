import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { useAuth } from "../contexts/AuthContext";

const RentedCars = () => {
  const { rentedCars, setRentedCars } = useCart();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRentedCars = async () => {
      if (!user) {
        console.error("User is not authenticated");
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data: rentedData, error: rentedError } = await supabase
          .from("rented_cars")
          .select("*")
          .eq("user_id", user.id);

        if (rentedError) {
          throw rentedError;
        }

        if (rentedData.length === 0) {
          setRentedCars([]);
          setLoading(false);
          return;
        }

        const carIds = rentedData.map((car) => car.car_id);

        const { data: carDetails, error: carError } = await supabase
          .from("cars")
          .select("*")
          .in("id", carIds);

        if (carError) {
          throw carError;
        }

        const combinedData = rentedData.map((rentedCar) => {
          const carDetail = carDetails.find(
            (car) => car.id === rentedCar.car_id
          );
          return { ...rentedCar, ...carDetail };
        });

        setRentedCars(combinedData);
      } catch (error) {
        console.error("Error fetching rented cars:", error);
      }
      setLoading(false);
    };

    fetchRentedCars();
  }, [user, setRentedCars]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Rented Cars</h2>
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
    </div>
  );
};

export default RentedCars;
