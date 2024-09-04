import { useState } from "react";
import { supabase } from "../services/supabase";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,

    });

    if (error) {
      setError(error.message);
      return;
    }

    const { error: insertError } = await supabase.from("app_users").insert([
      {
        id: user.id,
        email: user.email,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      setError(
        `User created but failed to insert into app_users table: ${insertError.message}`
      );
      return;
    }

    setSuccess(
      "Signup successful! Please check your email to confirm your account."
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h2 className="text-center text-3xl font-bold text-blue-500 mb-6">
        Sign Up
      </h2>
      <div className="flex flex-col lg:flex-row items-center p-8 gap-10 rounded-lg shadow-md">
        <form
          onSubmit={handleSignup}
          className="flex flex-col w-full lg:w-1/2 space-y-4"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
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
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6  flex justify-center items-center rounded-full">
          <img src={"/src/assets/pngegg.png"} />
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default Signup;
