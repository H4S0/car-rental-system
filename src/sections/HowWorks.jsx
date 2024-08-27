import { FaCalendarCheck } from "react-icons/fa";
import { FaCar } from "react-icons/fa";

const HowWorks = () => {
  return (
    <section className="mt-[20vh] flex flex-col items-center">
      <h2 className="text-center text-3xl font-bold text-blue-500 mb-10">
        Our rental system works in 3 steps
      </h2>
      <div className="flex flex-col md:flex-row  items-center gap-10 md:gap-15 lg:gap-20">
        <div className="flex flex-col items-center text-center gap-3 w-[250px]">
          <img
            src="/src/assets/1176403.png"
            alt="location"
            className="w-[100px] h-[100px]"
          />
          <h5 className="text-lg font-semibold">Choose Location</h5>
          <p>
            Start by selecting the most convenient location for your car rental.
          </p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 w-[250px]">
          <FaCalendarCheck className="w-[100px] h-[100px] text-green-500" />
          <h5 className="text-lg font-semibold">Pick-up Date</h5>
          <p>Next, choose the date and time for picking up your car.</p>
        </div>

        <div className="flex flex-col items-center text-center gap-3 w-[250px]">
          <FaCar className="w-[100px] h-[100px] text-red-700" />
          <h5 className="text-lg font-semibold">Book Your Car</h5>
          <p>
            Finally, browse through our wide range of vehicles and select the
            perfect one for your journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
