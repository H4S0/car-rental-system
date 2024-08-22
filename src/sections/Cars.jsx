import cars from "../data/cars";
import CarCard from "../components/CarCard";

const Cars = () => {
  return (
    <section>
      <h2 className="text-center text-3xl mb-10">Explore our cars menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 lg:px-0">
        {cars.map((car) => (
          <CarCard key={car.model} car={car} />
        ))}
      </div>
    </section>
  );
};

export default Cars;
