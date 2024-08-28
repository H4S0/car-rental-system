import React from "react";

const RentForm = () => {
  return (
    <div className="flex flex-col p-4 bg-white  w-full max-w-md mx-auto">
      <div className="mb-4 bg-white">
        <label className="block text-gray-700 text-sm font-bold mb-2 bg-white">
          Location
        </label>
        <select className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="" key="">
            Sarajevo
          </option>
          <option value="" key="">
            Banja Luka
          </option>
          <option value="" key="">
            Mostar
          </option>
        </select>
      </div>
      <div className="mb-4 bg-white">
        <label className="block text-gray-700 bg-white text-sm font-bold mb-2">
          Start Date
        </label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4 bg-white">
        <label className="block bg-white text-gray-700 text-sm font-bold mb-2">
          How Many Days?
        </label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700"
          min="1"
          placeholder="How much days you keep car"
        />
      </div>
    </div>
  );
};

export default RentForm;
