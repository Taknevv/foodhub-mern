import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("foodhubUser")) || null
  );

  const login = (userData, token) => {

    localStorage.setItem("foodhubToken", token);

    localStorage.setItem(
      "foodhubUser",
      JSON.stringify(userData)
    );

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