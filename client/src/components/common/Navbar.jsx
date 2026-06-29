import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaPizzaSlice,
  FaHeart,
  FaPlusCircle,
  FaUserCircle,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("bg-gray-900");
      document.body.classList.remove("bg-slate-100");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-gray-900");
      document.body.classList.add("bg-slate-100");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "hover:text-orange-500 transition";

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-bold text-orange-600"
          >
            <FaPizzaSlice />
            FoodHub
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-gray-700 dark:text-white">

            <NavLink to="/" className={linkStyle}>
              Home
            </NavLink>

            <NavLink to="/sell-food" className={linkStyle}>
              <span className="flex items-center gap-1">
                <FaPlusCircle />
                Sell Food
              </span>
            </NavLink>

            <NavLink to="/favorites" className={linkStyle}>
              <span className="flex items-center gap-1">
                <FaHeart />
                Favorites
              </span>
            </NavLink>

            {isLoggedIn && (
              <NavLink to="/my-listings" className={linkStyle}>
                My Listings
              </NavLink>
            )}

          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-2xl text-orange-500"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            {isLoggedIn ? (
              <>
                <span className="font-semibold text-orange-600">
                  Hi, {user.username}
                </span>

                <Link
                  to="/profile"
                  className="text-3xl text-gray-700 dark:text-white"
                >
                  <FaUserCircle />
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-orange-500"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Register
                </Link>

                <FaUserCircle className="text-3xl text-gray-600" />
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-3xl text-orange-600"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-2xl font-bold text-orange-600">
            FoodHub
          </h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        <div className="flex flex-col p-6 gap-6 text-lg">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/sell-food"
            onClick={() => setMenuOpen(false)}
          >
            Sell Food
          </NavLink>

          <NavLink
            to="/favorites"
            onClick={() => setMenuOpen(false)}
          >
            Favorites
          </NavLink>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-left"
          >
            {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          {isLoggedIn ? (
            <>
              <div className="font-bold text-orange-600">
                Hi, {user.username}
              </div>

              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>

              <NavLink
                to="/my-listings"
                onClick={() => setMenuOpen(false)}
              >
                My Listings
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </NavLink>
            </>
          )}

        </div>

      </div>
    </>
  );
}