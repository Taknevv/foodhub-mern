import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import SellFood from "./pages/SellFood";
import NotFound from "./pages/NotFound";
import FoodDetails from "./pages/FoodDetails";
import MyListings from "./pages/MyListings";
import EditFood from "./pages/EditFood";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/foods/:id" element={<FoodDetails />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/sell-food"
        element={
          <ProtectedRoute>
            <SellFood />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-listings"
        element={
          <ProtectedRoute>
            <MyListings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-food/:id"
        element={
          <ProtectedRoute>
            <EditFood />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;