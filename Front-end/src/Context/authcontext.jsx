import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Store user data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track any errors during login

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem("user");
    console.log('Stored User in LocalStorage:', storedUser);  // Log to check
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // Set user state from localStorage
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    console.log('Login User:', user);  // Log to check user object during login
    localStorage.setItem("user", JSON.stringify(user));  // Store user in localStorage
    setUser(user);  // Set user in context state
  };

  const logout = () => {
    localStorage.removeItem("user");  // Remove user from localStorage
    setUser(null);  // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};