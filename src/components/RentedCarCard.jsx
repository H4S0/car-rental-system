import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { FaCalendarAlt } from "react-icons/fa";

const RentedCarCard = ({ rentedCar }) => {
  return (
    <div className="relative">
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-4">
        <img
          src={rentedCar.picture}
          alt={rentedCar.model}
          className="w-full h-[150px] object-cover rounded-md mb-4"
        />
        <div className="flex flex-col bg-white">
          <h2 className="bg-white text-xl font-semibold mb-2">
            {rentedCar.model}
          </h2>
          <div className="mt-3 font-semibold flex flex-row items-center justify-start gap-7 md:gap-24 bg-white">
            <div className="flex flex-col bg-white gap-3">
              <div className="flex flex-row items-center gap-2 bg-white">
                <BsFillFuelPumpFill className="text-blue-500 bg-white" />
                <p className="bg-white text-gray-600">{rentedCar.mark}</p>
              </div>
              <div className="bg-white text-gray-600 flex flex-row items-center gap-2 mt-2">
                <GiGearStickPattern className="bg-white text-blue-500" />
                <p className="bg-white">{rentedCar.transmission}</p>
              </div>
            </div>

            <div className="flex flex-col bg-white gap-3">
              <div className="flex flex-row items-center gap-2 bg-white">
                <FaCalendarAlt className="text-blue-500 bg-white" />
                <p className="bg-white text-gray-600">Start day:</p>
              </div>
              <div className="bg-white text-gray-600 flex flex-row items-center gap-2 mt-2">
                <FaCalendarAlt className="text-blue-500 bg-white" />
                <p className="bg-white text-gray-600">Last day:</p>
              </div>
            </div>
          </div>

          <div className="bg-white flex flex-col sm:flex-row sm:item-center justify-between items-start mt-5 gap-3">
            <p className="bg-blue-500 text-white font-bold rounded-lg px-3 py-2 w-max">
              ${rentedCar.price} /per day
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 sm:w-max transition-all duration-300"
            >
              Rent a car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentedCarCard;
