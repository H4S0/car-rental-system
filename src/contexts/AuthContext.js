import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { supabase } from "../services/supabase"; // Adjust the path as needed

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to check session on app load and handle auth state changes
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      setIsLogged(!!session);
      setUser(session?.user ?? null);
    };

    checkSession();

    // Handle subscription to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLogged(!!session);
      setUser(session?.user ?? null);
    });

    // Clean up the subscription on component unmount
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, user, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
