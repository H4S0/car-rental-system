const CarCard = ({ car }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-4">
      <img
        src={car.picture}
        alt={car.model}
        className="w-full h-[150px] object-cover rounded-md mb-4"
      />
      <div className="flex flex-col bg-white">
        <h2 className="bg-white text-xl font-semibold mb-2">{car.model}</h2>
        <p className="bg-white text-gray-600 mb-1">{car.mark}</p>
        <p className="bg-white text-gray-600 mb-1">
          Transmission: {car.transmission}
        </p>

        <div className="bg-white flex flex-col sm:flex-row sm:item-center justify-between items-start mt-5 gap-3">
          <p className="bg-blue-500 text-white font-bold rounded-lg px-3 py-2 w-max">
            ${car.price} /per day
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 sm:w-max transition-all duration-300">
            Rent a car
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
