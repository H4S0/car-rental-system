import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { supabase } from "../services/supabase"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(0);

  useEffect(() => {
    const checkSession = async () => {
      try {
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
      } catch (error) {
        console.error("Error checking session:", error.message);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLogged(!!session);
      setUser(session?.user ?? null);
      setUpdateFlag((prev) => prev + 1); 
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        user,
        isProcessing,
        updateFlag,
        setIsLogged,
        setUser,
        setIsProcessing,
      }}
    >
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
