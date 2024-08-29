import { useCart } from "../contexts/CartContext";

const RentedCars = () => {
  const { rentedCars } = useCart();
  console.log(rentedCars);
  return (
    <div>
      <h2>Your Rented Cars</h2>
      <div className="rented-car-list">
        {rentedCars.map((car, index) => (
          <div key={index} className="rented-car-card">
            <img src={car.picture} alt={car.model} className="car-image" />
            <h3>{car.model}</h3>
            <p>Mark: {car.mark}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Price per day: ${car.price}</p>
            <p>Release Date: {car.releaseDate}</p>
            <p>Seats: {car.seats}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RentedCars;
