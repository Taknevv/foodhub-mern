import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("foodhubUser"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());

  const login = (userData, token) => {
    localStorage.setItem("foodhubToken", token);
    localStorage.setItem("foodhubUser", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("foodhubToken");
    localStorage.removeItem("foodhubUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);