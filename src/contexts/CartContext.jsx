import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [rentedCars, setRentedCars] = useState([]);

  const addCarToCart = (car) => {
    if (rentedCars.length < 2) {
      setRentedCars((prevCars) => [...prevCars, car]);
    } else {
      alert("You cannot rent more that two cars");
    }
  };
  return (
    <CartContext.Provider value={{ rentedCars, addCarToCart }}>
      {children}
    </CartContext.Provider>
  );
};
