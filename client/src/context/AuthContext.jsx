import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const getStoredUser = () => {
  try {
    const data = localStorage.getItem("foodhubUser");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

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

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = () => useContext(AuthContext);