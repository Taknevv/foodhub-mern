import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // or spinner

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}