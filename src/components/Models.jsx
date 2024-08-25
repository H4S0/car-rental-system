const Models = ({ model }) => {
  const Icon = model.img;

  return (
    <div className="flex flex-wrap mt-10 justify-center sm:justify-start">
      <Icon className="text-5xl sm:text-7xl hover:text-blue-500 mx-2" />
    </div>
  );
};

export default Models;
