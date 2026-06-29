import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  const token = localStorage.getItem("foodhubToken");

  // safer check (prevents refresh bug)
  if (!isLoggedIn && !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}