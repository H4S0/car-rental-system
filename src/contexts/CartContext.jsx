import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [rentedCars, setRentedCars] = useState([]);

  useEffect(() => {
    const storedCars = localStorage.getItem("rentedCars");
    if (storedCars) {
      setRentedCars(JSON.parse(storedCars));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rentedCars", JSON.stringify(rentedCars));
  }, [rentedCars]);

  const addCarToCart = (car) => {
    if (rentedCars.length < 2) {
      setRentedCars((prevCars) => [...prevCars, car]);
    } else {
      alert("You cannot rent more than two cars");
    }
  };

  return (
    <CartContext.Provider value={{ rentedCars, addCarToCart }}>
      {children}
    </CartContext.Provider>
  );
};
