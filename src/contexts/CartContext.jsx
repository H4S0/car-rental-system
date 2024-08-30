import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../services/supabase"; // Adjust the path as necessary

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [rentedCars, setRentedCars] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchCart = async () => {
        const { data, error } = await supabase
          .from("rented_cars")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching rented cars:", error);
        } else {
          setRentedCars(data);
        }
      };
      fetchCart();
    }
  }, [user]);

  const addCarToCart = async (user_id, car_id) => {
    try {
      const { data: carData, error: fetchError } = await supabase
        .from("cars")
        .select("*")
        .eq("id", car_id)
        .single();

      if (fetchError) {
        throw new Error("Error fetching car details");
      }

      const { data: rentedCarData, error: insertError } = await supabase
        .from("rented_cars")
        .insert([
          {
            user_id: user_id,
            car_id: car_id,
            model: carData.model,
            seats: carData.seats,
            mark: carData.mark,
            transmission: carData.transmission,
            price: carData.price,
            picture: carData.picture,
            release_date: carData.release_date,
          },
        ]);

      if (insertError) {
        throw new Error("Error inserting into rented_cars table");
      }

      return rentedCarData;
    } catch (error) {
      console.error("Error renting car:", error.message);
    }
  };

  const clearCart = async () => {
    if (user) {
      setRentedCars([]);

      const { error } = await supabase
        .from("rented_cars")
        .delete()
        .eq("user_id", user.id);

      if (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  return (
    <CartContext.Provider value={{ rentedCars, addCarToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
