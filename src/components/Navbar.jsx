import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const { setIsLogged, setUser, isProcessing, setIsProcessing, setUpdateFlag } =
    useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setIsProcessing(true); // Set processing state to true

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          setError("Failed to retrieve session.");
        } else {
          setIsLogged(true);
          setUser(session.user);
          navigate("/rentedcars");
          window.location.reload();
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-center text-3xl font-bold text-blue-500 mb-6">
        Login
      </h2>
      <div className="flex flex-col lg:flex-row gap-10 items-center p-8 rounded-lg mt-11 shadow-md">
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full lg:w-1/2 space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || isProcessing}
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            {isProcessing
              ? "Processing..."
              : isLoading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
        <div className="mt-6 lg:mt-0 lg:ml-6 flex justify-center items-center rounded-full p-4 lg:p-6">
          <img src="/src/assets/pngegg (1).png" alt="Audi A7" />
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
