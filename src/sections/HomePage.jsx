import Button from "../components/Button";
import { Link } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

const HomePage = () => {
  return (
    <section className="flex justify-between items-center p-8 mt-[5%]">
      <div className="flex flex-col gap-3 w-1/2 ">
        <h2 className="text-4xl md:text-6xl font-bold">
          The easy way to takeover a lease
        </h2>
        <div className="flex flex-row items-center gap-2">
          <CiLocationOn className="text-5xl md:text-4xl" />
          <p className="text-2xl">Sarajevo</p>
        </div>
        <Link to="/cars">
          <Button>Rent a car</Button>
        </Link>
      </div>
      <div className="w-1/2 p-6">
        <img
          src={"/src/assets/Audi-A6.webp"}
          alt="audi"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HomePage;
