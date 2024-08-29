// src/components/Signup.js
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

    // Sign up with Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      // Note: Supabase currently doesn't support `username` directly in `signUp`.
      // You might need to use `email` as a unique identifier.
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Insert user into app_users table
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
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default Signup;
