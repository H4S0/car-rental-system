import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Adjust the path as needed

const OpenModal = ({ closeModal }) => {
  const { isLogged } = useContext(AuthContext);

  if (typeof isLogged === "undefined") {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full animate-scale-up">
        <h2 className="text-xl font-bold mb-4">Rent a Car</h2>
        <p className="text-gray-600 mb-4">
          {isLogged ? <p>Form</p> : <p>Please login first</p>}
        </p>
        <button
          onClick={closeModal}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OpenModal;
