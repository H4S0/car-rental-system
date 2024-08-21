import cars from "../data/cars";
import CarCard from "../components/CarCard";

const Cars = () => {
  return (
    <section>
      <h2 className="">Explore our cars menu</h2>
      <div className="">
        <div className="">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cars;
