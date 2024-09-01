import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { FaCalendarAlt, FaCity } from "react-icons/fa";

const RentedCarCard = ({ rentedCar }) => {
  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-4 max-w-xs md:max-w-md lg:max-w-lg mx-auto">
      <img
        src={rentedCar.picture}
        alt={rentedCar.model}
        className="w-full h-[150px] object-cover rounded-md mb-4"
      />
      <div className="flex flex-col bg-white">
        <h2 className="bg-white text-xl font-semibold mb-2">
          {rentedCar.model}
        </h2>
        <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-3">
          <div className="flex flex-col gap-3 bg-white">
            <div className="flex items-center gap-2 bg-white">
              <FaCity className="text-blue-500 bg-white " />
              <p className="bg-white text-gray-600">{rentedCar.location}</p>
            </div>
            <div className="flex items-center gap-2 bg-white">
              <FaCalendarAlt className="text-blue-500 bg-white" />
              <p className="text-gray-600 bg-white">
                Start day: {rentedCar.rental_date}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-white">
            <div className="flex items-center gap-2 bg-white">
              <FaCalendarAlt className="text-blue-500 bg-white" />
              <p className="text-gray-600 bg-white">
                Last day: {rentedCar.return_date}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white flex flex-col sm:flex-row items-center justify-between mt-5 gap-3">
          <p className="bg-blue-500 text-white font-bold rounded-lg px-3 py-2 w-max">
            ${rentedCar.price} / per day
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentedCarCard;
