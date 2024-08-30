import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import { supabase } from "../services/supabase";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*");

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setCars(data);
      setLoading(false);
    };

    fetchCars();
  }, []);

  if (loading) return <p>loading</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>
      <h2 className="text-center text-3xl mb-10">Explore our cars menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4 lg:px-0">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};

export default Cars;
