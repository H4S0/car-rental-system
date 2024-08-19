const Models = ({ model }) => {
  const Icon = model.img;

  return (
    <div className="flex flex-wrap mt-10">
      <Icon size={80} className="hover:text-blue-500" />
    </div>
  );
};

export default Models;
