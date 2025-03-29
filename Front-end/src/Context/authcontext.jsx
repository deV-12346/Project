import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Store user data

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));  // Set user state from localStorage
    }
  }, []);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));  // Store user in localStorage
    setUser(user);  // Set user in context state
  };

  const logout = () => {
    localStorage.removeItem("user");  // Remove user from localStorage
    setUser(null);  // Reset user state
  };

  return (
    <AuthContext.Provider value={{ user,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};